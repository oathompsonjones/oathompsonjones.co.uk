/* eslint-disable no-console */
import fs from "fs/promises";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";

// Configuration.
const sslPath = "/etc/letsencrypt/live/oathompsonjones.co.uk";
const domainPortMap = {
    "haskell-playground.co.uk": 3001,
    "oathompsonjones.co.uk": 3000,
};

// Setup proxy.
const ssl = { cert: null, key: null };

try {
    ssl.cert = await fs.readFile(`${sslPath}/fullchain.pem`);
    ssl.key = await fs.readFile(`${sslPath}/privkey.pem`);
} catch (err) {
    console.log(`Failed to read SSL certificates: ${err.message}`);
}

const proxy = httpProxy.createProxy({ ssl });

// Setup HTTPS server to proxy requests.
const httpsServer = https.createServer(ssl, (req, res) => {
    if (req.headers.host !== undefined) {
        for (const [domain, port] of Object.entries(domainPortMap)) {
            if ((req.headers.host.startsWith("www.") ? req.headers.host.slice(4) : req.headers.host) === domain)
                return proxy.web(req, res, { target: `http://localhost:${port}` });
        }
    }

    return res.end();
});

// Setup HTTP server to redirect to HTTPS.
const httpServer = http.createServer((req, res) => {
    if (req.headers.host !== undefined)
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url ?? ""}` });

    return res.end();
});

// Listen on ports 80 and 443.
try {
    httpsServer.listen(443);
    console.log("Listening on port 443");
} catch (err) {
    console.log(`Failed to listen on port 443: ${err.message}`);
} finally {
    httpServer.listen(80);
    console.log("Listening on port 80");
}
