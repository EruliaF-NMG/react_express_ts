import { Router } from "express";
import { ModuleProperties } from "../../config/core.enum";

export const router = Router()

export const Controller = (prefix: string): ClassDecorator => {
    return (target: any) => {
        Reflect.defineMetadata(ModuleProperties.Prefix, prefix, target);
        if (!Reflect.hasMetadata(ModuleProperties.Routes, target)) {
            Reflect.defineMetadata(ModuleProperties.Routes, [], target);
        }
    }
}