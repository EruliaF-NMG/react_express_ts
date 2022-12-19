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
var module_decorator_1 = require("./core/decorators/module.decorator");
var demo_service_provider_1 = __importDefault(require("./modules/demo/demo.service-provider"));
// class MainServiceProvilder implements ServiceProviderInterface {
//     // Register all controllers here
//     controllers: Controller = [
//         ...DemoServiceProvide.controllers,
//     ];
//     // Register all repositories here
//     repositories: Array<Provider> = [
//         ...DemoServiceProvide.repositories,
//     ];
//     // Register all services here
//     services: Array<Provider> = [
//         ...DemoServiceProvide.services,
//     ];
// }
// export default new MainServiceProvilder();
var MainServiceProvilder = /** @class */ (function () {
    function MainServiceProvilder() {
    }
    MainServiceProvilder = __decorate([
        (0, module_decorator_1.Module)({
            modules: [demo_service_provider_1.default]
        })
    ], MainServiceProvilder);
    return MainServiceProvilder;
}());
exports.default = MainServiceProvilder;
//# sourceMappingURL=main.service-provider.js.map