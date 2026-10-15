import { z } from "zod";

export const JSON_TOOL_MAX_INPUT_LENGTH = 1_000_000;
export const JSON_TOOL_MAX_REQUEST_BYTES = 6_100_000;
const TYPESCRIPT_NOTICE = "Types are inferred from this sample only; " +
    "optional properties and unseen union cases cannot be determined.";
const JSON_SCHEMA_NOTICE = "The schema is inferred from this sample and marks observed object properties as required.";
const XML_TYPE_NOTICE = "XML has no native JSON types; scalars become text, nulls empty elements, " +
    "and array entries <item> elements.";
const XML_NAME_NOTICE = "XML property names are sanitized; names may collide if they differ only after sanitization.";
const XML_NOTICES = [XML_TYPE_NOTICE, XML_NAME_NOTICE];
const CSV_NOTICE = "CSV is tabular: nested arrays and objects are JSON text in a cell; " +
    "original JSON types and structure are not preserved.";

export const jsonToolRequestSchema = z.object({
    indent: z.union([z.literal(2), z.literal(4)]).default(2),
    mode: z.enum(["pretty", "minify"]).default("pretty"),
    operation: z.enum(["format", "validate", "convert"]),
    sortKeys: z.boolean().default(false),
    target: z.enum(["json", "typescript", "xml", "yaml", "csv", "schema"]).default("json"),
    text: z.string().max(JSON_TOOL_MAX_INPUT_LENGTH),
}).strict();

export const jsonToolResultSchema = z.object({
    notices: z.array(z.string()),
    output: z.string(),
    valid: z.literal(true),
});

export type JsonToolRequest = z.input<typeof jsonToolRequestSchema>;
export type JsonToolResult = z.output<typeof jsonToolResultSchema>;

type JsonValue = JsonValue[] | boolean | number | string | { [key: string]: JsonValue; } | null;

type JsonToolFailure = {
    details?: unknown;
    error: {
        code: string;
        message: string;
    };
    status: number;
};

export type JsonToolResponse =
    | { data: JsonToolResult; success: true; }
    | JsonToolFailure & { success: false; };

/**
 * Sorts object keys recursively while preserving array order.
 * @param value - The parsed JSON value.
 * @returns A copy with deterministically ordered object keys.
 */
function sortJsonKeys(value: JsonValue): JsonValue {
    if (Array.isArray(value))
        return value.map(sortJsonKeys);

    if (value !== null && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value)
                .sort(([left], [right]) => {
                    if (left < right)
                        return -1;

                    if (left > right)
                        return 1;

                    return 0;
                })
                .map(([key, child]) => [key, sortJsonKeys(child)]),
        );
    }

    return value;
}

/**
 * Converts a JSON parse position into one-based line and column numbers.
 * @param text - The JSON source text.
 * @param position - The zero-based character position.
 * @returns The one-based line and column.
 */
function getLineAndColumn(text: string, position: number): { column: number; line: number; } {
    const beforeError = text.slice(0, position);
    const line = beforeError.split("\n").length;
    const lastNewline = beforeError.lastIndexOf("\n");

    return { column: position - lastNewline, line };
}

/**
 * Describes a JSON parsing error with a best-effort source position.
 * @param error - The parser failure.
 * @param text - The input that failed to parse.
 * @returns A client-safe error response.
 */
function jsonParseFailure(error: SyntaxError, text: string): JsonToolResponse {
    const positionMatch = (/position (\d+)/i).exec(error.message);
    const lineColumnMatch = (/line (\d+) column (\d+)/i).exec(error.message);
    const tokenMatch = (/Unexpected token '([^']+)'/i).exec(error.message);
    let position = positionMatch === null ? null : Number(positionMatch[1]);
    let details: { column: number; line: number; position?: number; } | undefined;

    const unexpectedToken = tokenMatch?.[1];

    if (position === null && unexpectedToken !== undefined) {
        const tokenPosition = text.indexOf(unexpectedToken);

        if (tokenPosition >= 0)
            position = tokenPosition;
    }

    if (position !== null) {
        details = { ...getLineAndColumn(text, position), position };
    } else if (lineColumnMatch !== null) {
        const [, lineText, columnText] = lineColumnMatch;

        details = { column: Number(columnText), line: Number(lineText) };
    }

    return {
        ...details === undefined ? {} : { details },
        error: {
            code: "INVALID_JSON",
            message: details === undefined
                ? "The input is not valid JSON."
                : `The input is not valid JSON (line ${details.line}, column ${details.column}).`,
        },
        status: 400,
        success: false,
    };
}

/**
 * Quotes YAML scalar values using JSON quoting, which is valid YAML 1.2.
 * @param value - A JSON scalar.
 * @returns A YAML scalar.
 */
function yamlScalar(value: boolean | number | string | null): string {
    if (typeof value === "string")
        return JSON.stringify(value);

    return String(value);
}

/**
 * Serializes JSON values as readable YAML 1.2.
 * @param value - The parsed JSON value.
 * @param indent - The number of spaces per nesting level.
 * @param depth - The current indentation level.
 * @returns YAML source text.
 */
