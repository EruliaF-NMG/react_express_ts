import { HTTPMethods, ModuleProperties } from "../../config/core.enum";
import { RouteDefinitionInterface } from "../types/type.interface";


export function Get(path: string = "") {
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata(ModuleProperties.Routes, target.constructor)) {
            Reflect.defineMetadata(ModuleProperties.Routes, [], target.constructor);
        }
        const routes = Reflect.getMetadata(ModuleProperties.Routes, target.constructor) as Array<RouteDefinitionInterface>;
        routes.push({
            method: HTTPMethods.Get,
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata(ModuleProperties.Routes, routes, target.constructor);
    };
}

export function Post(path: string = "") {
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata(ModuleProperties.Routes, target.constructor)) {
            Reflect.defineMetadata(ModuleProperties.Routes, [], target.constructor);
        }
        const routes = Reflect.getMetadata(ModuleProperties.Routes, target.constructor) as Array<RouteDefinitionInterface>;
        routes.push({
            method: HTTPMethods.Post,
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata(ModuleProperties.Routes, routes, target.constructor);
    };
}

export function Put(path: string = "") {
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata(ModuleProperties.Routes, target.constructor)) {
            Reflect.defineMetadata(ModuleProperties.Routes, [], target.constructor);
        }
        const routes = Reflect.getMetadata(ModuleProperties.Routes, target.constructor) as Array<RouteDefinitionInterface>;
        routes.push({
            method: HTTPMethods.Put,
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata(ModuleProperties.Routes, routes, target.constructor);
    };
}