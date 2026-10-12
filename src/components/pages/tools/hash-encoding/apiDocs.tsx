import { CIPHER_MAX_KEY_LENGTH, CIPHER_NAMES } from "tools/cipher-options";
import { HASH_ALGORITHMS, HASH_ENCODING_MAX_INPUT_LENGTH } from "tools/hash-encoding-toolkit";
import { CODEC_NAMES } from "tools/encoding-codecs";
import { Code } from "components/code";
import type { ReactNode } from "react";
import { ToolSection } from "components/pages/tools/toolSection";
import { Typography } from "@mui/material";

const API_EXAMPLE = `{
  "operation": "hash",
  "algorithm": "sha256",
  "text": "Hello, world!"
}`;

/**
 * Documents the Hash and Encoding API contract.
 * @returns API usage, request example, and response documentation.
 */
export function HashEncodingApiDocs(): ReactNode {
    return (
        <ToolSection title="API">
            <Typography>
                Send a stateless request to <code>POST /api/tools/hash-encoding</code>. Input is UTF-8 text, limited
                to {HASH_ENCODING_MAX_INPUT_LENGTH.toLocaleString()} characters. Operations are{" "}
                <code>hash</code>, <code>hmac</code>, <code>encrypt</code>, <code>decrypt</code> or{" "}
                <code>&lt;format&gt;-encode</code> / <code>&lt;format&gt;-decode</code>, where{" "}
                <code>format</code> is one of <code>{CODEC_NAMES.join(" | ")}</code>.
                Hash operations accept <code>algorithm</code> set to{" "}
                <code>{HASH_ALGORITHMS.map(({ value }) => value).join(" | ")}</code>. MD5, SHA-1, RIPEMD-160 and
                CRC32 are provided for checksums and compatibility only, not security.
            </Typography>
            <Code language="bash">
                {`curl -X POST https://oathompsonjones.co.uk/api/tools/hash-encoding \\
  -H 'Content-Type: application/json' \\
  -d '${API_EXAMPLE}'`}
            </Code>
            <Typography variant="body2">
                Success responses contain <code>{"{ success: true, data: { output } }"}</code>; failures use the
                shared structured error format. Decode operations return UTF-8 text and report invalid encoded
                data. Binary, octal and decimal use space-separated byte values.
                Encrypt and decrypt operations take <code>cipher</code> (<code>{CIPHER_NAMES.join(" | ")}</code>) and,
                for every cipher except atbash, a <code>key</code> of at most {CIPHER_MAX_KEY_LENGTH} characters. HMAC
                requests take <code>algorithm</code> (any hash except CRC32) and a required <code>key</code>, and
                return a hex signature. Keys and input are never stored or logged. Work per request is bounded by the
                input and key limits. Classical ciphers are not
                secure; only <code>aes256gcm</code> is suitable for protecting data. Encoding is reversible
                and not secret, hashing is one-way, HMAC is a keyed signature, and encryption needs its key. None of
                these is secure storage, and the tool is not a substitute for a reviewed production security design.
            </Typography>
        </ToolSection>
    );
}
