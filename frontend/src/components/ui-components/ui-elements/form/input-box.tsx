import { Input } from "antd";
import React, { ChangeEvent, KeyboardEventHandler, memo } from "react";
import { FormCache, FormValidateStatus } from "../../../../config/ui.config";
import { useBasicInput } from "../../../hooks/core/form-element-state.hook";
import { FormItem, FormItemProps } from "./form-item";

export interface OnChangeType {
    name : string,
    value : any,
    event : ChangeEvent<HTMLInputElement>
}

export interface UIInputProps{
    elementStyle?:string,
    placeholder?:string,
    disabled?:boolean,
    value?:string,
    name:string,
    type?:string,
    onChange?:(event:OnChangeType) => void
    onPressEnter?:KeyboardEventHandler<HTMLInputElement>,
}

export interface InputBoxProps extends UIInputProps,FormItemProps{
    inputBoxStyle?:string,
    label?:string,
    validateStatus?:FormValidateStatus,
    helpText?:string,
    hasFeedback?:boolean,
    hidden?:boolean,
}

export interface InputBoxProps extends UIInputProps,FormItemProps {
    inputBoxStyle?:string,
    cacheData?:FormCache;
    formChangeStatus?:boolean|undefined;
}

export interface InputBoxWithStateType extends InputBoxProps {
    formGroupName:string;
}

export const UIInput = ({
    placeholder,
    elementStyle,
    disabled,
    value,
    name,
    type="text",
    onChange=(...para)=>{},
    onPressEnter,
} : UIInputProps ) => {
    console.log("UIInput",value,name);
    return (
        <Input 
            className={elementStyle}
            placeholder={placeholder} 
            disabled={disabled}
            name={name}
            value={value}
            type={type}
            onChange={(event:ChangeEvent<HTMLInputElement>)=>onChange({
                name : name,
                value : event.target.value,
                event : event
            })}
            onPressEnter={onPressEnter}
        />
    );
}

export const InputBox = ({
    label,
    elementStyle,
    validateStatus,
    helpText,
    placeholder,
    hasFeedback,
    hidden,
    disabled,
    value,
    name,
    type,
    inputBoxStyle,
    onChange,
} : InputBoxProps ) => {
    return (
        <FormItem
            label={label}
            elementStyle={elementStyle}
            validateStatus={validateStatus}
            helpText={helpText}
            hasFeedback={hasFeedback}
            hidden={hidden}
        >
            <UIInput 
                elementStyle={inputBoxStyle}
                placeholder={placeholder} 
                disabled={disabled}
                value={value}
                name={name}
                type={type}
                onChange={onChange}
            />
        </FormItem>
    );
}

/**
 * memo render
 * @param {InputBoxProps} prevProps
 * @param {InputBoxProps} nextProps
 */
const areEqual = (prevProps:InputBoxProps, nextProps:InputBoxProps):boolean => {
    if (nextProps.cacheData === FormCache.FORM) return (
            prevProps.elementStyle     === nextProps.elementStyle &&
            prevProps.inputBoxStyle    === nextProps.inputBoxStyle &&
            prevProps.label            === nextProps.label &&
            prevProps.validateStatus   === nextProps.validateStatus &&
            prevProps.helpText         === nextProps.helpText &&
            prevProps.disabled         === nextProps.disabled &&
            prevProps.hidden           === nextProps.hidden &&
            prevProps.value            === nextProps.value &&
            prevProps.hasFeedback      === nextProps.hasFeedback &&
            prevProps.placeholder      === nextProps.placeholder &&
            prevProps.type             === nextProps.type &&
            prevProps.formChangeStatus === nextProps.formChangeStatus
    );
    else if (nextProps.cacheData === FormCache.ELEMENT) return (
            prevProps.elementStyle     === nextProps.elementStyle &&
            prevProps.inputBoxStyle    === nextProps.inputBoxStyle &&
            prevProps.label            === nextProps.label &&
            prevProps.validateStatus   === nextProps.validateStatus &&
            prevProps.helpText         === nextProps.helpText &&
            prevProps.disabled         === nextProps.disabled &&
            prevProps.hidden           === nextProps.hidden &&
            prevProps.value            === nextProps.value &&
            prevProps.hasFeedback      === nextProps.hasFeedback &&
            prevProps.type             === nextProps.type &&
            prevProps.placeholder      === nextProps.placeholder
    ); 
    else return false; 
  };

export const InputBoxMemo = memo<InputBoxProps>(InputBox, areEqual);

export const InputBoxWithState = (props : InputBoxWithStateType ) => {
    const [userEnteredValue, errorText,formStateChange,handleOnChange] = useBasicInput(props.formGroupName,props.name,props.value,props.onChange);
    return (
        <InputBoxMemo
            {...props}
            value={userEnteredValue}
            helpText={errorText}
            formChangeStatus={formStateChange}
            onChange={handleOnChange}
        />
    );
}

InputBoxWithState.defaultProps = {
    cacheData:FormCache.ELEMENT,
    value:""
};