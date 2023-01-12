import mongoose from "mongoose";
import { Column, ICoreEntity } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";


export interface IPermission extends ICoreEntity {
  name: string;
  code: string;
  avatar?: string;
}

export class Permission {
  @Column({
    trim: true,
  })
  name: string;

  @Column({
    trim: true,
  })
  code: string;

  @Column({
    default: Date.now,
  })
  created_at: Date;

  @Column({
    type: mongoose.Schema.Types.ObjectId,
  })
  created_by: mongoose.Schema.Types.ObjectId;

  @Column({
    type: mongoose.Schema.Types.ObjectId,
  })
  updated_by: mongoose.Schema.Types.ObjectId;

  @Column({
    default: Date.now,
  })
  updated_at: Date;
}

export const PermissionEntity = mongooseWrapper.createModelBySchemaClass<IPermission>(Permission);
