
import { Module } from "../../core";
import PermissionController from "./controllers/permission.controller";
import RoleController from "./controllers/role.controller";
import UserController from "./controllers/user.controller";
import { PermissionService } from "./services/permission.service";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";

@Module({
    controllers:[PermissionController,RoleController,UserController],
    services:[
        { provide: 'IPermissionService', useClass: PermissionService },
        { provide: 'IRoleService', useClass: RoleService },
        { provide: 'IUserService', useClass: UserService }
    ]
})
export default class UserModule{}