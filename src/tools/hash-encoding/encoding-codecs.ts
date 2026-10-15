export class InvalidEncodingError extends Error {}

type Codec = {
    readonly decode: (text: string) => string;
    readonly encode: (text: string) => string;
    readonly label: string;
};

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const BYTE_BITS = 8;
const HEX_RADIX = 16;
const NAMED_ENTITIES: Readonly<Record<string, string>> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: "\u00A0",
    quot: "\"",
};
const MORSE_CHARACTERS = " !\"'(),-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MORSE_SEQUENCES = [
    "/",
    "-.-.--",
    ".-..-.",
    ".----.",
    "-.--.",
    "-.--.-",
    "--..--",
    "-....-",
    ".-.-.-",
    "-..-.",
    "-----",
    ".----",
    "..---",
    "...--",
    "....-",
    ".....",
    "-....",
    "--...",
    "---..",
    "----.",
    "---...",
    "..--..",
    ".--.-.",
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
];
const MORSE_CODE = new Map(Array.from(MORSE_CHARACTERS, (character, index) => [character, MORSE_SEQUENCES[index]!]));
const MORSE_REVERSE = new Map(Array.from(MORSE_CODE, ([character, code]) => [code, character]));
const ROT13_SHIFT = 13;
const LETTER_COUNT = 26;

/**
 * Creates an invalid-encoding error.
 * @param message - The user-facing description.
 * @returns The error to throw.
 */
function invalid(message: string): InvalidEncodingError {
    return new InvalidEncodingError(message);
}

/**
 * Converts text to UTF-8 bytes.
 * @param text - The text to convert.
 * @returns The UTF-8 bytes.
 */
function toBytes(text: string): Uint8Array {
    return new TextEncoder().encode(text);
}

/**
 * Converts bytes to text, rejecting invalid UTF-8.
 * @param bytes - The bytes to convert.
 * @returns The decoded text.
 * @throws {InvalidEncodingError} If the bytes are not valid UTF-8.
 */
