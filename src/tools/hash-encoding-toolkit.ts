import { CIPHER_MAX_KEY_LENGTH, CIPHER_MODES, CIPHER_NAMES } from "tools/cipher-options";
import { CODECS, CODEC_NAMES, type CodecName, InvalidEncodingError } from "tools/encoding-codecs";
import { createHash, createHmac } from "node:crypto";
import { crc32 } from "node:zlib";
import { runCipher } from "tools/ciphers";
import { z } from "zod";

export const HASH_ENCODING_MAX_INPUT_LENGTH = 1_000_000;
const HEX_RADIX = 16;

export const HASH_TOOL_MAX_REQUEST_BYTES = 6_100_000;

export const HASH_ALGORITHMS = [
    { label: "MD5", value: "md5" },
    { label: "SHA-1", value: "sha1" },
    { label: "SHA-224", value: "sha224" },
    { label: "SHA-256", value: "sha256" },
    { label: "SHA-384", value: "sha384" },
    { label: "SHA-512", value: "sha512" },
    { label: "SHA-512/224", value: "sha512-224" },
    { label: "SHA-512/256", value: "sha512-256" },
    { label: "SHA3-224", value: "sha3-224" },
    { label: "SHA3-256", value: "sha3-256" },
    { label: "SHA3-384", value: "sha3-384" },
    { label: "SHA3-512", value: "sha3-512" },
    { label: "BLAKE2b-512", value: "blake2b512" },
    { label: "BLAKE2s-256", value: "blake2s256" },
    { label: "RIPEMD-160", value: "ripemd160" },
    { label: "CRC32", value: "crc32" },
] as const;

export type HashAlgorithm = typeof HASH_ALGORITHMS[number]["value"];

const hashAlgorithmSchema = z.enum(HASH_ALGORITHMS.map(({ value }) => value) as [HashAlgorithm, ...HashAlgorithm[]]);

export const HMAC_ALGORITHMS = HASH_ALGORITHMS.filter(({ value }) => value !== "crc32");

const hmacAlgorithmSchema = z.enum(HMAC_ALGORITHMS.map(({ value }) => value) as [HashAlgorithm, ...HashAlgorithm[]]);

export const ENCODING_MODES = ["encode", "decode"] as const;

export type EncodingMode = typeof ENCODING_MODES[number];

const encodingOperations = CODEC_NAMES.flatMap(
    (name) => ENCODING_MODES.map((mode) => `${name}-${mode}` as const),
);

export const hashEncodingRequestSchema = z.discriminatedUnion("operation", [
    z.object({
        operation: z.enum(encodingOperations as [typeof encodingOperations[number], ...typeof encodingOperations]),
        text: z.string().max(HASH_ENCODING_MAX_INPUT_LENGTH),
    }).strict(),
    z.object({
        cipher: z.enum(CIPHER_NAMES),
        key: z.string().max(CIPHER_MAX_KEY_LENGTH).optional(),
        operation: z.enum(CIPHER_MODES),
        text: z.string().max(HASH_ENCODING_MAX_INPUT_LENGTH),
    }).strict(),
    z.object({
        algorithm: hmacAlgorithmSchema,
        key: z.string().min(1).max(CIPHER_MAX_KEY_LENGTH),
        operation: z.literal("hmac"),
        text: z.string().max(HASH_ENCODING_MAX_INPUT_LENGTH),
    }).strict(),
    z.object({
        algorithm: hashAlgorithmSchema,
        operation: z.literal("hash"),
        text: z.string().max(HASH_ENCODING_MAX_INPUT_LENGTH),
    }).strict(),
]);

export const hashEncodingResultSchema = z.object({ output: z.string() });

export type HashEncodingRequest = z.output<typeof hashEncodingRequestSchema>;
export type HashEncodingResult = z.output<typeof hashEncodingResultSchema>;

export type HashEncodingResponse =
    | { data: HashEncodingResult; success: true; }
    | { error: { code: string; message: string; }; status: number; success: false; };

/**
 * Converts an input failure to a structured response.
 * @param error - The caught failure.
 * @returns A structured input error.
 * @throws {unknown} The original failure when it is not an input error.
 */
function toInputError(error: unknown): HashEncodingResponse {
    if (!(error instanceof InvalidEncodingError))
        throw error;

    return {
        error: { code: "INVALID_ENCODING", message: error.message },
        status: 400,
        success: false,
    };
}

/**
 * Encodes, decodes, encrypts, decrypts, hashes, or signs UTF-8 text.
 * @param request - A validated toolkit request.
 * @returns The result or a structured input error.
 * @throws {Error} If a runtime crypto or encoding operation fails unexpectedly.
 */
export function runHashEncodingTool(request: HashEncodingRequest): HashEncodingResponse {
    if (request.operation === "hash") {
        return {
            data: {
                output: request.algorithm === "crc32"
                    ? crc32(request.text).toString(HEX_RADIX).padStart(8, "0")
                    : createHash(request.algorithm).update(request.text, "utf8").digest("hex"),
            },
            success: true,
        };
    }

    if (request.operation === "hmac") {
        return {
            data: { output: createHmac(request.algorithm, request.key).update(request.text, "utf8").digest("hex") },
            success: true,
        };
    }

    if (request.operation === "encrypt" || request.operation === "decrypt") {
        try {
            return {
                data: { output: runCipher(request.cipher, request.operation, request.text, request.key) },
                success: true,
            };
        } catch (error) {
            return toInputError(error);
        }
    }

    const separator = request.operation.lastIndexOf("-");
    const codec = CODECS[request.operation.slice(0, separator) as CodecName];
    const mode = request.operation.slice(separator + 1) as EncodingMode;

    try {
        return { data: { output: codec[mode](request.text) }, success: true };
    } catch (error) {
        return toInputError(error);
    }
}
