import { Handler } from "express";

export type Class = { new(...args: any[]): any; };

export type ControllerInstance = {
    [ handleName: string ] : Handler 
}

export type RouteDefinitionInterface = {
    path: string;
    method: 'get' | 'post' | 'delete' | 'put';
    methodName: string;
}

export interface Provider{
    provide: string;
    useClass: Class;
}

export type ArrayOfClasses = Array<Class>

export type Module = {
    controllers?: ArrayOfClasses,
    repositories?: Array<Provider>,
    services?: Array<Provider>,
    modules?: ArrayOfClasses
}
