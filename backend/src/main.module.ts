
import { Module } from "./core";
import AuthModule from "./modules/authentication/auth.module";
import UserModule from "./modules/user-manage/user.module";

@Module({
    modules:[UserModule,AuthModule]
})
export default class MainModule{}