function stringifyYaml(value: JsonValue, indent: number, depth: number = 0): string {
    const prefix = " ".repeat(indent * depth);

    if (Array.isArray(value)) {
        if (value.length === 0)
            return `${prefix}[]`;

        return value.map((item) => {
            const hasArrayItems = Array.isArray(item) && item.length > 0;
            const hasObjectProperties = item !== null && typeof item === "object" &&
                !Array.isArray(item) && Object.keys(item).length > 0;

            if (hasArrayItems || hasObjectProperties)
                return `${prefix}-\n${stringifyYaml(item, indent, depth + 1)}`;

            return `${prefix}- ${stringifyYaml(item, indent, depth + 1).trimStart()}`;
        }).join("\n");
    }

    if (value !== null && typeof value === "object") {
        const entries = Object.entries(value);

        if (entries.length === 0)
            return `${prefix}{}`;

        return entries.map(([key, item]) => {
            const yamlKey = JSON.stringify(key);
            const hasArrayItems = Array.isArray(item) && item.length > 0;
            const hasObjectProperties = item !== null && typeof item === "object" &&
                !Array.isArray(item) && Object.keys(item).length > 0;
            const isContainer = hasArrayItems || hasObjectProperties;

            return isContainer
                ? `${prefix}${yamlKey}:\n${stringifyYaml(item, indent, depth + 1)}`
                : `${prefix}${yamlKey}: ${stringifyYaml(item, indent, depth + 1).trimStart()}`;
        }).join("\n");
    }

    return `${prefix}${yamlScalar(value)}`;
}

/**
 * Escapes content for use as XML text.
 * @param value - Text content.
 * @returns Escaped and XML-compatible text.
 */
function escapeXml(value: string): string {
    return value
        .replaceAll(/\p{Cc}/gu, (character) => {
            if (character === "\t" || character === "\n" || character === "\r")
                return character;

            return "";
        })
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&apos;");
}

/**
 * Converts arbitrary JSON property names to legal, namespace-free XML element names.
 * @param value - The source property name.
 * @returns A legal XML element name.
 */
function xmlName(value: string): string {
    const safeName = value.replaceAll(/[^A-Za-z0-9_.-]/g, "_");

    return (/^[A-Za-z_]/).test(safeName) ? safeName : `_${safeName}`;
}

/**
 * Serializes a JSON value within an XML element.
 * @param name - The element name.
 * @param value - The JSON value.
 * @param indent - The number of spaces per nesting level.
 * @param depth - The current indentation level.
 * @returns An XML element.
 */
function stringifyXml(name: string, value: JsonValue, indent: number, depth: number = 0): string {
    const prefix = " ".repeat(indent * depth);
    const tag = xmlName(name);

    if (value === null)
        return `${prefix}<${tag} />`;

    if (Array.isArray(value)) {
        if (value.length === 0)
            return `${prefix}<${tag} />`;

        const children = value.map((item) => stringifyXml("item", item, indent, depth + 1)).join("\n");

        return `${prefix}<${tag}>\n${children}\n${prefix}</${tag}>`;
    }

    if (typeof value === "object") {
        const entries = Object.entries(value);

        if (entries.length === 0)
            return `${prefix}<${tag} />`;

        const children = entries.map(([key, item]) => stringifyXml(key, item, indent, depth + 1)).join("\n");

        return `${prefix}<${tag}>\n${children}\n${prefix}</${tag}>`;
    }

    return `${prefix}<${tag}>${escapeXml(String(value))}</${tag}>`;
}

/**
 * Converts JSON values into TypeScript type expressions.
 * @param value - The parsed JSON value.
 * @param indent - The number of spaces per nesting level.
 * @param depth - The current object nesting level.
 * @returns A TypeScript type expression.
 */
function inferTypeScriptType(value: JsonValue, indent: number, depth: number = 0): string {
    if (value === null)
        return "null";

    if (Array.isArray(value)) {
        if (value.length === 0)
            return "unknown[]";

        const itemTypes = [...new Set(value.map((item) => inferTypeScriptType(item, indent, depth)))];
        const union = itemTypes.join(" | ");

        return `${itemTypes.length > 1 ? `(${union})` : union}[]`;
    }

    if (typeof value === "object") {
        const propertyIndent = " ".repeat(indent * (depth + 1));
        const closingIndent = " ".repeat(indent * depth);
        const properties = Object.entries(value).map(
            ([key, child]) => `${propertyIndent}${JSON.stringify(key)}: ` +
                `${inferTypeScriptType(child, indent, depth + 1)};`,
        );

        return properties.length === 0
            ? "Record<string, never>"
            : `{\n${properties.join("\n")}\n${closingIndent}}`;
    }

    return typeof value;
}

/**
 * Infers a JSON Schema for a JSON value.
 * @param value - The parsed JSON value.
 * @returns A JSON Schema fragment.
 */
