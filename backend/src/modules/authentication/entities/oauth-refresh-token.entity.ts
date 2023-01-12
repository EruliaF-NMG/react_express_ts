import mongoose from "mongoose";
import { Column } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";

export interface IOauthRefreshToken {
    _id: mongoose.Schema.Types.ObjectId;
    revoked: Boolean;
    created: Date;
    expires_at: Date;
}
  
export class OauthRefreshToken {
    @Column({
      default: false,
    })
    revoked: Boolean;
  
    @Column({
        default: Date.now,
    })
    created: Date;
  
    @Column({
      default: Date.now,
    })
    expires_at: Date;
}
  
export const oauthRefreshTokenSchema = mongooseWrapper.createSchemaByClass<IOauthRefreshToken>(OauthRefreshToken);
