import { CIPHER_OPTIONS, type CipherName } from "tools/cipher-options";
import { CODECS, CODEC_NAMES, type CodecName } from "tools/encoding-codecs";
import { type ChangeEvent, type ReactNode, useCallback } from "react";
import { HASH_ALGORITHMS, HMAC_ALGORITHMS, type HashAlgorithm } from "tools/hash-encoding-toolkit";
import { MenuItem, TextField } from "@mui/material";

const MODES = [
    { label: "Encode", value: "encode" },
    { label: "Decode", value: "decode" },
    { label: "Encrypt", value: "encrypt" },
    { label: "Decrypt", value: "decrypt" },
    { label: "Hash", value: "hash" },
    { label: "HMAC (sign)", value: "hmac" },
] as const;

const MODE_HELP: Record<Mode, string> = {
    decode: "Encoding is reversible and provides no secrecy.",
    decrypt: "Encryption is reversible only with the key.",
    encode: "Encoding is reversible and provides no secrecy.",
    encrypt: "Encryption is reversible only with the key.",
    hash: "Hashing is a one-way digest.",
    hmac: "Signing (HMAC) proves integrity and authenticity with a shared secret key.",
};

type Mode = typeof MODES[number]["value"];

export type ToolOptions = {
    readonly algorithm: HashAlgorithm;
    readonly cipher: CipherName;
    readonly format: CodecName;
    readonly key: string;
    readonly mode: Mode;
};

export const DEFAULT_OPTIONS: ToolOptions = {
    algorithm: "sha256",
    cipher: "caesar",
    format: "base64",
    key: "",
    mode: "encode",
};

const SELECT_MENU_PROPS = {
    anchorOrigin: { horizontal: "center", vertical: "bottom" },
    disableScrollLock: true,
    slotProps: {
        list: { disablePadding: true },
        paper: { sx: { borderRadius: "1rem" } },
    },
    transformOrigin: { horizontal: "center", vertical: "top" },
} as const;

/**
 * Builds the API request body for the selected options.
 * @param options - The selected options.
 * @param text - The input text.
 * @returns The request payload.
 */
export function buildRequest(options: ToolOptions, text: string): Record<string, string> {
    switch (options.mode) {
        case "hash":
            return { algorithm: options.algorithm, operation: "hash", text };
        case "hmac":
            return { algorithm: options.algorithm, key: options.key, operation: "hmac", text };
        case "encrypt":
        case "decrypt":
            return {
                cipher: options.cipher,
                ...options.key === "" ? {} : { key: options.key },
                operation: options.mode,
                text,
            };
        case "encode":
        case "decode":
        default:
            return { operation: `${options.format}-${options.mode}`, text };
    }
}

/**
 * Chooses a download filename that describes the output.
 * @param options - The selected options.
 * @returns A name like `sha256.txt`.
 */
export function getDownloadFilename(options: ToolOptions): string {
    switch (options.mode) {
        case "hash":
            return `${options.algorithm}.txt`;
        case "hmac":
            return `hmac-${options.algorithm}.txt`;
        case "encrypt":
        case "decrypt":
            return `${options.cipher}-${options.mode}.txt`;
        case "encode":
        case "decode":
        default:
            return `${options.format}-${options.mode}.txt`;
    }
}

type HashEncodingOptionsProps = {
    readonly onChange: (changes: Partial<ToolOptions>) => void;
    readonly options: ToolOptions;
};

/**
 * Renders the operation, format, algorithm, cipher, and key controls.
 * @param props - The component props.
 * @param props.onChange - Called with the changed options.
 * @param props.options - The current options.
 * @returns The option controls.
 */
export function HashEncodingOptions({ onChange, options }: HashEncodingOptionsProps): ReactNode {
    const handleMode = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const mode = event.target.value as Mode;

        onChange(mode === "hmac" && options.algorithm === "crc32" ? { algorithm: "sha256", mode } : { mode });
    }, [onChange, options.algorithm]);
    const handleAlgorithm = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        onChange({ algorithm: event.target.value as HashAlgorithm });
    }, [onChange]);
    const handleFormat = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        onChange({ format: event.target.value as CodecName });
    }, [onChange]);
    const handleCipher = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        onChange({ cipher: event.target.value as CipherName, key: "" });
    }, [onChange]);
    const handleKey = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        onChange({ key: event.target.value });
    }, [onChange]);
    const cipher = CIPHER_OPTIONS.find(({ value }) => value === options.cipher)!;
    const keyField = cipher.needsKey
        ? (
            <TextField
                fullWidth
                helperText={cipher.keyHelp}
                label={cipher.keyLabel}
                onChange={handleKey}
                value={options.key}
            />
        )
        : null;
    const algorithms = options.mode === "hmac" ? HMAC_ALGORITHMS : HASH_ALGORITHMS;
    const selectProps = { select: { MenuProps: SELECT_MENU_PROPS } };

    return (
        <>
            <TextField
                fullWidth
                helperText={MODE_HELP[options.mode]}
                label="Operation"
                onChange={handleMode}
                select
                slotProps={selectProps}
                value={options.mode}
            >
                {MODES.map(({ label, value }) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
            </TextField>
            {(options.mode === "hash" || options.mode === "hmac") && (
                <TextField
                    fullWidth
                    label="Hash algorithm"
                    onChange={handleAlgorithm}
                    select
                    slotProps={selectProps}
                    value={options.algorithm}
                >
                    {algorithms.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>{label}</MenuItem>
                    ))}
                </TextField>
            )}
            {options.mode === "hmac" && (
                <TextField
                    fullWidth
                    helperText="The shared secret key used to sign the text."
                    label="Secret key"
                    onChange={handleKey}
                    value={options.key}
                />
            )}
            {(options.mode === "encode" || options.mode === "decode") && (
                <TextField
                    fullWidth
                    label="Format"
                    onChange={handleFormat}
                    select
                    slotProps={selectProps}
                    value={options.format}
                >
                    {CODEC_NAMES.map((name) => <MenuItem key={name} value={name}>{CODECS[name].label}</MenuItem>)}
                </TextField>
            )}
            {(options.mode === "encrypt" || options.mode === "decrypt") && (
                <>
                    <TextField
                        fullWidth
                        label="Cipher"
                        onChange={handleCipher}
                        select
                        slotProps={selectProps}
                        value={options.cipher}
                    >
                        {CIPHER_OPTIONS.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                    </TextField>
                    {keyField}
                </>
            )}
        </>
    );
}
