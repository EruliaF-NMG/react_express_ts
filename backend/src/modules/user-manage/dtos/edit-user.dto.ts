import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class EditUserDTO {

    @DisplayName('first name')
    @Rules('required')
    @InputField()
    public first_name: string;

    @DisplayName('last name')
    @Rules('required')
    @InputField()
    public last_name: string;

    @Rules('max:500')
    @InputField()
    public about: string;

    @Rules('max:255')
    @InputField()
    public address: string;

    @Rules('max:10')
    @InputField()
    public contact: string;

}