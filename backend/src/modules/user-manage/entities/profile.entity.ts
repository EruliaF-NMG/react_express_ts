
import { ICoreEntity } from "../../../core";
import { Column } from "../../../core/decorators/db.decorator";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";

export interface IProfile extends ICoreEntity {
  about: string;
  address: string;
  contact: string;
}


export class Profile {

  @Column({
    trim: true,
  })
  about: string;

  @Column({
    trim: true,
  })
  address: string;

  @Column({
    trim: true,
    unique: true,
  })
  contact: string;

  @Column({
    default: Date.now,
  })
  created_at: Date;

  @Column({
    default: Date.now,
  })
  updated_at: Date;
}

export const ProfileSchema = mongooseWrapper.createSchemaByClass<IProfile>(Profile);