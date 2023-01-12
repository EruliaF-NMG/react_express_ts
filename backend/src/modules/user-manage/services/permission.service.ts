import { CoreService } from "../../../core";
import { IPermission, PermissionEntity } from "../entities/permission.entity";
import { IPermissionService } from "../interface/permission-service.interface";


export class PermissionService extends CoreService<IPermission> implements IPermissionService<IPermission> {

    constructor() {
        super(PermissionEntity);
    }

}