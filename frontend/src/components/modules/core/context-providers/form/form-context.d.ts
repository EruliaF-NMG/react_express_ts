import {FormContextAction} from "./form-context.action";

export type FromReducerType = [
    FormContextState,
    FormContextAction
]

export type FormActionType = {
    type:string,
    payload: any
}

export interface ContextProviderProps {
    children?: JSX.Element | Array<JSX.Element>;
};

export interface ProviderComposerProps extends ContextProviderProps {
    contexts: Array<JSX.Element>
};

export interface BasicFormObject {
    _backgroundProcess:boolean,
    _uiFormGroup:string,
    _updateStatus:boolean,
    _setByAPI:boolean,
    _errors:Array<any>,
    [key: string]: any
}

export interface FormContextState {
    [key: string]: BasicFormObject
}