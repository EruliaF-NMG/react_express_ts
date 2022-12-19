import { ModuleProperties } from "../../config/core.enum";
import { isEmpty } from "../../helpers/util-helpers";
import {ArrayOfClasses, Module, Provider} from "../types/type.interface";

const setControllers = (target: any, controllerInstance: ArrayOfClasses) => {
    if( isEmpty(controllerInstance) ) return;
    if (!Reflect.hasMetadata(ModuleProperties.Controller, target)) Reflect.defineMetadata(ModuleProperties.Controller, [], target);

    const controllers = Reflect.getMetadata(ModuleProperties.Controller, target) as Array<any>;
    Reflect.defineMetadata(ModuleProperties.Controller, [...controllers, ...controllerInstance], target);
}

const setRepositories = (target: any, repositoryInstance: Array<Provider>) => {
    if( isEmpty(repositoryInstance) ) return;
    if (!Reflect.hasMetadata(ModuleProperties.Repositories, target)) {
        Reflect.defineMetadata(ModuleProperties.Repositories, [], target);
    }
    const repository = Reflect.getMetadata(ModuleProperties.Repositories, target) as Array<Provider>;
    Reflect.defineMetadata(ModuleProperties.Repositories, [...repository,...repositoryInstance], target);
}

const setServices = (target: any, servicesInstance: Array<Provider>) => {
    if( isEmpty(servicesInstance) ) return;
    if(!Reflect.hasMetadata(ModuleProperties.Service, target)) Reflect.defineMetadata(ModuleProperties.Service, [], target);

    const services = Reflect.getMetadata(ModuleProperties.Service, target) as Array<Provider>;
    Reflect.defineMetadata(ModuleProperties.Service, [...services,...servicesInstance], target);
}

const setModels = (target: any, modelInstance: ArrayOfClasses) => {
    if( isEmpty(modelInstance) ) return;
    
    if(!Reflect.hasMetadata(ModuleProperties.Modules, target)) Reflect.defineMetadata(ModuleProperties.Modules, [], target);

    const module = Reflect.getMetadata(ModuleProperties.Modules, target) as Array<any>;
    Reflect.defineMetadata(ModuleProperties.Modules, [...module,...modelInstance], target);
}


export function Module(module: Module) {
    return (target: any): void => {
        setControllers(target, module.hasOwnProperty(ModuleProperties.Controller) ? module.controllers :[]);
        setRepositories(target, module.hasOwnProperty(ModuleProperties.Repositories) ? module.repositories :[]);
        setServices(target, module.hasOwnProperty(ModuleProperties.Service) ? module.services :[]);
        setModels(target, module.hasOwnProperty(ModuleProperties.Modules) ? module.modules : []);
    };
}