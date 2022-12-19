"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const core_enum_1 = require("../../config/core.enum");
const util_helpers_1 = require("../../helpers/util-helpers");
const setControllers = (target, controllerInstance) => {
    if ((0, util_helpers_1.isEmpty)(controllerInstance))
        return;
    if (!Reflect.hasMetadata(core_enum_1.ModuleProperties.Controller, target))
        Reflect.defineMetadata(core_enum_1.ModuleProperties.Controller, [], target);
    const controllers = Reflect.getMetadata(core_enum_1.ModuleProperties.Controller, target);
    Reflect.defineMetadata(core_enum_1.ModuleProperties.Controller, [...controllers, ...controllerInstance], target);
};
const setRepositories = (target, repositoryInstance) => {
    if ((0, util_helpers_1.isEmpty)(repositoryInstance))
        return;
    if (!Reflect.hasMetadata(core_enum_1.ModuleProperties.Repositories, target)) {
        Reflect.defineMetadata(core_enum_1.ModuleProperties.Repositories, [], target);
    }
    const repository = Reflect.getMetadata(core_enum_1.ModuleProperties.Repositories, target);
    Reflect.defineMetadata(core_enum_1.ModuleProperties.Repositories, [...repository, ...repositoryInstance], target);
};
const setServices = (target, servicesInstance) => {
    if ((0, util_helpers_1.isEmpty)(servicesInstance))
        return;
    if (!Reflect.hasMetadata(core_enum_1.ModuleProperties.Service, target))
        Reflect.defineMetadata(core_enum_1.ModuleProperties.Service, [], target);
    const services = Reflect.getMetadata(core_enum_1.ModuleProperties.Service, target);
    Reflect.defineMetadata(core_enum_1.ModuleProperties.Service, [...services, ...servicesInstance], target);
};
const setModels = (target, modelInstance) => {
    if ((0, util_helpers_1.isEmpty)(modelInstance))
        return;
    if (!Reflect.hasMetadata(core_enum_1.ModuleProperties.Modules, target))
        Reflect.defineMetadata(core_enum_1.ModuleProperties.Modules, [], target);
    const module = Reflect.getMetadata(core_enum_1.ModuleProperties.Modules, target);
    Reflect.defineMetadata(core_enum_1.ModuleProperties.Modules, [...module, ...modelInstance], target);
};
function Module(module) {
    return (target) => {
        setControllers(target, module.hasOwnProperty(core_enum_1.ModuleProperties.Controller) ? module.controllers : []);
        setRepositories(target, module.hasOwnProperty(core_enum_1.ModuleProperties.Repositories) ? module.repositories : []);
        setServices(target, module.hasOwnProperty(core_enum_1.ModuleProperties.Service) ? module.services : []);
        setModels(target, module.hasOwnProperty(core_enum_1.ModuleProperties.Modules) ? module.modules : []);
    };
}
exports.Module = Module;
//# sourceMappingURL=module.decorator.js.map