export const CIPHER_OPTIONS = [
    { keyHelp: "", keyLabel: "", label: "Atbash", needsKey: false, value: "atbash" },
    { keyHelp: "An integer shift, e.g. 3.", keyLabel: "Shift", label: "Caesar", needsKey: true, value: "caesar" },
    {
        keyHelp: "A keyword of letters, e.g. LEMON.",
        keyLabel: "Keyword",
        label: "Vigenère",
        needsKey: true,
        value: "vigenere",
    },
    {
        keyHelp: "A keyword of letters, e.g. LEMON.",
        keyLabel: "Keyword",
        label: "Beaufort",
        needsKey: true,
        value: "beaufort",
    },
    {
        keyHelp: "Two integers a,b where a is coprime with 26, e.g. 5,8.",
        keyLabel: "Key (a,b)",
        label: "Affine",
        needsKey: true,
        value: "affine",
    },
    {
        keyHelp: "The number of rails, at least 2.",
        keyLabel: "Rails",
        label: "Rail fence",
        needsKey: true,
        value: "railfence",
    },
    {
        keyHelp: "Any text. Encrypted output is hexadecimal.",
        keyLabel: "Key",
        label: "XOR",
        needsKey: true,
        value: "xor",
    },
    {
        keyHelp: "A passphrase. Output is Base64 containing the salt, nonce, ciphertext and authentication tag.",
        keyLabel: "Passphrase",
        label: "AES-256-GCM",
        needsKey: true,
        value: "aes256gcm",
    },
] as const;

export type CipherName = typeof CIPHER_OPTIONS[number]["value"];

export const CIPHER_NAMES = CIPHER_OPTIONS.map(({ value }) => value) as [CipherName, ...CipherName[]];
export const CIPHER_MODES = ["encrypt", "decrypt"] as const;

export type CipherMode = typeof CIPHER_MODES[number];

export const CIPHER_MAX_KEY_LENGTH = 1000;
