
import { useCallback, useContext, useMemo } from "react";
import { getValue, getValueByFilter } from "../../../helpers/common-helpers/lodash.wrappers";
import { FormContext } from "../../modules/core/context-providers/form/form-context.provider";
import { OnChangeType } from "../../ui-components/ui-elements/form/input-box";



export const useBasicInput=(
    formGroupName:string="",
    name:string="",
    value:any,
    onChange:(event:OnChangeType) => void = (...para)=>{},
):[string,string,boolean|undefined,(event:OnChangeType) => void] => {

    const [formState, formAction] = useContext(FormContext);

    const userEnteredValue:string = useMemo(() => {
        return getValue(formState,`${formGroupName}.${name}`,value);       
    }, [formGroupName,name,value,formState]);

    const errorText:string = useMemo(() => {
        return getValueByFilter(
          getValue(formState, `${formGroupName}._errors`, []),
          ['property', name],
          'message',
          '',
          ''
        );
    }, [formGroupName, name, formState]);

    const formStateChange: boolean|undefined = useMemo(() => {
        return getValue(formState, `${formGroupName}._updateStatus`, undefined);
    }, [formGroupName, formState]);

    const handleOnChange:(event:OnChangeType) => void = useCallback(
        (eventData:OnChangeType) => {
          formAction.changeInputValue(formGroupName,name,eventData.value);
          onChange(eventData);
        },
        [formGroupName, name, formAction, onChange]
    );

    return [
        userEnteredValue,
        errorText,
        formStateChange,
        handleOnChange,
    ];
}