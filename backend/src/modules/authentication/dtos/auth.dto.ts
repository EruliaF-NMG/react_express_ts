import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class AuthDTO {

    @DisplayName('e-mail')
    @Rules('required|email')
    @InputField()
    public email: string;

    @DisplayName('password')
    @Rules('required')
    @InputField()
    public password: string;

    @DisplayName('client code')
    @Rules('required')
    @InputField()
    public client_code: string;

    @DisplayName('client secret')
    @Rules('required')
    @InputField()
    public client_secret: string;
}