import { CoreService } from "../../../core";
import { IRole, RoleEntity } from "../entities/role.entity";
import { IRoleService } from "../interface/role-service.interface";

export class RoleService extends CoreService<IRole> implements IRoleService<IRole> {

    constructor() {
        super(RoleEntity);
    }

}