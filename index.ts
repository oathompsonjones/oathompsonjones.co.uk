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

// Redirect users to correct URLs.
app.use((req, res, next) => {
    // Move on if running on localhost.
    if (req.hostname === "localhost" || req.hostname === "127.0.0.1")
        return next();
    // Check that the URL is correct.
    if ((/(.*)oathompsonjones\.co\.uk/u).exec(req.hostname) === null) {
        // Log the domain to the file.
        let fileContents: Buffer;
        try {
            fileContents = fs.readFileSync("./domains.csv");
        } catch (err) {
            fs.writeFileSync("./domains.csv", "");
            fileContents = fs.readFileSync("./domains.csv");
        }
        fs.writeFileSync("./domains.csv", [
            ...new Set(fileContents.toString("utf8").split(",")
                .filter((x) => x)
                .concat(req.hostname.trim()))
        ].join(","));
        // Send back a warning to the user.
        const warningMessage = (count: number): string => `This page is pretending to be <a href="https://oathompsonjones.co.uk">https://oathompsonjones.co.uk</a>.<br>You will be redirected in ${count} second${count === 0 ? "" : "s"}.`;
        return res.send(`
            <html>
                <body>
                    <p id="text"></p>
                    <script>
                        document.getElementById("text").innerHTML = '${warningMessage(5)}';
                        setTimeout(() => {
                            document.getElementById("text").innerHTML = '${warningMessage(4)}';
                            setTimeout(() => {
                                document.getElementById("text").innerHTML = '${warningMessage(3)}';
                                setTimeout(() => {
                                    document.getElementById("text").innerHTML = '${warningMessage(2)}';
                                    setTimeout(() => {
                                        document.getElementById("text").innerHTML = '${warningMessage(1)}';
                                        setTimeout(() => window.location = "https://oathompsonjones.co.uk", 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    </script>
                </body>
            </html>
        `);
    }
    // Redirect http requests to https.
    if (req.protocol === "http")
        return res.redirect(`https://oathompsonjones.co.uk"${req.url}`);
    // Move on.
    return next();
});

// Serve static content.
app.use(e.static(`${__dirname}/client/build`));

// Handle API calls.
app.get("/api/github", (req, res) => void GitHub.requestHandler(req, res));
app.get("/api/instagram", (req, res) => void Instagram.requestHandler(req, res));
app.post("/api/contact", Contact.requestHandler);

// Handle redirects.
for (const { route, redirect } of Redirects.default)
    app.get(route, (_req: Request, res: Response): void => res.redirect(redirect));

// Forward all other routes to the index.html file.
app.get("*", (_req: Request, res: Response): void => res.sendFile(`${__dirname}/client/build/index.html`));

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
