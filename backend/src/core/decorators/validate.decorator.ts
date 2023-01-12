import { getValue } from "../../helpers/util-helpers";
import { Class, CustomValidationMessage } from "../types/type.interface";


export function InputField() {
    return function (target: any, propertyKey: any) {
    
       const existingInjections: Map<string,any> = (target as any)._validateRules || {}

       const type = Reflect.getMetadata("design:type", target, propertyKey);

       Object.defineProperty(target, "_validateRules", {
            writable: true,
            value:    {
                ...existingInjections,
                properties:{
                    ...getValue(existingInjections,`properties`,{}),
                    [propertyKey]: type.name
                }
            }
       });
    };
}

export function DisplayName(name:string) {
    return function (target: any, propertyKey: any) {
    
        const existingInjections: Map<string,any> = (target as any)._validateRules || {}

       Object.defineProperty(target, "_validateRules", {
            writable: true,
            value:    {
                ...existingInjections,
                fields:{
                    ...getValue(existingInjections,`fields`,{}),
                    [propertyKey]: name
                }
            }
       });
    };
}

export function Rules(rules:string) {
    return function (target: any, propertyKey: any) {

       const existingInjections: Map<string,any> = (target as any)._validateRules || {}

       Object.defineProperty(target, "_validateRules", {
        writable: true,
        value:    {
            ...existingInjections,
            rules:{
                ...getValue(existingInjections,`rules`,{}),
                [propertyKey]: rules,
            }
        }});
    };
}

export function Message(message:CustomValidationMessage) {
    return function (target: any, propertyKey: any) {
        const existingInjections: Map<string,any> = (target as any)._validateRules || {};
        let messageObject : Map<string,string> = <Map<string,string>>{};

        Object.keys(message).forEach((key) => {
            messageObject = {
                ...messageObject,
                [`${propertyKey}.${key}`] : message[key] 
            }
        });

        Object.defineProperty(target, "_validateRules", {
         writable: true,
         value:    {
             ...existingInjections,
             message:{
                 ...getValue(existingInjections,`message`,{}),
                 ...messageObject,
             }
         }});
    };
}

export function Validate() { 
    return function (target: any) {
        Reflect.defineMetadata('validate', target.prototype._validateRules, target);
    }
}

export function ValidateBodyRequest(useClass:Class) { 
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) { 
        if(Reflect.hasMetadata('validate', useClass)){
       
            const validateObject = Reflect.getMetadata('validate', useClass) as Map<string,any>;
            const existingInjections = Reflect.getMetadata('validate_properties', target.constructor) as Map<string,any>;
            Reflect.defineMetadata('validate_properties', {
                ...existingInjections,
                [propertyKey]:{
                    ...validateObject,
                    useClass
                }
            }, target.constructor);
        }
    }
}