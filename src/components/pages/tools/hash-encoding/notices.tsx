import { Alert } from "@mui/material";
import type { HashAlgorithm } from "tools/hash-encoding/hash-encoding-toolkit";
import type { ReactNode } from "react";
import type { ToolOptions } from "./options";

const WEAK_ALGORITHMS = new Set<HashAlgorithm>(["crc32", "md5", "ripemd160", "sha1"]);

/**
 * Explains the nature and limits of the operation that produced the output.
 * @param props - The component props.
 * @param props.options - The options used for the operation.
 * @returns The informational notices.
 */
export function OperationNotices({ options }: { readonly options: ToolOptions; }): ReactNode {
    const { algorithm, cipher, mode } = options;
    const cipherNotice = cipher === "aes256gcm"
        ? "AES-256-GCM uses an established cryptographic implementation, but this tool is not secure storage."
        : "This is a classical or toy cipher and is not secure. Use AES-256-GCM to protect real data.";
    const weakNotice = `${algorithm === "crc32" ? "CRC32 is a simple checksum" : "This algorithm is broken"
    } and is not suitable for security purposes.`;
    const weakAlgorithm = (mode === "hash" || mode === "hmac") && WEAK_ALGORITHMS.has(algorithm);

    return (
        <>
            {(mode === "encode" || mode === "decode") && (
                <Alert severity="info">
                    Encoding changes how data is represented and is fully reversible by anyone. It provides no
                    secrecy or protection.
                </Alert>
            )}
            {mode === "hash" && (
                <Alert severity="info">
                    Hashes are one-way digests, not encryption or signatures. Do not use them for password
                    storage; that requires a dedicated, salted password-hashing algorithm.
                </Alert>
            )}
            {mode === "hmac" && (
                <Alert severity="info">
                    An HMAC is a keyed signature: anyone with the shared secret key can create or verify it. It
                    proves integrity and authenticity, not secrecy, and is not a password-hashing scheme.
                </Alert>
            )}
            {(mode === "encrypt" || mode === "decrypt") && (
                <Alert severity={cipher === "aes256gcm" ? "info" : "warning"}>
                    {cipherNotice}
                </Alert>
            )}
            {weakAlgorithm ? <Alert severity="warning">{weakNotice}</Alert> : null}
            <Alert severity="info">
                These tools are not a substitute for a reviewed production security design.
            </Alert>
        </>
    );
}
