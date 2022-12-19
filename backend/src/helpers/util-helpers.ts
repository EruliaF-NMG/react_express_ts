import _ from "lodash";

/**
 * Check value is empty
 * @param value
 * @returns 
 */
export const isEmpty = (value:any): boolean => {
    return _.isEmpty(value);
}

/**
 * Get values
 * @param object 
 * @param path 
 * @param defaultValue 
 * @returns 
 */
export const getValue = (object:any,path:any,defaultValue?:any): any => {
    return _.get(object,path,defaultValue);
}

/**
 * Find Object key
 * @param value 
 * @param predicate 
 * @returns 
 */
export const findObjectKey = (value:any,predicate :any): string => {
    return _.findKey(value,predicate);
}