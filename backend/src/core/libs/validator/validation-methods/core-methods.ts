import { getInputsForValidate, mapInputKey } from '../../../../helpers/util-helpers';


/**
 * @description validate required fields
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const required = (key:string, values:any, param:any, message:string, filedList:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    if (formValue === null || formValue === undefined || formValue === '') {
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (required)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate required if on another field
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const requiredIf = (key:string, values:any, param:any, message:string, filedList:any, cb:Function) => {
  try {
    const mainFild = getInputsForValidate(
      values,
      mapInputKey(key, param[0])
    );

    if (String(mainFild) === String(param[1])) {
      required(key, values, [], message, filedList, cb);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (requiredIf)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description compare two fields having same value
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const same = (key:string, values:any, param:any, message:string, filedList:any, cb:Function) => {
  try {
    const valueOne = getInputsForValidate(values, key);
    const valueTwo = getInputsForValidate(values, param[0]);

    if (`${valueOne}` !== `${valueTwo}`) {
      message.replace(':other', filedList[param[0]]);
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (same)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );
  }
};

/**
 * @description validate email address
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const email = (key:string, values:any, param:any, message:string, filedList:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    // eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValue)) {
      cb(null, true);
    } else {
      cb(message);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (email)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate max
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const max = (key:string, values:any, param:any, message:string, filedList:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    if (formValue && formValue.length > param) {
      let newMessage = message;
      newMessage = newMessage.replace(':max', param);
      cb(newMessage);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (max)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate min
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const min = (key:string, values:any, param:any, message:string, filedList:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    if (formValue && formValue.length < param) {
      let newMessage = message;
      newMessage = newMessage.replace(':min', param);
      cb(newMessage);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (min)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate is array fields
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const isArray = (key:string, values:any, param:any, message:string, filedList:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    if (Array.isArray(formValue) === false) {
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (isArray)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

export { required, requiredIf, same, email, max, min, isArray };
