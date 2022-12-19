"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.Module = exports.Inject = exports.Injectable = exports.Controller = void 0;
const controller_decorator_1 = require("./decorators/controller.decorator");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return controller_decorator_1.Controller; } });
const ioc_decorator_1 = require("./decorators/ioc.decorator");
Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return ioc_decorator_1.Inject; } });
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return ioc_decorator_1.Injectable; } });
const module_decorator_1 = require("./decorators/module.decorator");
Object.defineProperty(exports, "Module", { enumerable: true, get: function () { return module_decorator_1.Module; } });
const router_decorator_1 = require("./decorators/router.decorator");
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return router_decorator_1.Get; } });
//# sourceMappingURL=index.js.map