function fromBytes(bytes: Uint8Array): string {
    try {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch (error) {
        if (error instanceof TypeError)
            throw invalid("Decoded bytes are not valid UTF-8 text.");

        throw error;
    }
}

/**
 * Removes all whitespace from encoded input.
 * @param text - The encoded input.
 * @returns The input without whitespace.
 */
function stripWhitespace(text: string): string {
    return text.replaceAll(/\s+/gu, "");
}

/**
 * Builds a codec that represents each UTF-8 byte as a fixed-width number in a given radix.
 * @param label - The name shown in the format list.
 * @param radix - The numeric base, from 2 to 16.
 * @param width - The zero-padded digit count per byte.
 * @returns A codec that reads and writes the byte values as text.
 */
function byteCodec(label: string, radix: number, width: number): Codec {
    const digits = "0123456789abcdef".slice(0, radix);
    const pattern = new RegExp(`^[${digits}]+$`, "iu");

    return {
        decode: (text): string => {
            const tokens = text.trim().split(/[\s,]+/u).filter((token) => token !== "");
            const grouped = tokens.length === 1 && tokens[0]!.length > width
                ? tokens[0]!.match(new RegExp(`.{1,${width}}`, "gu")) ?? []
                : tokens;

            if (grouped.some((token) => !pattern.test(token) || token.length > width))
                throw invalid(`Input must contain only ${label.toLowerCase()} byte values.`);

            const bytes = grouped.map((token) => Number.parseInt(token, radix));

            if (bytes.some((value) => value > 255))
                throw invalid("Each value must represent a byte between 0 and 255.");

            return fromBytes(Uint8Array.from(bytes));
        },
        encode: (text) => Array.from(toBytes(text), (byte) => byte.toString(radix).padStart(width, "0")).join(" "),
        label,
    };
}

/**
 * Encodes bytes with the RFC 4648 Base32 alphabet.
 * @param bytes - The bytes to encode.
 * @returns The padded Base32 string.
 */
function base32Encode(bytes: Uint8Array): string {
    let bits = 0;
    let value = 0;
    let output = "";

    for (const byte of bytes) {
        value = value << BYTE_BITS | byte;
        bits += BYTE_BITS;

        while (bits >= 5) {
            output += BASE32_ALPHABET[value >>> bits - 5 & 31]!;
            bits -= 5;
        }

        value &= (1 << bits) - 1;
    }

    if (bits > 0)
        output += BASE32_ALPHABET[value << 5 - bits & 31]!;

    return output.padEnd(Math.ceil(output.length / BYTE_BITS) * BYTE_BITS, "=");
}

/**
 * Decodes an RFC 4648 Base32 string.
 * @param text - The Base32 input.
 * @returns The decoded bytes.
 * @throws {InvalidEncodingError} If the input is not valid Base32.
 */
function base32Decode(text: string): Uint8Array {
    const cleaned = stripWhitespace(text).toUpperCase();

    if (!(/^[A-Z2-7]*={0,6}$/u).test(cleaned))
        throw invalid("The input is not valid Base32.");

    const unpadded = cleaned.replace(/=+$/u, "");
    const bytes: number[] = [];
    let bits = 0;
    let value = 0;

    for (const character of unpadded) {
        value = value << 5 | BASE32_ALPHABET.indexOf(character);
        bits += 5;

        if (bits >= BYTE_BITS) {
            bytes.push(value >>> bits - BYTE_BITS & 255);
            bits -= BYTE_BITS;
            value &= (1 << bits) - 1;
        }
    }

    if (bits >= 5 || value !== 0)
        throw invalid("The input is not valid Base32.");

    return Uint8Array.from(bytes);
}

/**
 * Encodes bytes as Ascii85.
 * @param bytes - The bytes to encode.
 * @returns The Ascii85 text without delimiters.
 */
function ascii85Encode(bytes: Uint8Array): string {
    let output = "";

    for (let offset = 0; offset < bytes.length; offset += 4) {
        const chunk = bytes.subarray(offset, offset + 4);
        let value = 0;

        for (let index = 0; index < 4; index++)
            value = value * 256 + (chunk[index] ?? 0);

        if (value === 0 && chunk.length === 4) {
            output += "z";
        } else {
            const digits = Array.from({ length: 5 }, () => 0);

            for (let index = 4; index >= 0; index--) {
                digits[index] = value % 85;
                value = Math.floor(value / 85);
            }

            output += String.fromCharCode(...digits.slice(0, chunk.length + 1).map((digit) => digit + 33));
        }
    }

    return output;
}

/**
 * Decodes Ascii85 text, optionally wrapped in <~ ~> delimiters.
 * @param text - The Ascii85 input.
 * @returns The decoded bytes.
 * @throws {InvalidEncodingError} If the input is not valid Ascii85.
 */
function ascii85Decode(text: string): Uint8Array {
    const cleaned = stripWhitespace(text).replace(/^<~/u, "").replace(/~>$/u, "");

    if (!(/^[!-uz]*$/u).test(cleaned))
        throw invalid("The input is not valid Ascii85.");

    const bytes: number[] = [];
    let group: number[] = [];

    /**
     * Converts a complete or final partial group into bytes.
     * @param digits - The base-85 digits in the group.
     * @throws {InvalidEncodingError} If the group is not valid.
     */
    const flush = (digits: number[]): void => {
        if (digits.length === 1)
            throw invalid("The input is not valid Ascii85.");

        const padded = [...digits, ...Array.from({ length: 5 - digits.length }, () => 84)];
        const value = padded.reduce((total, digit) => total * 85 + digit, 0);

        if (value > 0xFFFFFFFF)
            throw invalid("The input is not valid Ascii85.");

        const word = [value >>> 24, value >>> 16 & 255, value >>> 8 & 255, value & 255];

        bytes.push(...word.slice(0, digits.length - 1));
    };

    for (const character of cleaned) {
        if (character === "z") {
            if (group.length > 0)
                throw invalid("The input is not valid Ascii85.");

            bytes.push(0, 0, 0, 0);
        } else {
            group.push(character.charCodeAt(0) - 33);

            if (group.length === 5) {
                flush(group);
                group = [];
            }
        }
    }

    if (group.length > 0)
        flush(group);

    return Uint8Array.from(bytes);
}

/**
 * Escapes a code point as a numeric HTML entity.
 * @param codePoint - The Unicode code point to escape.
 * @returns An entity such as `&#x41;`.
 */
function entity(codePoint: number): string {
    return `&#x${codePoint.toString(HEX_RADIX).toUpperCase()};`;
}

/**
 * Shifts ASCII letters by 13 places.
 * @param text - The text to transform.
 * @returns The transformed text.
 */
function rot13(text: string): string {
    return text.replaceAll(/[a-z]/giu, (letter) => {
        const base = letter <= "Z" ? 65 : 97;

        return String.fromCodePoint((letter.codePointAt(0)! - base + ROT13_SHIFT) % LETTER_COUNT + base);
    });
}

/**
 * Checks that a code point can be represented as text.
 * @param codePoint - The code point to check.
 * @param message - The error to raise when it cannot.
 * @returns The same code point.
 * @throws {InvalidEncodingError} If the code point is out of range or a surrogate.
 */
function validCodePoint(codePoint: number, message: string): number {
    if (codePoint > 0x10FFFF || codePoint >= 0xD800 && codePoint <= 0xDFFF)
        throw invalid(message);

    return codePoint;
}

/**
 * Escapes markup characters and non-ASCII text as HTML entities.
 * @param text - The text to escape.
 * @returns The escaped text.
 */
function encodeHtml(text: string): string {
    return text.replaceAll(/[&<>"']|[^\u0020-\u007E]/gu, (character) => entity(character.codePointAt(0)!));
}

/**
 * Replaces named and numeric HTML character references with their characters.
 * @param text - The HTML-escaped text.
 * @returns The unescaped text.
 */
function decodeHtml(text: string): string {
    const pattern = /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|(\w+));/gu;

    return text.replaceAll(pattern, (match, ...groups: Array<string | undefined>) => {
        const [dec, hex, name] = groups;

        if (name !== undefined)
            return NAMED_ENTITIES[name] ?? match;

        const parsed = dec === undefined ? Number.parseInt(hex!, HEX_RADIX) : Number.parseInt(dec, 10);

        return String.fromCodePoint(validCodePoint(parsed, "The input contains an invalid HTML character reference."));
    });
}

/**
 * Escapes non-ASCII characters as JavaScript-style \\uXXXX sequences.
 * @param text - The text to escape.
 * @returns The escaped text.
 */
function encodeUnicode(text: string): string {
    return text.replaceAll(/[^\u0020-\u007E]/gu, (character) => Array.from(
        { length: character.length },
        (_unused, index) => `\\u${character.charCodeAt(index).toString(HEX_RADIX).padStart(4, "0")}`,
    ).join(""));
}

/**
 * Replaces \\uXXXX and \\u{X} escapes with their characters.
 * @param text - The escaped text.
 * @returns The unescaped text.
 * @throws {InvalidEncodingError} If an escape is out of range or leaves an unpaired surrogate.
 */
function decodeUnicode(text: string): string {
    const pattern = /\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})/gu;

    const decoded = text.replaceAll(pattern, (_match, braced: string | undefined, plain: string | undefined) => {
        const parsed = Number.parseInt(braced ?? plain!, HEX_RADIX);

        if (braced === undefined)
            return String.fromCharCode(parsed);

        return String.fromCodePoint(validCodePoint(parsed, "The input contains an invalid Unicode escape."));
    });

    // Escaped UTF-16 surrogate pairs recombine above; a lone surrogate is not valid text.
    if (!decoded.isWellFormed())
        throw invalid("The input contains an unpaired surrogate escape.");

    return decoded;
}

