import { FilterQuery, HydratedDocument, QueryOptions, UpdateQuery } from "mongoose";

export interface ICoreService<T> {

    create(createObject:T|any): Promise<HydratedDocument<T>>;
    update(filterOption:FilterQuery<T>, updateData:UpdateQuery<T>,options?: QueryOptions<T>|null): Promise<HydratedDocument<T>>;
    findByID(id:string): Promise<HydratedDocument<T>>;
    find(filterOption?:FilterQuery<T>): Promise<Array<HydratedDocument<T>>>;
    findOne(filterOption?:FilterQuery<T>): Promise<HydratedDocument<T>>
}