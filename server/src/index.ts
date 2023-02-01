import { Contact, GitHub, Instagram, Redirects } from "./API";
import type { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import e from "express";
import fs from "fs";
import http from "http";
import https from "https";

// Runs every minute to check if any jobs need doing.
setInterval(() => void Instagram.refreshToken, 60_000);

// Create express app.
const app: Express = e();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// An array of all valid URLs. Any URLs which do not appear in this list will not work.
const validURLs: RegExp[] = [/(.*)oathompsonjones\.co\.uk/u];

// Redirect users to correct URLs.
app.use((req, res, next) => {
    // Move on if running on localhost.
    if (req.hostname === "localhost" || req.hostname === "127.0.0.1")
        return next();
    // Check that the URL is correct.
    if (validURLs.map((url) => url.exec(req.hostname)).every((result) => result === null))
        return;
    // Redirect http requests to https.
    if (req.protocol === "http")
        return res.redirect(`https://oathompsonjones.co.uk"${req.url}`);
    // Move on.
    return next();
});

// Serve static content.
const filePath: string = __dirname.replace("server", "client");
app.use(e.static(filePath));

// Handle API calls.
app.get("/api/github", (req, res) => void GitHub.requestHandler(req, res));
app.get("/api/instagram", (req, res) => void Instagram.requestHandler(req, res));
app.post("/api/contact", Contact.requestHandler);

// Handle redirects.
for (const { route, redirect } of Redirects.default)
    app.get(route, (_req: Request, res: Response): void => res.redirect(redirect));

// Forward all other routes to the index.html file.
app.get("*", (_req: Request, res: Response): void => res.sendFile(`${filePath}/index.html`));

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
    if (err instanceof Error) {
        // Should only happen when testing on local machines.
        console.log(`HTTPS failed.\n${err.message}`);
        app.listen(80);
        console.log("Listening on port 80.");
    }
}
