import { Contact, GitHub, Instagram, Redirects } from "./API";
import e, { Express } from "express";
import bodyParser from "body-parser";
import fs from "fs";
import http from "http";
import https from "https";

// Runs every minute to check if any jobs need doing.
setInterval(async (): Promise<void> => {
    await Instagram.refreshToken();
}, 60_000);

// Create express app.
const app: Express = e();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Redirect http to https.
app.use((req, res, next) => {
    if (req.protocol === "http" && req.get("host") !== "localhost")
        res.redirect(`https://${req.headers.host}${req.url}`);
    else next();
});

// Serve static content.
app.use(e.static(`${__dirname}/client/build`));

// Handle API calls.
app.get("/api/github", GitHub.requestHandler);
app.get("/api/instagram", Instagram.requestHandler);
app.post("/api/contact", Contact.requestHandler);

// Handle redirects.
for (const { route, handler } of Redirects.default)
    app.get(route, handler);

// Forward all other routes to the index.html file.
app.get("*", (_req, res) => void res.sendFile(`${__dirname}/client/build/index.html`));

// Start server.
try {
    // Read HTTPS certificate and key.
    const cert = fs.readFileSync("/etc/letsencrypt/live/oathompsonjones.co.uk/fullchain.pem");
    const key = fs.readFileSync("/etc/letsencrypt/live/oathompsonjones.co.uk/privkey.pem");
    // Create HTTPS server using certificate and key.
    const httpsServer = https.createServer({ cert, key }, app);
    // Create HTTP server to allow HTTP requests to be redirected to HTTPS requests.
    const httpServer = http.createServer(app);
    // Listen to port 443 for HTTPS and port 80 for HTTP.
    httpsServer.listen(443, "oathompsonjones.co.uk");
    httpServer.listen(80, "oathompsonjones.co.uk");
    console.log("Listening on ports 443 and 80.");
} catch (err) {
    // Should only happen when testing on local machines.
    console.log(`HTTPS failed.\n${err}`);
    app.listen(80);
    console.log("Listening on port 80.");
}