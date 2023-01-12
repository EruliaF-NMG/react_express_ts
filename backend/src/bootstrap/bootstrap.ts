import express, { Application, Handler } from 'express';
import cors from 'cors';
import path from 'path';
import MainServiceProvilder from '../main.module';
import { ControllerInstance, Provider, RouteDefinitionInterface, ValidateObjectMetaData } from '../core/types/type.interface';
import { getValue, isEmpty } from '../helpers/util-helpers';
import iocContainer from './ioc-container';
import { ModuleProperties } from '../config/core.enum';
import { validateRequest } from '../core/middleware/validator.middleware';

class Bootstrap {

    private readonly _instance: Application = express();
    private readonly _current_working_dir: string = process.cwd();
    private _controllers: Array<any> = [];
    private _services: Array<Provider> = [];
    private _repositories: Array<Provider> = [];

    constructor() {
        this._init();
    }

    public get instance(): Application {
        return this._instance;
    }

    private _init(): void {
        this._registerExpressMiddleware();
        this._registerPublicPaths();
        this._registerRoutesWithControllers();
    }

    private _registerExpressMiddleware(): void {
        this._instance.use(express.json());
        this._instance.use(cors());
    }

    private _registerPublicPaths(): void {
        this._instance.use('/dist', express.static(path.join(this._current_working_dir, 'dist')));
        this._instance.use('/public', express.static(path.join(this._current_working_dir, 'public')));
    }

    private _registerServiceProviders(): void {
        this._services.forEach(( serviceProvilder ) => {
            iocContainer.registerDependencies(serviceProvilder);
        });
    }

    private _registerRepositories(): void {
        this._repositories.forEach(( repositoryProvider ) => {
            iocContainer.registerDependencies(repositoryProvider);
        });
    }

    private _fetchModules( useClass: any = null ) {
        if   (!useClass) useClass = new MainServiceProvilder();
        const models: Array<any>  = Reflect.getMetadata( ModuleProperties.Modules, useClass.constructor );
        if( isEmpty(models) ) return;
        models.forEach(( module ) => {
            this._setControllers(module);
            this._setServices(module);
            this._setRepositories(module);
            this._fetchModules( module );
        });
    } 

    private _setControllers(module:any): void {
        const controllers: Array<any> = Reflect.getMetadata( ModuleProperties.Controller , module ) || [];
        this._controllers = [...this._controllers,...controllers];
    } 

    private _setServices(module:any): void {
        const services: Array<Provider> = Reflect.getMetadata( ModuleProperties.Service, module ) || [];
        if( services ) this._services = [...this._services,...services];
    } 

    private _setRepositories(module:any): void {
        const repositories: Array<any> = Reflect.getMetadata( ModuleProperties.Repositories, module ) || [];
        this._repositories = [...this._repositories,...repositories];
    }

    private _registerRoutesWithControllers(): void {
        this._fetchModules();
        this._registerServiceProviders();
        this._registerRepositories();
        this._controllers.forEach(( controller ) => {
            const controllerInstance: ControllerInstance   = new controller() as any;
            const prefix: string                           = Reflect.getMetadata(ModuleProperties.Prefix, controller);
            const routers: Array<RouteDefinitionInterface> = Reflect.getMetadata(ModuleProperties.Routes, controller);
            const validateProperties: Map<string,ValidateObjectMetaData> = Reflect.getMetadata('validate_properties', controller) || {};
           
            routers.forEach(({ method, path, methodName }) => {

               const param : any = [];

               if( validateProperties.hasOwnProperty(methodName) ) param.push(validateRequest(getValue(validateProperties,methodName,{})));

               param.push(controllerInstance[methodName].bind(controllerInstance));

                this._instance.route(`${prefix}${path}`)[method](...param);
            });
        });
    }
    
}

export default new Bootstrap();