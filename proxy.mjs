import fs from "fs";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";

const proxy = httpProxy.createProxy();
const domains = {
    "oathompsonjones.co.uk": 3000,
};

try {
    // Route port 443 traffic to correct ports.
    https.createServer((req, res) => {
        for (const [host, port] of Object.keys(domains)) {
            if (req.headers.host === host) {
                req.cert = fs.readFileSync(`/etc/letsencrypt/live/${host}/fullchain.pem`);
                req.key = fs.readFileSync(`/etc/letsencrypt/live/${host}/privkey.pem`);
                proxy.web(req, res, { target: `http://localhost:${port}` });
            }
        }
    }).listen(443);
    console.log("Listening on port 443");
} catch (err) {
    console.log(`Failed to listen on port 443: ${err.message}`);
} finally {
    // Redirect port 80 to port 443.
    http.createServer((req, res) => {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
    }).listen(80);
    console.log("Listening on port 80");
}
