import fs from "fs";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";

const proxy = httpProxy.createProxy();
const options = { 3000: /(www\.)?(.+\.)?oathompsonjones\.co\.uk/u };

function httpsHandler(req, res) {
    for (const [port, host] of Object.entries(options)) {
        if (host.test(req.headers.host))
            proxy.web(req, res, { target: `http://localhost:${port}` });
    }
}

function httpHandler(req, res) {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
}

try {
    // Route port 443 traffic to port 3000.
    const cert = fs.readFileSync("/etc/letsencrypt/live/oathompsonjones.co.uk/fullchain.pem");
    const key = fs.readFileSync("/etc/letsencrypt/live/oathompsonjones.co.uk/privkey.pem");
    https.createServer({ cert, key }, httpsHandler).listen(443);

    // Redirect port 80 to port 443.
    http.createServer(httpHandler).listen(80);

    console.log("Listening on ports 443 and 80.");
} catch (err) {
    if (err instanceof Error) {
        console.log(`HTTPS failed.\n${err.message}`);
        http.createServer(httpsHandler).listen(80);
        console.log("Listening on port 80.");
    }
}
