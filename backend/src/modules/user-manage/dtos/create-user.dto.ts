import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class CreateUserDTO {

    @DisplayName('first name')
    @Rules('required')
    @InputField()
    public first_name: string;

    @DisplayName('last name')
    @Rules('required')
    @InputField()
    public last_name: string;

    @DisplayName('email')
    @Rules('required|email|unique:users,email')
    @InputField()
    public email: string;

    @DisplayName('password')
    @Rules('required')
    @InputField()
    public password: string;

    @InputField()
    public roles: Array<string>;

}