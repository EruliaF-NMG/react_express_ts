import { Module } from "../../core";
import AuthController from "./controllers/auth.controller";
import OauthClientController from "./controllers/oauth-client.controller";
import { OauthAccessTokenService } from "./services/oauth-access-token.service";
import { OauthClientService } from "./services/oauth-client.service";

@Module({
    controllers:[OauthClientController,AuthController],
    services:[
       { provide: 'IOauthAccessTokenService', useClass: OauthAccessTokenService  },
       { provide: 'IOauthClientService', useClass: OauthClientService  },
    ]
})
export default class AuthModule{}