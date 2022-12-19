"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_helpers_1 = require("../helpers/util-helpers");
//---------Types--------------
class IOCContainer {
    constructor() {
        this._container = {};
        this._dependencyMap = {};
    }
    registerDependencies(dependency) {
        if (!this._container.hasOwnProperty(dependency.provide)) {
            this._container = Object.assign(Object.assign({}, this._container), { [dependency.provide]: {
                    'classReference': dependency.useClass,
                    'className': dependency.useClass.name,
                    'objectReference': null
                } });
        }
    }
    getDependencies(className, key) {
        const objectReference = (0, util_helpers_1.getValue)(this._container, `${key}.objectReference`, null);
        if (objectReference != null)
            return objectReference;
        return this._buildDependency(className, key);
    }
    setDependencyMap(key, mapTo) {
        this._dependencyMap = Object.assign(Object.assign({}, this._dependencyMap), { [key]: [...(0, util_helpers_1.getValue)(this._dependencyMap, `${key}`, []), ...[mapTo]] });
    }
    getDependencyMap(key) {
        return (0, util_helpers_1.getValue)(this._dependencyMap, `${key}`, []);
    }
    getContainer() {
        return this._container;
    }
    _buildObjectReference(className, args = []) {
        const key = (0, util_helpers_1.findObjectKey)(this._container, { "className": className });
        const classReference = (0, util_helpers_1.getValue)(this._container, `${key}.classReference`, null);
        const object = new classReference(...args);
        this._container = Object.assign(Object.assign({}, this._container), { [key]: Object.assign(Object.assign({}, (0, util_helpers_1.getValue)(this._container, `${key}`, {})), { "objectReference": object }) });
        return object;
    }
    _buildDependency(className, key) {
        className = key ? (0, util_helpers_1.getValue)(this._container, `${key}.className`, null) : className;
        const dependencies = (0, util_helpers_1.getValue)(this._dependencyMap, `${className}`, []);
        if ((0, util_helpers_1.isEmpty)(dependencies)) {
            return this._buildObjectReference(className);
        }
        const args = dependencies.map((dependency) => {
            const objectReference = (0, util_helpers_1.getValue)(this._container, `${dependency}.objectReference`, null);
            if (objectReference != null)
                return objectReference;
            const className = (0, util_helpers_1.getValue)(this._container, `${dependency}.className`);
            if (className == null)
                return;
            return this._buildDependency(className);
        });
        return this._buildObjectReference(className, args);
    }
}
exports.default = new IOCContainer();
//# sourceMappingURL=ioc-container.js.map