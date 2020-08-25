"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = express_1["default"]();
app.use(express_1["default"].static(__dirname + "/build"));
app.get("*", function (_req, res) { return res.sendFile(__dirname + "/build/index.html"); });
app.listen(9000, function () { return console.log("Running on port 9000."); });
