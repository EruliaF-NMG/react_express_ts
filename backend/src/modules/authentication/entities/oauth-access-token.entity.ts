import mongoose from "mongoose";
import { Column } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { IOauthRefreshToken, oauthRefreshTokenSchema } from "./oauth-refresh-token.entity";

export interface IOauthAccessToken {
    _id: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    client: mongoose.Schema.Types.ObjectId;
    oauth_refresh_token: IOauthRefreshToken;
    revoked: Boolean;
    created: Date;
    updated: Date;
    expires_at: Date;
}
  
export class OauthAccessToken {

    @Column({
        ref: 'User',
        type:mongoose.Schema.Types.ObjectId
    })
    user: mongoose.Schema.Types.ObjectId;

    @Column({
        ref: 'OauthClient',
        type:mongoose.Schema.Types.ObjectId
    })
    client: mongoose.Schema.Types.ObjectId;

    @Column({
      default: false,
    })
    revoked: Boolean;

    @Column({
        type: oauthRefreshTokenSchema,
        default: () => ({}),
    })
    oauth_refresh_token: IOauthRefreshToken;
  
    @Column({
        default: Date.now,
    })
    created: Date;

    @Column({
        default: Date.now,
    })
    updated: Date;
  
    @Column({
      default: Date.now,
    })
    expires_at: Date;
}
  
export const OauthAccessTokenEntity = mongooseWrapper.createModelBySchemaClass<IOauthAccessToken>(OauthAccessToken);
