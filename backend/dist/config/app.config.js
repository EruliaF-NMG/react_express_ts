"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salt = exports.refreshTokenLife = exports.tokenLife = exports.apiVersion = exports.baseUrl = exports.port = exports.currentEnv = void 0;
const currentEnv = process.env.APP_ENV || 'development';
exports.currentEnv = currentEnv;
const port = process.env.APP_PORT || 3000;
exports.port = port;
const baseUrl = process.env.APP_URL || `http://localhost:${port}/`;
exports.baseUrl = baseUrl;
const apiVersion = 'api/v1/';
exports.apiVersion = apiVersion;
const tokenLife = 36000;
exports.tokenLife = tokenLife;
const refreshTokenLife = 96000;
exports.refreshTokenLife = refreshTokenLife;
const salt = '97b8c4b382ff27e31408df9d528bb9ce';
exports.salt = salt;
//# sourceMappingURL=app.config.js.map