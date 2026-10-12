import type { Metadata } from "next";
import { layout } from "components/layout";
import { title } from "utils";

export const metadata: Metadata = {
    description:
        "Encode, decode, encrypt, hash, and sign text with Base64, binary, ciphers, SHA, HMAC, and more.",
    title: title("Hash and Encoding"),
};

export default layout();
