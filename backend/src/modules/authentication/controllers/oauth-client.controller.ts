import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, ValidateBodyRequest } from "../../../core";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import { OauthClientDTO } from "../dtos/oauth-client.dto";
import { IOauthClient } from "../entities/oauth-client.entity";
import { IOauthClientService } from "../interface/oauth-client-service.interface";


@Injectable()
@Controller('/api/oauth-client')
export default class OauthClientController {
    
    constructor(
        @Inject("IOauthClientService") private _oauthClientService: IOauthClientService<IOauthClient>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const users = await this._oauthClientService.find();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,users));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed To Generate oauth client List'));
        }
    }

   
    @Post()
    @ValidateBodyRequest(OauthClientDTO)
    async create(request: Request, response: Response) {
        try{
            const user = await this._oauthClientService.create(request.body);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,user,'user created successfully'));
        } catch(ex){
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed To Create oauth client'));
        }
    }


}

