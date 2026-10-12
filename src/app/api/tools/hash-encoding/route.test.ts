import { expect as assert, describe, it } from "vitest";
import { CODEC_NAMES } from "tools/encoding-codecs";
import { POST as post } from "./route";

/**
 * Sends a JSON body to the endpoint.
 * @param payload - The request payload.
 * @returns The route response.
 */
async function postJson(payload: unknown): Promise<Response> {
    return post(new Request("http://localhost/api/tools/hash-encoding", {
        body: JSON.stringify(payload),
        headers: new Headers([["Content-Type", "application/json"]]),
        method: "POST",
    }));
}

/**
 * Reads a response body as unknown JSON.
 * @param response - The API response.
 * @returns The decoded response body.
 */
async function readResponse(response: Response): Promise<unknown> {
    const payload: unknown = await response.json();

    return payload;
}

describe("POST /api/tools/hash-encoding", () => {
    it("encodes and decodes UTF-8 Base64", async () => {
        const encoded = await postJson({ operation: "base64-encode", text: "héllo" });
        const decoded = await postJson({ operation: "base64-decode", text: "aMOpbGxv" });

        assert(await readResponse(encoded)).toEqual({ data: { output: "aMOpbGxv" }, success: true });
        assert(await readResponse(decoded)).toEqual({ data: { output: "héllo" }, success: true });
    });

    it("encodes and decodes hexadecimal text", async () => {
        const encoded = await postJson({ operation: "hex-encode", text: "A" });
        const decoded = await postJson({ operation: "hex-decode", text: "41" });

        assert(await readResponse(encoded)).toEqual({ data: { output: "41" }, success: true });
        assert(await readResponse(decoded)).toEqual({ data: { output: "A" }, success: true });
    });

    it("encodes and decodes URL components", async () => {
        const encoded = await postJson({ operation: "url-encode", text: "a b&c" });
        const decoded = await postJson({ operation: "url-decode", text: "a%20b%26c" });

        assert(await readResponse(encoded)).toEqual({ data: { output: "a%20b%26c" }, success: true });
        assert(await readResponse(decoded)).toEqual({ data: { output: "a b&c" }, success: true });
    });

    it("calculates a SHA-256 digest and marks the response non-cacheable", async () => {
        const response = await postJson({ algorithm: "sha256", operation: "hash", text: "abc" });

        assert(response.headers.get("Cache-Control")).toBe("no-store");
        assert(await readResponse(response)).toEqual({
            data: { output: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad" },
            success: true,
        });
    });

    it("calculates MD5 and SHA-1 digests", async () => {
        const md5 = await postJson({ algorithm: "md5", operation: "hash", text: "abc" });
        const sha1 = await postJson({ algorithm: "sha1", operation: "hash", text: "abc" });

        assert(await readResponse(md5)).toEqual({
            data: { output: "900150983cd24fb0d6963f7d28e17f72" },
            success: true,
        });
        assert(await readResponse(sha1)).toEqual({
            data: { output: "a9993e364706816aba3e25717850c26c9cd0d89d" },
            success: true,
        });
    });

    it("calculates SHA-3, BLAKE2, RIPEMD-160 and CRC32 digests", async () => {
        const expected = [
            ["blake2s256", "508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982"],
            ["crc32", "352441c2"],
            ["ripemd160", "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"],
            ["sha3-256", "3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532"],
        ] as const;

        for (const [algorithm, output] of expected) {
            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            const response = await postJson({ algorithm, operation: "hash", text: "abc" });

            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            assert(await readResponse(response)).toEqual({ data: { output }, success: true });
        }
    });

    it("round-trips every text encoding format", async () => {
        const formats = CODEC_NAMES.filter((name) => name !== "morse");
        const text = "Hi <é> 😀 &";

        for (const format of formats) {
            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            const encoded = await readResponse(await postJson({ operation: `${format}-encode`, text }));
            const { output } = (encoded as { data: { output: string; }; }).data;
            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            const decoded = await readResponse(await postJson({ operation: `${format}-decode`, text: output }));

            assert(decoded, format).toEqual({ data: { output: text }, success: true });
        }
    });

    it("encodes known values for binary, base32 and morse", async () => {
        const cases = [
            ["binary-encode", "Hi", "01001000 01101001"],
            ["base32-encode", "foobar", "MZXW6YTBOI======"],
            ["morse-encode", "SOS 1", "... --- ... / .----"],
            ["morse-decode", "... --- ... / .----", "SOS 1"],
            ["octal-encode", "A", "101"],
            ["decimal-decode", "72 105", "Hi"],
            ["html-encode", "<a>é", "&#x3C;a&#x3E;&#xE9;"],
        ] as const;

        for (const [operation, text, output] of cases) {
            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            const response = await postJson({ operation, text });

            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            assert(await readResponse(response)).toEqual({ data: { output }, success: true });
        }
    });

    it("rejects invalid input for the new formats", async () => {
        const cases = [["binary-decode", "012"], ["base32-decode", "!!"], ["decimal-decode", "300"]] as const;

        for (const [operation, text] of cases) {
            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            const response = await postJson({ operation, text });

            assert(response.status, operation).toBe(400);
        }
    });
});

describe("POST /api/tools/hash-encoding HMAC", () => {
    it("signs text with a known HMAC-SHA256 vector", async () => {
        const response = await postJson({
            algorithm: "sha256",
            key: "key",
            operation: "hmac",
            text: "The quick brown fox jumps over the lazy dog",
        });

        assert(await readResponse(response)).toEqual({
            data: { output: "f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8" },
            success: true,
        });
    });

    it("rejects a missing key and the CRC32 algorithm", async () => {
        const missing = await postJson({ algorithm: "sha256", operation: "hmac", text: "a" });
        const crc = await postJson({ algorithm: "crc32", key: "k", operation: "hmac", text: "a" });

        assert(missing.status).toBe(400);
        assert(crc.status).toBe(400);
    });
});

describe("POST /api/tools/hash-encoding ciphers", () => {
    it("encodes and decodes Ascii85", async () => {
        const encoded = await postJson({ operation: "ascii85-encode", text: "Man " });
        const decoded = await postJson({ operation: "ascii85-decode", text: "<~9jqo^~>" });

        assert(await readResponse(encoded)).toEqual({ data: { output: "9jqo^" }, success: true });
        assert(await readResponse(decoded)).toEqual({ data: { output: "Man " }, success: true });
    });

    it("applies known ciphers in both directions", async () => {
        const cases = [
            ["caesar", "3", "Hello, World!", "Khoor, Zruog!"],
            ["atbash", undefined, "Hello", "Svool"],
            ["vigenere", "LEMON", "ATTACKATDAWN", "LXFOPVEFRNHR"],
            ["affine", "5,8", "AFFINE CIPHER", "IHHWVC SWFRCP"],
            ["railfence", "3", "WEAREDISCOVEREDFLEEATONCE", "WECRLTEERDSOEEFEAOCAIVDEN"],
            ["xor", "k", "abc", "0a0908"],
        ] as const;

        for (const [cipher, key, text, expected] of cases) {
            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            const encrypted = await postJson({ cipher, key, operation: "encrypt", text });
            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            const decrypted = await postJson({ cipher, key, operation: "decrypt", text: expected });

            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            assert(await readResponse(encrypted), cipher).toEqual({ data: { output: expected }, success: true });
            // eslint-disable-next-line no-await-in-loop -- Sequential assertions keep failures readable.
            assert(await readResponse(decrypted), cipher).toEqual({ data: { output: text }, success: true });
        }
    });

    it("round-trips AES-256-GCM and rejects the wrong passphrase", async () => {
        const encrypted = await readResponse(
            await postJson({ cipher: "aes256gcm", key: "secret", operation: "encrypt", text: "Hi 😀" }),
        ) as { data: { output: string; }; };
        const decrypted = await postJson({
            cipher: "aes256gcm",
            key: "secret",
            operation: "decrypt",
            text: encrypted.data.output,
        });
        const wrong = await postJson({
            cipher: "aes256gcm",
            key: "nope",
            operation: "decrypt",
            text: encrypted.data.output,
        });

        assert(await readResponse(decrypted)).toEqual({ data: { output: "Hi 😀" }, success: true });
        assert(wrong.status).toBe(400);
    });

    it("rejects missing or invalid cipher keys", async () => {
        const missing = await postJson({ cipher: "caesar", operation: "encrypt", text: "a" });
        const badAffine = await postJson({ cipher: "affine", key: "2,3", operation: "encrypt", text: "a" });
        const badRails = await postJson({ cipher: "railfence", key: "1", operation: "encrypt", text: "a" });

        assert(missing.status).toBe(400);
        assert(badAffine.status).toBe(400);
        assert(badRails.status).toBe(400);
    });

    it("rejects malformed encoded input", async () => {
        const response = await postJson({ operation: "hex-decode", text: "xyz" });

        assert(response.status).toBe(400);
        assert(await readResponse(response)).toMatchObject({
            error: { code: "INVALID_ENCODING" },
            success: false,
        });
    });

    it("rejects invalid UTF-8 bytes instead of silently replacing them", async () => {
        const response = await postJson({ operation: "hex-decode", text: "ff" });

        assert(response.status).toBe(400);
        assert(await readResponse(response)).toMatchObject({
            error: { code: "INVALID_ENCODING" },
            success: false,
        });
    });

    it("rejects unsupported hash algorithms through schema validation", async () => {
        const response = await postJson({ algorithm: "crc64", operation: "hash", text: "abc" });

        assert(response.status).toBe(400);
        assert(await readResponse(response)).toMatchObject({
            error: { code: "VALIDATION_ERROR" },
            success: false,
        });
    });
});
