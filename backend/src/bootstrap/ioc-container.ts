import { Class, Provider } from "../core/types/type.interface";
import { findObjectKey, getValue, isEmpty } from "../helpers/util-helpers";

//---------Types--------------
export type ContainerObject = {
    'classReference' : Class,
    'objectReference' : Object|null,
    'className' : string
}
export type ContainerType = Map<string, ContainerObject>;

export type DependencyMap = Map<string,Array<string>>;

//---------Types--------------

class IOCContainer {

    private _container : ContainerType = <ContainerType> {};
    private _dependencyMap : DependencyMap = <DependencyMap>{}

    public registerDependencies(dependency: Provider) {
        if (!this._container.hasOwnProperty(dependency.provide)) {
            this._container = {
                ...this._container,
                [dependency.provide] : {
                    'classReference' : dependency.useClass,
                    'className' : dependency.useClass.name,
                    'objectReference' : null
                }
            }
        }
    }

    public getDependencies(className:string, key: string) : any {
       const objectReference = getValue(this._container,`${key}.objectReference`,null);
       if(objectReference != null ) return objectReference;
       return this._buildDependency(className,key); 
    }

    public setDependencyMap(key: string,mapTo:string) : void {
        this._dependencyMap = {
            ...this._dependencyMap,
            [key]:[...getValue(this._dependencyMap,`${key}`,[]), ...[mapTo]]
        }
    }

    public getDependencyMap(key: string) : Array<string> {
        return getValue(this._dependencyMap,`${key}`,[]);
    }

    public getContainer(): Map<string, any> {
        return this._container;
    }


    private _buildObjectReference(className:string,args:any[]=[]) : Object {
       
        const key = findObjectKey(this._container,{ "className" : className });
        const classReference:any = getValue(this._container,`${key}.classReference`,null);
        const object = new classReference(...args);
        this._container = {
            ...this._container,
            [key] : {
                ...getValue(this._container,`${key}`,{}),
                "objectReference" : object,
            }
        }
        return object;
    }

    private _buildDependency(className:string,key?:string) : any {

        className = key ? getValue(this._container,`${key}.className`,null) : className;
        const dependencies : Array<string> = getValue(this._dependencyMap,`${className}`,[]);
        if(isEmpty(dependencies)) {
           return this._buildObjectReference(className);
        }

        const args = dependencies.map((dependency) => {
            const objectReference = getValue(this._container,`${dependency}.objectReference`,null);
            if(objectReference != null ) return objectReference;
            const className = getValue(this._container,`${dependency}.className`);
            if(className == null) return;
            return this._buildDependency(className);
        });
        
        return this._buildObjectReference(className,args);
    }
}

export default new IOCContainer();