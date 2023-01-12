import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse, unauthorizedResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, ValidateBodyRequest } from "../../../core";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import { IUser } from "../../user-manage/entities/user.entity";
import { IUserService } from "../../user-manage/interface/user-service.interface";
import { ClientFilterType, JWTResponse } from "../auth.types";
import { AuthDTO } from "../dtos/auth.dto";
import { IOauthAccessToken } from "../entities/oauth-access-token.entity";
import { IOauthAccessTokenService } from "../interface/oauth-access-token-service.interface";


@Injectable()
@Controller('/api/auth')
export default class AuthController {
    
    constructor(
        @Inject("IUserService") private _userService: IUserService<IUser>,
        @Inject("IOauthAccessTokenService") private _oauthAccessTokenService: IOauthAccessTokenService<IOauthAccessToken>,
    ) {}


    @Post('/token')
    @ValidateBodyRequest(AuthDTO)
    async token(request: Request, response: Response) {
    
       const user:IUser = await this._userService.checkUserCredentials(request.body.email,request.body.password);
       if(!user) response.status(unauthorizedResponse.httpStatus).send(unauthorizedResponse.code);
      
       const clientFilterObj:ClientFilterType = {
         client_code: request.body.client_code,
         secret: request.body.client_secret 
       };
       const jwtToken:JWTResponse = await this._oauthAccessTokenService.generateToken(user,clientFilterObj);
       if(!jwtToken) response.status(unauthorizedResponse.httpStatus).send(unauthorizedResponse.code);

       return response.status(200).send(jwtToken);
    }


}

