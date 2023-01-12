import { DisplayName, Message, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class PermissionDTO {

    @DisplayName('permission name')
    @Rules('required')
    @Message({
        'required' : 'Name is required'
    })
    @InputField()
    public name: string;

    @DisplayName('permission code')
    @Rules('required')
    @InputField()
    public code: string;
}