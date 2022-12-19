"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
const core_enum_1 = require("../../config/core.enum");
function Get(path) {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata(core_enum_1.ModuleProperties.Routes, target.constructor)) {
            Reflect.defineMetadata(core_enum_1.ModuleProperties.Routes, [], target.constructor);
        }
        const routes = Reflect.getMetadata(core_enum_1.ModuleProperties.Routes, target.constructor);
        routes.push({
            method: core_enum_1.HTTPMethods.Get,
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata(core_enum_1.ModuleProperties.Routes, routes, target.constructor);
    };
}
exports.Get = Get;
//# sourceMappingURL=router.decorator.js.map