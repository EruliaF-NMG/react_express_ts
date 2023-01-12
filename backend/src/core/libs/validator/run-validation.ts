/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 15:37:14
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 19:54:23
 */

import { eachOf, eachOfLimit } from 'async';
import { errorMessageList } from '../../../config/core.enum';

import * as validateMethos  from './validation-methods';

export default class RunValidation {

  public rules:any = {};
  public fileds:any= {};
  public message:any= {};
  public formObject:any= {};

  constructor(formObject:any) {
   
    this.rules = formObject.rules;
    this.fileds = formObject.fileds;
    this.message = formObject.message;
    this.formObject = formObject.formObject;
  }

  /**
   * @author Nisal Madusanka(EruliaF)
   * @description run validation
   * @param {*} cb callback function
   */
  validate(cb:Function) {
    let errorList : any = {
      __status: false,
      details: [],
    };

    eachOf(
      this.rules,
      (rulesItem :any, rulesKey:any, callback:Function) => {
        this.spreadAllValidationRules(rulesKey, (error:any) => {
          if (error) {
            errorList = {
              ...errorList,
              __status: true,
              details: [
                ...errorList.details,
                {
                  property: rulesKey,
                  message: error,
                },
              ],
            };
          }

          callback(null);
        });
      },
      () => {
        // eslint-disable-next-line no-underscore-dangle
        if (errorList.__status === true) {
          cb(errorList.details);
        } else {
          cb(null, true);
        }
      }
    );
  }

  spreadAllValidationRules(rulesKey:string, cb:Function) {
    if (rulesKey.indexOf('*') > -1) {
      // Todo
    } else {
      const subRulesSet = (this.rules[rulesKey] as string).split('|');
      this.checkValidity(rulesKey, subRulesSet, rulesKey, cb);
    }
  }

  checkValidity(inputKey:any, subRulesSet:any, rulesKey:any, cb:Function) {
    try {
      eachOfLimit(
        subRulesSet,
        1,
        (subRule:any, subKey:any, callback:Function) => {
          let param = [];
          let method = subRule;
          if (subRule.includes(':')) {
            param = subRule.split(':');
            // eslint-disable-next-line prefer-destructuring
            method = param[0];
            param = param[1].split(',');
          }

          const message = this.getMessage(inputKey, method);

          (validateMethos as any)[method](
            inputKey,
            this.formObject,
            param,
            message,
            this.fileds,
            (error:any) => {
              if (error) {
                callback(error);
              } else {
                callback(null);
              }
            }
          );
        },
        (error:any) => {
          if (error) {
            cb(error);
          } else {
            cb(null, true);
          }
        }
      );
    } catch (ex) {
      console.log(ex);
      cb(ex);
    }
  }

  getMessage(inputKey:any, method:any) {
    try {
      let messsage:any =
        this.message &&
        Object.prototype.hasOwnProperty.call(
          this.message,
          `${inputKey}.${method}`
        )
          ? this.message[`${inputKey}.${method}`]
          : errorMessageList[method] || '';

      messsage = messsage.replace(':attribute', this.getFiledName(inputKey));

      return messsage;
    } catch (ex) {
      console.log(
        `${
          '----------------Validation Exception-------------------' +
          '\n' +
          'Exception occurred at executing ---- getMessage-'
        }${method}\n` +
          `${ex}\n` +
          `------------------------------------------------`
      );
      return 'Error Message';
    }
  }

  //---

  getFiledName(key:any) {
    if (this.fileds) {
      if (Object.prototype.hasOwnProperty.call(this.fileds, key)) {
        return this.fileds[key];
      }
      return key;
    }
    return key;
  }
}
