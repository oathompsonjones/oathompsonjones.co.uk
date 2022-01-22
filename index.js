"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("simple-node-utils");
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
void (async () => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    const jsonImport = (await Promise.resolve().then(() => __importStar(require("./config.json")))).default;
    let config = jsonImport;
    config.update = (obj) => {
        config = Object.assign(config, obj);
        fs_1.default.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    };
    const refreshInstagramToken = async () => {
        if (Date.now() > config.instagram.accessTokenRefreshAt) {
            const response = await axios_1.default.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${config.instagram.accessToken}`);
            const { access_token, expires_in } = response.data;
            config.update({
                instagram: {
                    ...config.instagram,
                    accessToken: access_token,
                    accessTokenRefreshAt: Math.floor(Date.now() + 9 * expires_in / 10)
                }
            });
        }
    };
    setInterval(async () => {
        try {
            await refreshInstagramToken();
        }
        catch (err) {
            console.error(err);
            process.exit(0);
        }
    }, 60_000);
    app.get("/api/twitter", async (_req, res) => {
        res.sendStatus(500);
    });
    app.get("/api/instagram", async (_req, res) => {
        try {
            const response = await axios_1.default.get(`https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${config.instagram.accessToken}`);
            res.send(response.data.data);
        }
        catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    });
    app.get("/api/github", async (_req, res) => {
        res.sendStatus(500);
    });
    app.get("/email", (_req, res) => void res.redirect("mailto:oathompsonjones@gmail.com"));
    app.get("/discord", (_req, res) => void res.redirect("https://discord.com/users/310145094684639235"));
    app.get("/facebook", (_req, res) => void res.redirect("https://facebook.com/oathompsonjones"));
    app.get("/github", (_req, res) => void res.redirect("https://github.com/oathompsonjones"));
    app.get("/instagram", (_req, res) => void res.redirect("https://instagram.com/oathompsonjones"));
    app.get("/linkedin", (_req, res) => void res.redirect("https://linkedin.com/in/oathompsonjones"));
    app.get("/twitter", (_req, res) => void res.redirect("https://twitter.com/oathompsonjones"));
    app.use(express_1.default.static(`${__dirname}/client/build`));
    app.get("*", (_req, res) => void res.sendFile(`${__dirname}/client/build/index.html`));
    app.listen(config.port, () => void console.log(`Listening on port ${config.port}.`));
})();
