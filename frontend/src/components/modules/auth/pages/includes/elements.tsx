import { FormLayout } from "../../../../../config/ui.config";
import { UICard } from "../../../../ui-components/ui-elements/common/base-elements";
import { FormWrapper } from "../../../../ui-components/ui-elements/form/form-wrapper";
import { InputBoxWithState } from "../../../../ui-components/ui-elements/form/input-box";

interface LoginType {
    email:    string,
    password: string,
}

interface RegisterType extends LoginType {
    first_name: string,
    last_name:  string,
}

const initializeLogin: LoginType = {
    email:    "",
    password: ""
}

const initializeRegister: RegisterType = {
    ...initializeLogin,
    first_name: "",
    last_name:  ""
}

const loginFormKey:string="login_form";
const registerFormKey:string="register_form";

export const LoginElement=()=>{
    return (
        <UICard title="Login Here..." elementStyle="flex flex-col w-2/5 mr-3.5">
            <FormWrapper formGroupKey={loginFormKey} layout={FormLayout.VERTICAL} formObject={initializeLogin}>
                <InputBoxWithState
                    label="E-mail"
                    placeholder="Enter E-mail"
                    name="email"
                    formGroupName={loginFormKey}
                />
                <InputBoxWithState
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    formGroupName={loginFormKey}
                />
            </FormWrapper>
        </UICard>
    );
}

export const RegisterElement=()=>{
    return (
        <UICard title="Register Here..." elementStyle="flex flex-col w-2/5 ml-3.5">
            <FormWrapper formGroupKey={registerFormKey} layout={FormLayout.VERTICAL} formObject={initializeRegister}>
                <InputBoxWithState
                    label="First Name"
                    placeholder="Enter First Name"
                    name="first_name"
                    formGroupName={registerFormKey}
                />
                 <InputBoxWithState
                    label="Last Name"
                    placeholder="Enter Last Name"
                    name="last_name"
                    formGroupName={registerFormKey}
                />
                <InputBoxWithState
                    label="E-mail"
                    placeholder="Enter E-mail"
                    name="email"
                    formGroupName={registerFormKey}
                />
                <InputBoxWithState
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    formGroupName={registerFormKey}
                />
            </FormWrapper>
        </UICard>
    );
}