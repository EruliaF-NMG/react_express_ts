import { sign } from 'jsonwebtoken';

import { refreshTokenLife, salt, tokenLife } from "../../../config/app.config";
import { CoreService, Inject } from "../../../core";
import { changeDate } from "../../../helpers/time-unit-converter";
import { IRole } from "../../user-manage/entities/role.entity";
import { IUser } from "../../user-manage/entities/user.entity";
import { ClientFilterType, JWTResponse } from "../auth.types";
import { IOauthAccessToken, OauthAccessTokenEntity } from "../entities/oauth-access-token.entity";
import { IOauthClient } from "../entities/oauth-client.entity";
import { IOauthAccessTokenService } from "../interface/oauth-access-token-service.interface";
import { IOauthClientService } from "../interface/oauth-client-service.interface";

export class OauthAccessTokenService extends CoreService<IOauthAccessToken> implements IOauthAccessTokenService<IOauthAccessToken> {

    constructor(@Inject("IOauthClientService") private _oauthClientService: IOauthClientService<IOauthClient>) {
        super(OauthAccessTokenEntity);
    }

    /**
     * Verifying user authentication and generate access token
     * @param userObj 
     * @param clientFilterObj 
     */
   async generateToken(userObj:IUser,clientFilterObj:ClientFilterType): Promise<JWTResponse> {
        try {
            const clientObj: IOauthClient = await this._oauthClientService.findOne(clientFilterObj);
            if( !clientObj ) return null;
           
            const accessToken:IOauthAccessToken = await this.createAccessTokenANDRefreshToken(userObj,clientObj);
            if( !accessToken ) return null;
            
            const roleList:Array<string> = userObj.roles.map((role:any) => role.code);
            const authPermissions:Array<string> = [];
            userObj.roles.map((role:any) =>
                role.permissions.map((permission:any) => {
                    if (authPermissions.indexOf(permission.code) === -1) authPermissions.push(permission.code);
                })
            );

            const response:JWTResponse = {
                access_token: sign(
                  {
                    token: accessToken._id,
                    userID: userObj._id,
                    name: `${userObj.first_name} ${userObj.last_name}`,
                    permissions: authPermissions,
                    roles: roleList,
                  },
                  salt,
                  { expiresIn: tokenLife }
                ),
                refresh_token: sign(
                  {
                    token: accessToken.oauth_refresh_token._id,
                  },
                  salt,
                  { expiresIn: refreshTokenLife }
                ),
                token_type: 'Bearer',
                expiresIn: tokenLife,
              };

              return response;

        }catch(ex){
            return null;
        }
   } 

   async createAccessTokenANDRefreshToken(userObj:IUser, clientObj: IOauthClient): Promise<IOauthAccessToken> {
        try {
            
            const obj = {
                user: userObj._id,
                client: clientObj._id,
                revoked: false,
                updated: new Date(),
                created: new Date(),
                expires_at: changeDate(new Date())
                .setSeconds(tokenLife)
                .getDate(),
                oauth_refresh_token: {
                revoked: false,
                created: new Date(),
                expires_at: changeDate(new Date())
                    .setSeconds(refreshTokenLife)
                    .getDate(),
                },
            };
            return await this.create(obj);

        } catch(ex) { 
            return null;
        } 
   }
}