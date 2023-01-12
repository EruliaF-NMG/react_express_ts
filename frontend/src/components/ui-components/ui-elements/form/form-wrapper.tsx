import { Form } from "antd"
import { ReactNode, useContext, useEffect } from "react"
import { FormLayout } from "../../../../config/ui.config"
import { FormContext } from "../../../modules/core/context-providers/form/form-context.provider"

export type FormWrapperProps<T> = {
    elementStyle?:string,
    formGroupKey:string,
    layout?:FormLayout
    formObject?:T,
    isBackProcess?:boolean,
    apiUrl?:string,
    onDestroyUnsetFromObject?:boolean,
    children?:ReactNode
}

export const FormWrapper  = <T extends {}> ({
    layout,
    elementStyle,
    formObject={} as T,
    formGroupKey,
    isBackProcess=false,
    apiUrl,
    onDestroyUnsetFromObject=true,
    children,
} : FormWrapperProps<T> ) => {
    const [formState, formAction] = useContext(FormContext);

    useEffect(() => {
        formAction
            .initFromObject<T>(formGroupKey,formObject)
            .isBackgroundProcess(isBackProcess)
            .setByAPI(apiUrl ? true : false)
            .generate();

        return () => {
            if (onDestroyUnsetFromObject) {
                formAction.removeFromGroup(formGroupKey);
            }
        };
   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    console.log("FormWrapper", window.performance.now());

    return (
        <Form layout={layout} className={elementStyle}>
            {children}
        </Form>
    );
}