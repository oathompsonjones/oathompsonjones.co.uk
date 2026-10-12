import type { CipherMode, CipherName } from "tools/cipher-options";
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";
import { InvalidEncodingError } from "tools/encoding-codecs";

const ALPHABET_SIZE = 26;
const UPPER_A = 65;
const LOWER_A = 97;
const SALT_BYTES = 16;
const NONCE_BYTES = 12;
const TAG_BYTES = 16;
const AES_KEY_BYTES = 32;
const MIN_RAILS = 2;

type CipherFunction = (text: string, key: string, mode: CipherMode) => string;

/**
 * Reduces a number into the range 0 to 25.
 * @param value - The number to reduce.
 * @returns The value modulo 26.
 */
function mod26(value: number): number {
    return (value % ALPHABET_SIZE + ALPHABET_SIZE) % ALPHABET_SIZE;
}

/**
 * Applies a function to each ASCII letter, leaving other characters unchanged.
 * @param text - The text to transform.
 * @param transform - Maps a letter index (0-25) and letter position to a new index.
 * @returns The transformed text.
 */
function mapLetters(text: string, transform: (index: number, position: number) => number): string {
    let position = 0;

    return text.replaceAll(/[A-Za-z]/gu, (letter) => {
        const base = letter < "a" ? UPPER_A : LOWER_A;
        const result = mod26(transform(letter.charCodeAt(0) - base, position));

        position += 1;

        return String.fromCharCode(result + base);
    });
}

/**
 * Parses a keyword into letter shifts.
 * @param key - Letters to convert to shifts.
 * @returns Shift values from 0 to 25, one per keyword letter.
 * @throws {InvalidEncodingError} If the keyword has no letters or contains other characters.
 */
function parseKeyword(key: string): number[] {
    if (!(/^[A-Za-z]+$/u).test(key))
        throw new InvalidEncodingError("The key must contain only letters A-Z.");

    return Array.from(key.toUpperCase(), (letter) => letter.charCodeAt(0) - UPPER_A);
}

/**
 * Parses a whole-number key.
 * @param key - The key text.
 * @returns The parsed integer.
 * @throws {InvalidEncodingError} If the key is not a safe integer.
 */
function parseInteger(key: string): number {
    const value = Number(key.trim());

    if (key.trim() === "" || !Number.isSafeInteger(value))
        throw new InvalidEncodingError("The key must be a whole number.");

    return value;
}

/**
 * Finds the modular multiplicative inverse of a number modulo 26.
 * @param value - A number coprime with 26.
 * @returns The inverse, or undefined if the number is not coprime with 26.
 */
function inverseMod26(value: number): number | undefined {
    const candidates = Array.from({ length: ALPHABET_SIZE - 1 }, (_, index) => index + 1);

    return candidates.find((candidate) => mod26(value * candidate) === 1);
}

/**
 * Rearranges text using the rail fence zigzag order.
 * @param characters - The characters to arrange.
 * @param rails - The number of rails.
 * @returns Source indices in output order.
 */
function railOrder(characters: readonly string[], rails: number): number[] {
    const rows: number[][] = Array.from({ length: rails }, () => []);
    let row = 0;
    let step = 1;

    for (let index = 0; index < characters.length; index++) {
        rows[row]!.push(index);

        if (rails > 1 && (row === 0 && step < 0 || row === rails - 1 && step > 0))
            step = -step;

        row += step;
    }

    return rows.flat();
}

/**
 * Derives an AES key from a passphrase.
 * @param passphrase - The user passphrase.
 * @param salt - The salt bytes.
 * @returns A 256-bit key.
 */
function deriveKey(passphrase: string, salt: Buffer): Buffer {
    return scryptSync(passphrase, salt, AES_KEY_BYTES);
}

/**
 * Encrypts text with AES-256-GCM.
 * @param text - The plaintext.
 * @param passphrase - Secret used to derive the key.
 * @returns A Base64 payload ordered salt, nonce, ciphertext, tag.
 */
function aesEncrypt(text: string, passphrase: string): string {
    const salt = randomBytes(SALT_BYTES);
    const nonce = randomBytes(NONCE_BYTES);
    const cipher = createCipheriv("aes-256-gcm", deriveKey(passphrase, salt), nonce);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);

    return Buffer.concat([salt, nonce, encrypted, cipher.getAuthTag()]).toString("base64");
}

/**
 * Decrypts AES-256-GCM output produced by this tool.
 * @param text - The Base64 payload.
 * @param passphrase - Secret used to derive the key.
 * @returns The plaintext.
 * @throws {InvalidEncodingError} If the payload is malformed or authentication fails.
 */
