import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, Put, ValidateBodyRequest } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import { PermissionDTO } from "../dtos/permission.dto";
import { IPermission } from "../entities/permission.entity";
import { IPermissionService } from "../interface/permission-service.interface";

@Injectable()
@Controller('/api/permission')
export default class PermissionController {
    
    constructor(
        @Inject("IPermissionService") private _permissionService: IPermissionService<IPermission>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const permissions = await this._permissionService.find();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,permissions));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed To Generate Permission List'));
        }
    }

    @Get("/:permissionsID")
    async getByID(request: Request, response: Response) {
        try{
            const permissions = await this._permissionService.findByID(request.params.permissionsID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,permissions));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed To Get Permission'));
        }
    }


    @Post()
    @ValidateBodyRequest(PermissionDTO)
    async create(request: Request, response: Response) {
        try{
            const permission = await this._permissionService.create(request.body);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,permission,'Permission created successfully'));
        } catch(ex){
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed To Create Permission'));
        }
    }

    @Put("/:permissionsID")
    @ValidateBodyRequest(PermissionDTO)
    async update(request: Request, response: Response) {
        try{
            const _id = mongooseWrapper.getObjectID(request.params.permissionsID);
            const permission = await this._permissionService.update({_id},request.body);
            if(permission)  return response.status(successPostResponse.httpStatus)
                                .json(generateResponse(successPostResponse,permission,'Permission update successfully'));
            else            return response.status(failedPostResponse.httpStatus)
                                .json(generateErrorResponse(failedPostResponse,{},'Failed To update Permission'));                   
        } catch(ex){ 
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed To update Permission'));
        }
    }

}

