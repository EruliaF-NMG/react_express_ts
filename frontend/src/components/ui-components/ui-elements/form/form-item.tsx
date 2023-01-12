import { Form } from "antd"
import { FormValidateStatus } from "../../../../config/ui.config"

export interface FormItemProps {
    elementStyle?:string,
    label?:string,
    validateStatus?:FormValidateStatus
    helpText?:string,
    hasFeedback?:boolean,
    hidden?:boolean,
    children?:React.ReactNode
}

export const FormItem = ({
    label,
    elementStyle,
    validateStatus,
    helpText,
    children,
    hasFeedback,
    hidden
} : FormItemProps ) => {
    return (
        <Form.Item 
            label={label} 
            className={elementStyle}
            validateStatus={validateStatus} 
            help={helpText}
            hasFeedback={hasFeedback}
            hidden={hidden}
        >
            {children}
        </Form.Item>
    );
}