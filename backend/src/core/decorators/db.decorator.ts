import { SchemaTypeOptions } from "mongoose";


export function Column<T = any>(schemaOptions?: SchemaTypeOptions<T>) {
    return function (target: any, propertyKey: any) {

        const existingInjections: Map<string,SchemaTypeOptions<T>> = (target as any).injections || {};

        const type = Reflect.getMetadata("design:type", target, propertyKey);

        if(Array.isArray(schemaOptions)) {
            schemaOptions = [{ ...schemaOptions[0] }];
        } else {
            schemaOptions = {
                ...schemaOptions,
                type: schemaOptions.hasOwnProperty('type') ? schemaOptions.type : type.name
            };
        } 

       Object.defineProperty(target, "injections", {
        writable:     true,
        value:        {
            ...existingInjections,
            [propertyKey]:schemaOptions
        }
    })
    }
}

export function Entity<T>() { 
    return function (constructor: Function) { 
        const injections = constructor.prototype.injections as Map<string,SchemaTypeOptions<T>> || {};
        //constructor.prototype.injections = injections;
    }
}