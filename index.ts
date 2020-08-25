import express, { Express, Response } from "express";
const app: Express = express();
app.use(express.static(`${__dirname}/build`));
app.get("*", (_req, res: Response) => res.sendFile(`${__dirname}/build/index.html`));
app.listen(9000, () => console.log("Running on port 9000."));
