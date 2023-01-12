import mongoose from "mongoose";
import { ICoreEntity } from "../../../core";
import { Column } from "../../../core/decorators/db.decorator";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";


export interface IRole extends ICoreEntity {
  name: string;
  code: string;
  permissions:  Array<mongoose.Schema.Types.ObjectId>;
}

export class Role {
  @Column({
    trim: true,
  })
  name: string;

  @Column({
    trim: true,
  })
  code: string;

  @Column([{
    type: mongoose.Schema.Types.ObjectId,
    ref:  'Permission'
  }])
  permissions: Array<mongoose.Schema.Types.ObjectId>;

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

export const RoleEntity = mongooseWrapper.createModelBySchemaClass<IRole>(Role);