"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.router = void 0;
const express_1 = require("express");
const core_enum_1 = require("../../config/core.enum");
exports.router = (0, express_1.Router)();
const Controller = (prefix) => {
    return (target) => {
        Reflect.defineMetadata(core_enum_1.ModuleProperties.Prefix, prefix, target);
        if (!Reflect.hasMetadata(core_enum_1.ModuleProperties.Routes, target)) {
            Reflect.defineMetadata(core_enum_1.ModuleProperties.Routes, [], target);
        }
    };
};
exports.Controller = Controller;
//# sourceMappingURL=controller.decorator.js.map