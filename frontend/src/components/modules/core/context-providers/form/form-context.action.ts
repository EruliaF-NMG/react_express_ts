import { Dispatch } from "react";
import { initFormGroupKey, removeFormGroupKey, setErrorsKey, setInputValueChangeKey } from "../../../../../config/actionKeys.config";
import { BasicFormObject, FormActionType } from "./form-context";


export class FormContextAction {

    private _dispatch:Dispatch<FormActionType>;

    constructor(dispatch : Dispatch<FormActionType>){
        this._dispatch=dispatch;
    }

    /**
     * @description init from group
     * @param {Dispatch<FormContextAction>} dispatch
     * @param {any} payload 
     */
    initFormState=<T>(payload:T)=>{
        this._dispatch({
            type:initFormGroupKey,
            payload
        });
    };

    /**
     * @description generate form group object
     * @param {Dispatch<FormContextAction>} dispatch 
     * @param {string} formGroupKey 
     */
    initFromObject=<T>(formGroupKey:string,initialObject:T={} as T) => {

        let attributes: BasicFormObject = {
            _backgroundProcess:false,
            _uiFormGroup:formGroupKey,
            _updateStatus:false,
            _setByAPI:false,
            _errors:[],
            ...initialObject,
        };

        const builders = {
        isBackgroundProcess:(status:boolean=false)=> {
            attributes = {
                ...attributes,
                _backgroundProcess: status
            };
            return builders;
        },
        setByAPI:(isLoad:boolean=false) =>{
            attributes = {
                ...attributes,
                _setByAPI: isLoad
            };
            return builders;
        },
        generate: () => {
            return this.initFormState({
                [formGroupKey]:attributes
            });
        },
        };
  
        return builders;
    }

    /**
     * @description remove form group
     * @param {*} dispatch 
     * @param {*} formGroupKey 
     */
    removeFromGroup=(formGroupKey:string)=>{
        this._dispatch({
            type:removeFormGroupKey,
            payload:formGroupKey
        });
    }

    /**
     * @description set form input change
     * @param {String} formGroupKey 
     * @param {String} inputKey 
     * @param {String} value 
     */
    changeInputValue=(formGroupKey:string,inputKey:string,value:string)=>{
        this._dispatch({
            type:setInputValueChangeKey,
            payload:{
                formGroupKey,
                inputKey,
                value
            }
        });
    }
}