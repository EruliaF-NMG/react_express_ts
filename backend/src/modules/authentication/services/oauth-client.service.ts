import { CoreService } from "../../../core";
import { IOauthClient, OauthClientEntity } from "../entities/oauth-client.entity";
import { IOauthClientService } from "../interface/oauth-client-service.interface";

export class OauthClientService extends CoreService<IOauthClient> implements IOauthClientService<IOauthClient> {

    constructor() {
        super(OauthClientEntity);
    }

}