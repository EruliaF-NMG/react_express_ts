import { ICoreService } from "../../../core/interfaces/core-service.interface";
import { IUser } from "../../user-manage/entities/user.entity";
import { ClientFilterType, JWTResponse } from "../auth.types";
import { IOauthAccessToken } from "../entities/oauth-access-token.entity";
import { IOauthClient } from "../entities/oauth-client.entity";

export interface IOauthAccessTokenService<T> extends ICoreService<T> {
    generateToken(userObj:IUser,clientFilterObj:ClientFilterType): Promise<JWTResponse>;
    createAccessTokenANDRefreshToken(userObj:IUser, clientObj: IOauthClient): Promise<IOauthAccessToken>;
}