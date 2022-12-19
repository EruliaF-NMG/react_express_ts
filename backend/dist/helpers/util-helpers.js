"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findObjectKey = exports.getValue = exports.isEmpty = void 0;
const lodash_1 = __importDefault(require("lodash"));
/**
 * Check value is empty
 * @param value
 * @returns
 */
const isEmpty = (value) => {
    return lodash_1.default.isEmpty(value);
};
exports.isEmpty = isEmpty;
/**
 * Get values
 * @param object
 * @param path
 * @param defaultValue
 * @returns
 */
const getValue = (object, path, defaultValue) => {
    return lodash_1.default.get(object, path, defaultValue);
};
exports.getValue = getValue;
/**
 * Find Object key
 * @param value
 * @param predicate
 * @returns
 */
const findObjectKey = (value, predicate) => {
    return lodash_1.default.findKey(value, predicate);
};
exports.findObjectKey = findObjectKey;
//# sourceMappingURL=util-helpers.js.map