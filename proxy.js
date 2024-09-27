/* eslint-disable no-await-in-loop, no-console */
import fs from "fs/promises";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";

// Configuration.
const baseDomain = "oathompsonjones.co.uk";
const domainPortMap = {
    [baseDomain]: { port: 3000, proxy: null },
    [`haskell-graphics.${baseDomain}`]: { port: 3001, proxy: null },
};

// Setup proxies.
for (const [domain, { port }] of domainPortMap) {
    try {
        domainPortMap.set(domain, {
            port,
            proxy: httpProxy.createProxy({
                ssl: {
                    cert: await fs.readFile(`/etc/letsencrypt/live/${domain}/fullchain.pem`),
                    key: await fs.readFile(`/etc/letsencrypt/live/${domain}/privkey.pem`),
                },
                target: `http://localhost:${port}`,
            }),
        });
    } catch (err) {
        console.log(`Failed to read SSL certificates: ${err.message}`);
    }
}

// Setup HTTPS server to proxy requests.
const httpsServer = https.createServer((req, res) => {
    if (req.headers.host !== undefined) {
        for (const [domain, { proxy }] of domainPortMap) {
            if ((req.headers.host.startsWith("www.") ? req.headers.host.slice(4) : req.headers.host) === domain)
                return proxy.web(req, res);
        }
    }

    return res.end();
});

// Setup HTTP server to redirect to HTTPS.
const httpServer = http.createServer((req, res) => {
    if (req.headers.host !== undefined)
        return res.writeHead(301, { Location: `https://${req.headers.host}${req.url ?? ""}` });

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