function aesDecrypt(text: string, passphrase: string): string {
    const payload = Buffer.from(text.replaceAll(/\s+/gu, ""), "base64");

    if (payload.length < SALT_BYTES + NONCE_BYTES + TAG_BYTES)
        throw new InvalidEncodingError("The input is not a valid AES-256-GCM payload.");

    const salt = payload.subarray(0, SALT_BYTES);
    const nonce = payload.subarray(SALT_BYTES, SALT_BYTES + NONCE_BYTES);
    const tag = payload.subarray(payload.length - TAG_BYTES);
    const encrypted = payload.subarray(SALT_BYTES + NONCE_BYTES, payload.length - TAG_BYTES);
    const decipher = createDecipheriv("aes-256-gcm", deriveKey(passphrase, salt), nonce);

    decipher.setAuthTag(tag);

    try {
        return new TextDecoder("utf-8", { fatal: true }).decode(
            Buffer.concat([decipher.update(encrypted), decipher.final()]),
        );
    } catch {
        throw new InvalidEncodingError("Decryption failed: the passphrase is wrong or the data was altered.");
    }
}

const CIPHERS: Readonly<Record<CipherName, CipherFunction>> = {
    aes256gcm: (text, key, mode) => (mode === "encrypt" ? aesEncrypt(text, key) : aesDecrypt(text, key)),
    affine: (text, key, mode) => {
        const parts = key.split(",").map((part) => Number(part.trim()));
        const [multiplier, offset] = parts;

        if (parts.length !== 2 || !parts.every(Number.isSafeInteger))
            throw new InvalidEncodingError("The key must be two whole numbers, e.g. 5,8.");

        const inverse = inverseMod26(multiplier!);

        if (inverse === undefined)
            throw new InvalidEncodingError("The first number must be coprime with 26.");

        return mapLetters(
            text,
            (index) => (mode === "encrypt" ? multiplier! * index + offset! : inverse * (index - offset!)),
        );
    },
    atbash: (text) => mapLetters(text, (index) => ALPHABET_SIZE - 1 - index),
    beaufort: (text, key) => {
        const shifts = parseKeyword(key);

        return mapLetters(text, (index, position) => shifts[position % shifts.length]! - index);
    },
    caesar: (text, key, mode) => {
        const shift = parseInteger(key);

        return mapLetters(text, (index) => (mode === "encrypt" ? index + shift : index - shift));
    },
    railfence: (text, key, mode) => {
        const rails = parseInteger(key);

        if (rails < MIN_RAILS)
            throw new InvalidEncodingError("The number of rails must be at least 2.");

        const characters = Array.from(text);
        const order = railOrder(characters, Math.min(rails, Math.max(characters.length, MIN_RAILS)));

        if (mode === "encrypt")
            return order.map((source) => characters[source]!).join("");

        const result = new Array<string>(characters.length);

        order.forEach((source, position) => {
            result[source] = characters[position]!;
        });

        return result.join("");
    },
    vigenere: (text, key, mode) => {
        const shifts = parseKeyword(key);

        return mapLetters(text, (index, position) => {
            const shift = shifts[position % shifts.length]!;

            return mode === "encrypt" ? index + shift : index - shift;
        });
    },
    xor: (text, key, mode) => {
        const keyBytes = new TextEncoder().encode(key);

        if (mode === "encrypt") {
            const bytes = new TextEncoder().encode(text);

            return Buffer.from(bytes.map((byte, index) => byte ^ keyBytes[index % keyBytes.length]!)).toString("hex");
        }

        const cleaned = text.replaceAll(/\s+/gu, "");

        if (!(/^(?:[0-9a-fA-F]{2})*$/u).test(cleaned))
            throw new InvalidEncodingError("XOR decryption input must be hexadecimal.");

        const bytes = Buffer.from(cleaned, "hex").map((byte, index) => byte ^ keyBytes[index % keyBytes.length]!);

        try {
            return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        } catch {
            throw new InvalidEncodingError("Decrypted bytes are not valid UTF-8 text; the key may be wrong.");
        }
    },
};

/**
 * Encrypts or decrypts text with a classical or modern cipher.
 * @param cipher - The cipher to use.
 * @param mode - Whether to encrypt or decrypt.
 * @param text - The input text.
 * @param key - The key, shift, keyword or passphrase.
 * @returns The transformed text.
 * @throws {InvalidEncodingError} If the key or input is invalid for the cipher.
 */
export function runCipher(cipher: CipherName, mode: CipherMode, text: string, key = ""): string {
    if (cipher !== "atbash" && key === "")
        throw new InvalidEncodingError("This cipher requires a key.");

    return CIPHERS[cipher](text, key, mode);
}
