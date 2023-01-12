/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 19:52:40
 * @Last Modified by:   Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 19:52:40
 */

import RunValidation from './run-validation';

const validate = (formObject:any) => {
  let validateObject = {
    rules: {},
    fileds: {},
    message: {},
    formObject,
  };
  return {
    setRules(rules:any) {
      validateObject = {
        ...validateObject,
        rules:rules,
      };
      return this;
    },
    setFileds(fileds:any) {
      validateObject = {
        ...validateObject,
        fileds:fileds,
      };
      return this;
    },
    setMessage(message:any) {
      validateObject = {
        ...validateObject,
        message:message,
      };
      return this;
    },
    run(cb:Function) {
      const validateObj = new RunValidation(validateObject);
      return validateObj.validate(cb);
    },
  };
};

export default validate;
