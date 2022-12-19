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
var module_decorator_1 = require("../../core/decorators/module.decorator");
var demo_controller_1 = __importDefault(require("./demo.controller"));
// class DemoServiceProvilder implements ServiceProviderInterface {
//     // Register all controllers here
//     controllers: Controller = [
//         DemoController
//     ];
//     // Register all repositories here
//     repositories: Array<Provider> = [
//     ];
//     // Register all services here
//     services: Array<Provider> = [
//     ];
// }
// export default new DemoServiceProvilder();
var DemoServiceProvilder = /** @class */ (function () {
    function DemoServiceProvilder() {
    }
    DemoServiceProvilder = __decorate([
        (0, module_decorator_1.Module)({
            controllers: [demo_controller_1.default]
        })
    ], DemoServiceProvilder);
    return DemoServiceProvilder;
}());
exports.default = DemoServiceProvilder;
//# sourceMappingURL=demo.service-provider.js.map