import fs from "fs";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";

// Configuration.
const domain = "oathompsonjones.co.uk";
const port = 3000;

// Setup proxy.
const ssl = { key: null, cert: null };
try {
    ssl.key = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`);
    ssl.cert = fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`);
} catch(err) {
    console.log(`Failed to read SSL certificates: ${err.message}`);
}
const proxy = httpProxy.createProxy({ ssl });

// Setup HTTPS server to proxy requests.
const httpsServer = https.createServer((req, res) => {
    proxy.web(req, res, { target: `http://localhost:${port}` });
    res.end();
});

// Setup HTTP server to redirect to HTTPS.
const httpServer = http.createServer((req, res) => {
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
