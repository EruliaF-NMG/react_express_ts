import { ICoreService } from "../../../core/interfaces/core-service.interface";
import { IUser } from "../entities/user.entity";

export interface IUserService<T> extends ICoreService<T> {
    checkUserCredentials(email:string,password:string): Promise<IUser>;
}