export const CODECS = {
    ascii85: {
        decode: (text) => fromBytes(ascii85Decode(text)),
        encode: (text) => ascii85Encode(toBytes(text)),
        label: "Ascii85",
    },
    base32: {
        decode: (text) => fromBytes(base32Decode(text)),
        encode: (text) => base32Encode(toBytes(text)),
        label: "Base32",
    },
    base64: {
        decode: (text) => {
            if (!(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u).test(text))
                throw invalid("The input is not valid standard Base64.");

            return fromBytes(Buffer.from(text, "base64"));
        },
        encode: (text) => Buffer.from(text, "utf8").toString("base64"),
        label: "Base64",
    },
    base64url: {
        decode: (text) => {
            if (!(/^[A-Za-z0-9_-]*$/u).test(text) || text.length % 4 === 1)
                throw invalid("The input is not valid URL-safe Base64.");

            return fromBytes(Buffer.from(text, "base64url"));
        },
        encode: (text) => Buffer.from(text, "utf8").toString("base64url"),
        label: "Base64 (URL-safe)",
    },
    binary: byteCodec("Binary", 2, 8),
    decimal: byteCodec("Decimal", 10, 3),
    hex: {
        decode: (text) => {
            const cleaned = stripWhitespace(text);

            if (!(/^(?:[0-9a-fA-F]{2})*$/u).test(cleaned))
                throw invalid("Hexadecimal input requires an even number of valid characters.");

            return fromBytes(Buffer.from(cleaned, "hex"));
        },
        encode: (text) => Buffer.from(text, "utf8").toString("hex"),
        label: "Hexadecimal",
    },
    html: { decode: decodeHtml, encode: encodeHtml, label: "HTML entities" },
    morse: {
        decode: (text) => text.trim().split(/\s*\/\s*/u).map((word) => word.split(/\s+/u).map((code) => {
            if (code === "")
                return "";

            const character = MORSE_REVERSE.get(code);

            if (character === undefined)
                throw invalid(`Unrecognised Morse code sequence: ${code.slice(0, 20)}`);

            return character;
        }).join(""))
            .join(" "),
        encode: (text) => Array.from(text.toUpperCase(), (character) => {
            const code = MORSE_CODE.get(character);

            if (code === undefined)
                throw invalid(`Morse code does not support the character "${character}".`);

            return code;
        }).join(" "),
        label: "Morse code",
    },
    octal: byteCodec("Octal", 8, 3),
    rot13: { decode: rot13, encode: rot13, label: "ROT13" },
    unicode: { decode: decodeUnicode, encode: encodeUnicode, label: "Unicode escapes" },
    url: {
        decode: (text) => {
            try {
                return decodeURIComponent(text);
            } catch (error) {
                if (error instanceof URIError)
                    throw invalid("Invalid percent-encoding in input.");

                throw error;
            }
        },
        encode: encodeURIComponent,
        label: "URL (percent-encoding)",
    },
} as const satisfies Record<string, Codec>;

export type CodecName = keyof typeof CODECS;

export const CODEC_NAMES = Object.keys(CODECS) as [CodecName, ...CodecName[]];
