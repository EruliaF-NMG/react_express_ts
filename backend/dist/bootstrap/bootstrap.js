"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const main_module_1 = __importDefault(require("../main.module"));
const util_helpers_1 = require("../helpers/util-helpers");
const ioc_container_1 = __importDefault(require("./ioc-container"));
const core_enum_1 = require("../config/core.enum");
class Bootstrap {
    constructor() {
        this._instance = (0, express_1.default)();
        this._current_working_dir = process.cwd();
        this._controllers = [];
        this._services = [];
        this._repositories = [];
        this._init();
    }
    get instance() {
        return this._instance;
    }
    _init() {
        this._registerExpressMiddleware();
        this._registerPublicPaths();
        this._registerRoutesWithControllers();
    }
    _registerExpressMiddleware() {
        this._instance.use(express_1.default.json());
        this._instance.use((0, cors_1.default)());
    }
    _registerPublicPaths() {
        this._instance.use('/dist', express_1.default.static(path_1.default.join(this._current_working_dir, 'dist')));
        this._instance.use('/public', express_1.default.static(path_1.default.join(this._current_working_dir, 'public')));
    }
    _registerServiceProviders() {
        this._services.forEach((serviceProvilder) => {
            ioc_container_1.default.registerDependencies(serviceProvilder);
        });
    }
    _registerRepositories() {
        this._repositories.forEach((repositoryProvider) => {
            ioc_container_1.default.registerDependencies(repositoryProvider);
        });
    }
    _fetchModules(useClass = null) {
        if (!useClass)
            useClass = new main_module_1.default();
        const models = Reflect.getMetadata(core_enum_1.ModuleProperties.Modules, useClass.constructor);
        if ((0, util_helpers_1.isEmpty)(models))
            return;
        models.forEach((module) => {
            this._setControllers(module);
            this._setServices(module);
            this._setRepositories(module);
            this._fetchModules(module);
        });
    }
    _setControllers(module) {
        const controllers = Reflect.getMetadata(core_enum_1.ModuleProperties.Controller, module);
        this._controllers = [...this._controllers, ...controllers];
    }
    _setServices(module) {
        const services = Reflect.getMetadata(core_enum_1.ModuleProperties.Service, module);
        if (services)
            this._services = [...this._services, ...services];
    }
    _setRepositories(module) {
        const repositories = Reflect.getMetadata(core_enum_1.ModuleProperties.Repositories, module);
        this._repositories = [...this._repositories, ...repositories];
    }
    _registerRoutesWithControllers() {
        this._fetchModules();
        this._registerServiceProviders();
        this._registerRepositories();
        this._controllers.forEach((controller) => {
            const controllerInstance = new controller();
            const prefix = Reflect.getMetadata(core_enum_1.ModuleProperties.Prefix, controller);
            const routers = Reflect.getMetadata(core_enum_1.ModuleProperties.Routes, controller);
            routers.forEach(({ method, path, methodName }) => {
                this._instance[method](`${prefix}${path}`, controllerInstance[methodName].bind(controllerInstance));
            });
        });
    }
}
exports.default = new Bootstrap();
//# sourceMappingURL=bootstrap.js.map