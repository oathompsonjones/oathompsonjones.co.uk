import fs from "fs";
import http from "http";
import httpProxy from "http-proxy";
import https from "https";

const proxy = httpProxy.createProxy();
const options = { 
    "oathompsonjones.co.uk": "http://localhost:3000",
    "localhost": "http://localhost:3000",
 };

function httpsHandler(req, res) {
    for (const [host, target] of Object.entries(options)) {
        if (req.headers.host === host)
            proxy.web(req, res, { target });
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
