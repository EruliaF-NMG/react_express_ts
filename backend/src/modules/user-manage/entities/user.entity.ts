import mongoose from "mongoose";
import { UserStatus } from "../../../config/core.enum";
import { ICoreEntity } from "../../../core";
import { Column } from "../../../core/decorators/db.decorator";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { IProfile, ProfileSchema } from "./profile.entity";


export interface IUser extends ICoreEntity {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  status: Boolean;
  profile: IProfile;
  roles: Array<mongoose.Schema.Types.ObjectId>
}

export class User {
  @Column({
    trim: true,
  })
  first_name: string;

  @Column({
    trim: true,
  })
  last_name: string;

  @Column({
    trim: true,
    unique: true,
  })
  email: string;

  @Column({
    trim: true,
  })
  password: string;

  @Column({
    default: UserStatus.UNBLOCKED
  })
  status: Boolean;

  @Column({
    type: ProfileSchema,
    default: () => ({})
  })
  profile: IProfile;

  @Column([{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }])
  roles: Array<mongoose.Schema.Types.ObjectId>;

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


export const UserEntity  = mongooseWrapper.createModelBySchemaClass<IUser>(User);