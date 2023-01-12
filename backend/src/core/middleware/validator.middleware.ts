import { Request, Response, NextFunction } from "express";
import { badResponse } from "../../config/api-response.config";
import { generateErrorResponse, getValue, getValueWithFormatting } from "../../helpers/util-helpers";
import validate from "../libs/validator";
import { CustomRequest, ValidateObjectMetaData } from "../types/type.interface";

export const validateRequest = (validateObject: ValidateObjectMetaData) => <T> (req: CustomRequest<T>, res: Response, next:NextFunction) => {

    const useClass =  new validateObject.useClass();
    
    for (const key of Object.keys(getValue(validateObject,'properties',{}))) {
        useClass[key] = getValueWithFormatting(req.body as any,key,getValue(validateObject.properties,key,null));
    }

   

      validate(useClass)
        .setFileds(validateObject.fields||{})
        .setRules(validateObject.rules||{})
        .setMessage(validateObject.message||{})
        // eslint-disable-next-line consistent-return
        .run((error:any) => {
          if (error) {
            return res
              .status(badResponse.httpStatus)
              .send(
                generateErrorResponse(
                  badResponse,
                  error,
                  'Validation error'
                )
              );
          }
          req.body = useClass;
          next();
        });
};
  