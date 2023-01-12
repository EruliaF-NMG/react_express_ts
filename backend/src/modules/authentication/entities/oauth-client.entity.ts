import mongoose from "mongoose";
import { Column } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";

export interface IOauthClient {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    client_code: string;
    secret:  string;
    revoked: Boolean;
    created: Date;
    updated: Date;
}
  
export class OauthClient {
    @Column({
      trim: true,
    })
    name: string;
  
    @Column({
      unique: true,
      trim: true,
    })
    client_code: string;
  
    @Column({
      unique: true,
      trim: true,
    })
    secret: string;

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
    updated: Date;
}
  
export const OauthClientEntity = mongooseWrapper.createModelBySchemaClass<IOauthClient>(OauthClient);