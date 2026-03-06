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

// Load SSL certificates.
let ssl;

try {
    ssl = {
        cert: await fs.readFile(`${sslPath}/fullchain.pem`),
        key: await fs.readFile(`${sslPath}/privkey.pem`),
    };
    console.log("SSL certificates loaded successfully.");
} catch (err) {
    console.error(`Failed to read SSL certificates: ${err.message}`);
    process.exit(1);
}

// Setup proxy.
const proxy = httpProxy.createProxy();

// Ensure `X-Forwarded-*` headers are set.
proxy.on("proxyReq", (proxyReq, req) => {
    proxyReq.setHeader("X-Forwarded-For", req.socket.remoteAddress ?? "");
    proxyReq.setHeader("X-Forwarded-Proto", "https");
    proxyReq.setHeader("X-Forwarded-Host", req.headers.host ?? "");
});

// Handle proxy errors.
proxy.on("error", (err, _, res) => {
    console.error(`Proxy error: ${err.message}`);
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway: Unable to connect to the backend service.");
});

// Setup HTTPS server.
const httpsServer = https.createServer(ssl, (req, res) => {
    const host = req.headers.host?.replace(/^www\./, "");
    const port = domainPortMap[host];

    if (port) {
        proxy.web(req, res, { target: `http://localhost:${port}` });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

// Setup HTTP server to redirect to HTTPS.
const httpServer = http.createServer((req, res) => {
    if (req.headers.host) {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url ?? ""}` });
        res.end("<h1>301 Moved Permanently</h1>");
    } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request");
    }
});

// Start servers.
try {
    httpsServer.listen(443, () => console.log("HTTPS server listening on port 443"));
    httpServer.listen(80, () => console.log("HTTP server listening on port 80"));
} catch (err) {
    console.error(`Server startup error: ${err.message}`);
    process.exit(1);
}
