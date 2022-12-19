"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
const demo_controller_1 = __importDefault(require("./demo.controller"));
const demo_repositories_1 = require("./demo.repositories");
const demo_service_1 = require("./demo.service");
let DemoModule = class DemoModule {
};
DemoModule = __decorate([
    (0, core_1.Module)({
        controllers: [demo_controller_1.default],
        services: [{ provide: 'IDemo', useClass: demo_service_1.DemoService }],
        repositories: [{ provide: 'IDemoRepo', useClass: demo_repositories_1.DemoRepositories }],
    })
], DemoModule);
exports.default = DemoModule;
//# sourceMappingURL=demo.module.js.map