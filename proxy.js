/* eslint-disable no-console */
import fs from "fs/promises";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";

// Configuration.
const baseDomain = "oathompsonjones.co.uk";
const domainPortMap = new Map();

domainPortMap.set(baseDomain, 3000);
domainPortMap.set(`haskell-graphics.${baseDomain}`, 3001);

// Setup proxy.
const ssl = { cert: null, key: null };

try {
    ssl.key = await fs.readFile(`/etc/letsencrypt/live/${baseDomain}/privkey.pem`);
    ssl.cert = await fs.readFile(`/etc/letsencrypt/live/${baseDomain}/fullchain.pem`);
} catch (err) {
    console.log(`Failed to read SSL certificates: ${err.message}`);
}

const proxy = httpProxy.createProxy({ ssl });

// Setup HTTPS server to proxy requests.
const httpsServer = https.createServer(ssl, (req, res) => {
    for (const [domain, port] of domainPortMap) {
        if ((req.headers.host.startsWith("www.") ? req.headers.host.slice(4) : req.headers.host) === domain) {
            proxy.web(req, res, { target: `http://localhost:${port}` });

            return;
        }
    }

    res.writeHead(404);
    res.end();
});

// Setup HTTP server to redirect to HTTPS.
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
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
