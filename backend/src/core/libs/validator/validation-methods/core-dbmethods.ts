/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 13:49:14
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 23:49:58
 */

import mongoose from 'mongoose';

import { getInputsForValidate, getValue } from '../../../../helpers/util-helpers';

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate unique with db
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const unique = (key:string, values:any, param:any, message:string, filedList:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    const filterOption :any = {
      [getValue(param, '1', key)]: formValue,
    };

    if (mongoose.Types.ObjectId.isValid(getValue(param, '2', '-'))) {
      // eslint-disable-next-line dot-notation
      filterOption['_id'] = {
        $ne: new mongoose.Types.ObjectId(getValue(param, '2', '-')),
      };
    }

    mongoose.connection
      .collection(getValue(param, '0', key))
      .findOne(filterOption, (error:any, result:any) => {
        if (result) {
          cb(message, null);
        } else {
          cb(null, true);
        }
      });
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (unique)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { unique };
