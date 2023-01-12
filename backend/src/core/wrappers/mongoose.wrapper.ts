import mongoose, { Model } from "mongoose";
import { Class } from "../types/type.interface";

class MongooseWrapper {

    public createSchema<T>(schema:any):mongoose.Schema<T> {
        return new mongoose.Schema<T>(schema);
    }

    public createModel<T>(schema:any,className:string):Model<T> {
        return mongoose.model(className, schema);
    }

    public createModelBySchemaClass<T>(schemaClass:Class):Model<T> {
       const object =  new schemaClass();
       return this.createModel<T>(this.createSchema<T>(object.injections),schemaClass.name);
    }

    public getObjectID(id:string):mongoose.Types.ObjectId {
       return new mongoose.Types.ObjectId(id);
    }

    public createSchemaByClass<T>(schemaClass:Class):mongoose.Schema<T> {
        const object =  new schemaClass();
        return this.createSchema<T>(object.injections)
    }

}

export default new MongooseWrapper();