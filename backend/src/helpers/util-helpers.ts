import _ from "lodash";
import { CustomResponse } from "../config/api-response.config";
import { errorMessageList } from "../config/core.enum";

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


export const isEmptyValue = (value:any) => {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    value === 'undefined'
  ) {
    return true;
  }
  return false;
};

export const isNull = (value:any) => {
  if (
    value === null ||
    value === 'null' 
  ) {
    return true;
  }
  return false;
};

export const isUndefined = (value:any) => {
  if (
    value === undefined ||
    value === 'undefined' 
  ) {
    return true;
  }
  return false;
};

export const toBoolean = (value:any) => {
  if(isEmptyValue(value)) return false;
  if(value === '1' || value === 'true' || value == true) return true;
  return false; 
};

/**
 * 
 * @param object 
 * @param key 
 * @param type 
 * @returns 
 */
export const getValueWithFormatting = (object:Map<string,any>,key:string|Number,type:string): any => {
  const value = getValue(object, key, null);
    switch (type) {
      case 'string': {
        return isEmptyValue(value) ? "" : value;
      }
      case 'number': {
        return isEmptyValue(value) ? null : Number(value);
      }
      case 'boolean': {
        return isEmptyValue(value) ? false : toBoolean(value);
      }
      default: {
        return value;
      }
    }
}

/**
 * @description generate success response structure
 * @param {Object} commonResponse
 * @param {Object|Array} errorObj Error Object
 * @param {String} message api meta message
 */
export const generateErrorResponse = (
  commonResponse : CustomResponse = <CustomResponse>{},
  errorObj:any = {},
  message:string = ''
) => {
    const response = {
      meta: {
        code: commonResponse.code,
        message: message === '' ? commonResponse.message : message,
      },
      error: generateErrorObject(errorObj),
    };
    return response;
};

export const generateErrorObject = (err:any) => {
  if (err && err.code === 11000) {
    return [
      {
        property: Object.keys(err.keyPattern)[0],
        message: errorMessageList.unique.replace(
          ':attribute',
          Object.keys(err.keyPattern)[0]
        ),
      },
    ];
  }

  return err;
};

/**
 * @description generate success response structure
 * @param {CustomResponse} commonResponse
 * @param {Object|Array} data data body
 * @param {String} message api meta message
 */
export const generateResponse = (commonResponse :CustomResponse = <CustomResponse>{}, data:Object|Array<any> = {}, message:string = '') => {
  const response = {
    meta: {
      code: commonResponse.code,
      message: message === '' ? commonResponse.message : message,
    },
    data,
  };
  return response;
};

/**
 *  @author Nisal Madusanka(EruliaF)
 * @description get from inputs for form validation
 * @param {Object|Array} formValue form data list
 * @param {string} key form value key
 */
export const getInputsForValidate = (formValue:any, key:any) => {
    let value = getValue(formValue, key, '');
  
    switch (typeof value) {
      case 'string': {
        value = value.trim();
        break;
      }
      default: {
        break;
      }
    }
    return value;
  };

/**
 * @author Nisal Madusanka(EruliaF)
 * @description genarate map key for form validation
 * @param {string} realInputKey known key
 * @param {string} keyToMap key should find
 */
export const mapInputKey = (realInputKey:string, keyToMap:string) => {
    const arrayMatch = realInputKey.match(/(\.\d*\.)/g);
    let key = 0;
    const returnData = keyToMap.replace(/(\.\**\.)/g, () => {
      const value = arrayMatch[key];
      key += 1;
      return value;
    });
    return returnData;
  };

  
