
import _ from 'lodash';

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
 * Get values
 * @param object 
 * @param path 
 * @param defaultValue 
 * @returns 
 */
export const setValue = (object:any,path:any,defaultValue?:any): any => {
    return _.set(object,path,defaultValue);
}

/**
 * Find Object key
 * @param value 
 * @param predicate 
 * @returns 
 */
export const findObjectKey = (value:any,predicate :any): string|undefined => {
    return _.findKey(value,predicate);
}

/**
 * lodash findindex() wrapper
 * @param (any) object
 * @param (Array|Function) finder
 */

export const _findindex = (object:any, finder:any) => {
    return _.findIndex(object, finder);
  };

/**
 * @param (Object) object
 * @param (any) finder
 * @param {string} valueKey required value path
 * @param {any} defaultValue default Value
 * @param {any} ifNotFound return value if not found data
 */
export const getValueByFilter = ( object:any, finder:any, valueKey:string = '', defaultValue:any = null, ifNotFound:any = null ) => {
    const index = _findindex(object, finder);
    if (index === -1) return ifNotFound;
    return getValue(
        object,
        valueKey ? `${index}.${valueKey}` : `${index}`,
        defaultValue
    );    
};