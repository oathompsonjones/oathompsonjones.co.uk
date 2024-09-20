/* eslint-disable no-console */
import fs from "fs/promises";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";

// Configuration.
const domain = "oathompsonjones.co.uk";
const port = 3000;

// Setup proxy.
const ssl = { cert: null, key: null };

try {
    ssl.key = await fs.readFile(`/etc/letsencrypt/live/${domain}/privkey.pem`);
    ssl.cert = await fs.readFile(`/etc/letsencrypt/live/${domain}/fullchain.pem`);
} catch (err) {
    console.log(`Failed to read SSL certificates: ${err.message}`);
}

const proxy = httpProxy.createProxy({ ssl });

// Setup HTTPS server to proxy requests.
const httpsServer = https.createServer(ssl, (req, res) => {
    if (req.headers.host !== domain) {
        res.writeHead(404);
        res.end();

        return;
    }

    proxy.web(req, res, { target: `http://localhost:${port}` });
});

// Setup HTTP server to redirect to HTTPS.
const httpServer = http.createServer((req, res) => {
    if (req.headers.host !== domain) {
        res.writeHead(404);
        res.end();

        return;
    }

    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
});

// Listen on ports 80 and 443.
try {
    httpsServer.listen(443, domain);
    console.log("Listening on port 443");
} catch (err) {
    console.log(`Failed to listen on port 443: ${err.message}`);
} finally {
    httpServer.listen(80, domain);
    console.log("Listening on port 80");
}