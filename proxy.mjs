import fs from "fs";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";
import url from "url";

try {
    const proxy = httpProxy.createProxy();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const options = { "/": "http://localhost:3000" };

    http.createServer((req, res) => {
        if (typeof req.url === "string") {
            const { pathname } = url.parse(req.url);
            for (const [pattern, target] of Object.entries(options)) {
                if (pathname !== null && (pathname === pattern || pathname.startsWith(`${pattern}/`)))
                    proxy.web(req, res, { target });
            }
        }
    }).listen(80);

    const cert = fs.readFileSync("/etc/letsencrypt/live/oathompsonjones.co.uk/fullchain.pem");
    const key = fs.readFileSync("/etc/letsencrypt/live/oathompsonjones.co.uk/privkey.pem");
    https.createServer({ cert, key }, (req, res) => {
        if (typeof req.url === "string") {
            const { pathname } = url.parse(req.url);
            for (const [pattern, target] of Object.entries(options)) {
                if (pathname !== null && (pathname === pattern || pathname.startsWith(`${pattern}/`)))
                    proxy.web(req, res, { target });
            }
        }
    }).listen(443);

    console.log("Listening on ports 443 and 80.");
} catch (err) {
    if (err instanceof Error) {
        console.log(`HTTPS failed.\n${err.message}`);
        console.log("Listening on port 80.");
    }
}
