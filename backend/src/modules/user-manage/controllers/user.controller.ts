import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, Put, ValidateBodyRequest } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { encryptPassword } from "../../../helpers/bcrypt-helpers";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { EditUserDTO } from "../dtos/edit-user.dto";
import { IProfile } from "../entities/profile.entity";

import { IUser } from "../entities/user.entity";
import { IUserService } from "../interface/user-service.interface";

@Injectable()
@Controller('/api/user')
export default class UserController {
    
    constructor(
        @Inject("IUserService") private _userService: IUserService<IUser>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const users = await this._userService.find();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,users));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed To Generate user List'));
        }
    }

    @Get("/:userID")
    async getByID(request: Request, response: Response) {
        try{
            const user = await this._userService.findByID(request.params.userID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,user));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed To Get user'));
        }
    }


    @Post()
    @ValidateBodyRequest(CreateUserDTO)
    async create(request: Request, response: Response) {
        try{
            const userObject:CreateUserDTO = <CreateUserDTO>request.body;
            userObject.password=encryptPassword(userObject.password);
            userObject.roles = userObject.roles ?? [];
            const user = await this._userService.create(userObject);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,user,'user created successfully'));
        } catch(ex){
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed To Create user'));
        }
    }

    @Put("/:userID")
    @ValidateBodyRequest(EditUserDTO)
    async update(request: Request, response: Response) {
        try {
            const _id = mongooseWrapper.getObjectID(request.params.userID);
            const userObj:IUser = <IUser>{};
            userObj.first_name = request.body.first_name;
            userObj.last_name = request.body.last_name;
            userObj.profile = <IProfile> {
                about : request.body.about ?? "",
                address : request.body.address ?? "",
                contact : request.body.contact ?? "",
            }
            const user = await this._userService.update({_id},userObj);
            if(user) return response.status(successPostResponse.httpStatus)
                            .json(generateResponse(successPostResponse,user,'user update successfully'));
            else     return response.status(failedPostResponse.httpStatus)
                            .json(generateErrorResponse(failedPostResponse,{},'Failed To update user'));
        } catch(ex){ 
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed To update user'));
        }
    }

}

