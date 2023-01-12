import { CoreService } from "../../../core";
import { comparePassword } from "../../../helpers/bcrypt-helpers";
import { RoleEntity } from "../entities/role.entity";
import { IUser, UserEntity } from "../entities/user.entity";
import { IUserService } from "../interface/user-service.interface";

export class UserService extends CoreService<IUser> implements IUserService<IUser> {

    constructor() {
        super(UserEntity);
    }

    /**
     * Check user credentials
     * @param email 
     * @param password 
     * @returns IUser|Null
     */
    async checkUserCredentials(email:string,password:string): Promise<IUser> {
    
       try {
            const user : IUser = await this.model.findOne({email}).populate([
                {
                path: 'roles',
                model: 'Role',
                select: '_id name code permissions',
                populate: [
                    {
                    path: 'permissions',
                    model: 'Permission',
                    select: '_id name code',
                    },
                ],
                },
            ]).exec();


            if ( user && comparePassword(password,user.password) === true) return user;
            return null;

       } catch(ex) {
            return null;
       }
    }
}