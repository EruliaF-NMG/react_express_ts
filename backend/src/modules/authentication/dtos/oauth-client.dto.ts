import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class OauthClientDTO {

    @DisplayName('client name')
    @Rules('required')
    @InputField()
    public name: string;

    @DisplayName('client code')
    @Rules('required|unique:oauthclients,client_code')
    @InputField()
    public client_code: string;

    @DisplayName('client secret')
    @Rules('required|unique:oauthclients,secret')
    @InputField()
    public secret: string;
}