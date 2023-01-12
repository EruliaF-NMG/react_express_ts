
import iocContainer from "../../bootstrap/ioc-container";

interface Injection {
    index: number;
    key:   string;
}

export function Injectable() {
    return function Injectable<T extends { new(...args: any[]): {} }>(constructor: T): T | void {
        // replacing the original constructor with a new one that provides the injections from the Container
        return class extends constructor {
            constructor(...args: any[]) {
                // get injections from class; previously created by @inject()
                let injections = (constructor as any).injections as Injection[] || [];
                injections = injections.sort((a, b) => a.index - b.index);
                // get the instances to inject from the Container
                // this implementation does not support args which should not be injected
                //iocContainer.getContainer();
                const injectedArgs: any[] = injections.map(({ key }) => {
                    return iocContainer.getDependencies(constructor.name,key);
                });
                // call original constructor with injected arguments
                super(...injectedArgs);
               
            }
        }
    }
}

export function Inject(key: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        const injection: Injection            = { index: parameterIndex, key }
        const existingInjections: Injection[] = (target as any).injections || [];

        iocContainer.setDependencyMap(target.name,key);
       
        Object.defineProperty(target, "injections", {
            writable:     true,
            value:        [...existingInjections, injection]
        })
    }
}