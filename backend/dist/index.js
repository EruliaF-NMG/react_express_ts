"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = __importDefault(require("http"));
const app_config_1 = require("./config/app.config");
const bootstrap_1 = __importDefault(require("./bootstrap/bootstrap"));
const server = http_1.default.createServer(bootstrap_1.default.instance);
server.listen(app_config_1.port, () => {
    console.log(`Server is listening on :${app_config_1.port}`);
});
//# sourceMappingURL=index.js.map