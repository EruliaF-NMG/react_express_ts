import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, Put, ValidateBodyRequest } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import { RoleDTO } from "../dtos/role.dto";
import { IRole } from "../entities/role.entity";
import { IRoleService } from "../interface/role-service.interface";

@Injectable()
@Controller('/api/role')
export default class RoleController {
    
    constructor(
        @Inject("IRoleService") private _roleService: IRoleService<IRole>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const roles = await this._roleService.find();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,roles));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed To Generate Role List'));
        }
    }

    @Get("/:roleID")
    async getByID(request: Request, response: Response) {
        try{
            const role = await this._roleService.findByID(request.params.roleID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,role));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed To Get Role'));
        }
    }


    @Post()
    @ValidateBodyRequest(RoleDTO)
    async create(request: Request, response: Response) {
        try{
            const roleObject:RoleDTO = <RoleDTO>request.body;
            roleObject.permissions = roleObject.permissions ?? [];
            const role = await this._roleService.create(roleObject);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,role,'Role created successfully'));
        } catch(ex){
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed To Create role'));
        }
    }

    @Put("/:roleID")
    @ValidateBodyRequest(RoleDTO)
    async update(request: Request, response: Response) {
        try{
            const _id = mongooseWrapper.getObjectID(request.params.roleID);
            const roleObject:RoleDTO = <RoleDTO>request.body;
            roleObject.permissions = roleObject.permissions ?? [];
            const role = await this._roleService.update({_id},roleObject);
            if(role) return response.status(successPostResponse.httpStatus)
                        .json(generateResponse(successPostResponse,role,'Role update successfully'));
            else     return response.status(failedPostResponse.httpStatus)
                        .json(generateErrorResponse(failedPostResponse,{},'Failed To update role'));                
        } catch(ex){ 
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed To update role'));
        }
    }

}

