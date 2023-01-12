import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class RoleDTO {

    @DisplayName('role name')
    @Rules('required')
    @InputField()
    public name: string;

    @DisplayName('role code')
    @Rules('required')
    @InputField()
    public code: string;

    @DisplayName('permission list')
    @InputField()
    public permissions: Array<string>;
}