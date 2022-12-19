"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = exports.Injectable = void 0;
const ioc_container_1 = __importDefault(require("../../bootstrap/ioc-container"));
function Injectable() {
    return function Injectable(constructor) {
        // replacing the original constructor with a new one that provides the injections from the Container
        return class extends constructor {
            constructor(...args) {
                // get injections from class; previously created by @inject()
                const injections = constructor.injections || [];
                // get the instances to inject from the Container
                // this implementation does not support args which should not be injected
                //iocContainer.getContainer();
                const injectedArgs = injections.map(({ key }) => {
                    return ioc_container_1.default.getDependencies(constructor.name, key);
                });
                // call original constructor with injected arguments
                super(...injectedArgs);
            }
        };
    };
}
exports.Injectable = Injectable;
function Inject(key) {
    return function (target, propertyKey, parameterIndex) {
        const injection = { index: parameterIndex, key };
        const existingInjections = target.injections || [];
        ioc_container_1.default.setDependencyMap(target.name, key);
        // create property 'injections' holding all constructor parameters, which should be injected
        Object.defineProperty(target, "injections", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: [...existingInjections, injection]
        });
    };
}
exports.Inject = Inject;
//# sourceMappingURL=ioc.decorator.js.map