function inferJsonSchema(value: JsonValue): Record<string, unknown> {
    if (value === null)
        return { type: "null" };

    if (Array.isArray(value)) {
        const itemSchemas = [
            ...new Map(
                value.map((item) => [JSON.stringify(inferJsonSchema(item)), inferJsonSchema(item)]),
            ).values(),
        ];

        return {
            items: itemSchemas.length > 1 ? { oneOf: itemSchemas } : itemSchemas[0] ?? {},
            type: "array",
        };
    }

    if (typeof value === "object") {
        const properties = Object.fromEntries(
            Object.entries(value).map(([key, child]) => [key, inferJsonSchema(child)]),
        );

        return {
            additionalProperties: false,
            properties,
            ...Object.keys(value).length === 0 ? {} : { required: Object.keys(value) },
            type: "object",
        };
    }

    return { type: typeof value === "number" ? "number" : typeof value };
}

/**
 * Escapes a CSV field according to RFC 4180.
 * @param value - A value to represent in one CSV cell.
 * @returns A quoted CSV field.
 */
function csvField(value: JsonValue | undefined): string {
    let text = "";

    if (value !== undefined) {
        if (value !== null && typeof value === "object")
            text = JSON.stringify(value);
        else
            text = String(value);
    }

    return `"${text.replaceAll("\"", "\"\"")}"`;
}

/**
 * Converts a JSON object or an array of flat records to CSV.
 * @param value - The parsed JSON value.
 * @returns The CSV text or a useful conversion error.
 */
function stringifyCsv(value: JsonValue): { error?: string; notices: string[]; output: string; } {
    const notices = [CSV_NOTICE];
    const records = Array.isArray(value) ? value : [value];

    if (records.length === 0)
        return { notices: ["An empty array has no records or columns to represent in CSV."], output: "" };

    const isObjectRecord = records.every((record) => record !== null &&
        typeof record === "object" &&
        !Array.isArray(record));
    const isScalarRecord = records.every((record) => record === null ||
        typeof record !== "object");

    if (!isObjectRecord && !isScalarRecord) {
        return {
            error: "CSV requires an object, an array of objects, or an array of scalar values.",
            notices: [],
            output: "",
        };
    }

    if (isScalarRecord) {
        return {
            notices,
            output: ["value", ...records.map((record) => csvField(record))].join("\r\n"),
        };
    }

    const objectRecords = records.filter(isJsonRecord);
    const headers = [...new Set(objectRecords.flatMap((record) => Object.keys(record)))];

    if (headers.length === 0) {
        return {
            notices: ["The input contains no object properties, so there are no CSV columns to represent."],
            output: "",
        };
    }

    const rows = [headers.map((header) => csvField(header)).join(",")];

    for (const record of objectRecords)
        rows.push(headers.map((header) => csvField(record[header])).join(","));

    return { notices, output: rows.join("\r\n") };
}

/**
 * Checks whether a JSON value can serve as a CSV object record.
 * @param value - The JSON value to inspect.
 * @returns Whether the value is a non-array JSON object.
 */
function isJsonRecord(value: JsonValue): value is Record<string, JsonValue> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Converts JSON input into formatted, validated, or target-format output.
 * @param request - The validated tool request.
 * @returns The operation result or a structured input/conversion error.
 * @throws Will throw an error if an unexpected issue occurs during processing.
 */
export function runJsonTool(request: z.output<typeof jsonToolRequestSchema>): JsonToolResponse {
    let parsed: JsonValue;

    try {
        parsed = JSON.parse(request.text) as JsonValue;
    } catch (error) {
        if (!(error instanceof SyntaxError))
            throw error;

        return jsonParseFailure(error, request.text);
    }

    const value = request.sortKeys ? sortJsonKeys(parsed) : parsed;
    const { indent } = request;
    let output: string;
    let notices: string[] = [];

    if (request.operation === "validate") {
        output = "Valid JSON.";
    } else if (request.operation === "format") {
        output = JSON.stringify(value, null, request.mode === "minify" ? undefined : indent);
    } else {
        switch (request.target) {
            case "json":
                output = JSON.stringify(value, null, request.mode === "minify" ? undefined : indent);

                break;
            case "typescript":
                output = `type Root = ${inferTypeScriptType(value, indent)};\n`;
                notices = [TYPESCRIPT_NOTICE];
                break;
            case "schema":
                output = `${JSON.stringify({
                    $schema: "https://json-schema.org/draft/2020-12/schema",
                    ...inferJsonSchema(value),
                }, null, indent)}\n`;
                notices = [JSON_SCHEMA_NOTICE];
                break;
            case "xml":
                output = `<?xml version="1.0" encoding="UTF-8"?>\n${stringifyXml("root", value, indent)}\n`;
                notices = XML_NOTICES;
                break;
            case "yaml":
                output = `${stringifyYaml(value, indent)}\n`;
                break;
            case "csv": {
                const converted = stringifyCsv(value);
                const { error: conversionError, notices: conversionNotices, output: convertedOutput } = converted;

                if (conversionError !== undefined) {
                    return {
                        error: {
                            code: "UNSUPPORTED_CONVERSION",
                            message: conversionError,
                        },
                        status: 422,
                        success: false,
                    };
                }

                output = convertedOutput;
                notices = conversionNotices;
                break;
            }
        }
    }

    return {
        data: {
            notices,
            output,
            valid: true,
        },
        success: true,
    };
}
