import { Context } from "react";
import { createContext, useReducer } from "react";
import { initFormGroupKey, mergeFormObjectKey, removeFormGroupKey, setComplexInputValueChangeKey, setErrorsKey, setInputValueChangeKey } from "../../../../../config/actionKeys.config";
import { getValue } from "../../../../../helpers/common-helpers/lodash.wrappers";

import { ContextProviderProps, FormActionType, FormContextState, FromReducerType } from "./form-context";
import { FormContextAction } from "./form-context.action";


const initialState : FormContextState = {};

const fromReducerStatus: FromReducerType = [ initialState, {} as FormContextAction ];
 
const FormContext:Context<FromReducerType> = createContext(fromReducerStatus);
 
const uiReducer=(state:FormContextState, action:FormActionType)=>{    
     switch (action.type) {
         case initFormGroupKey:
            return {
                 ...state,
                 ...action.payload as FormContextState
            };           
         case removeFormGroupKey:
             delete state[action.payload as string];
             return state; 
         case setInputValueChangeKey:   
             return {
                 ...state,
                 [action.payload.formGroupKey]:{
                     ...state[action.payload.formGroupKey],
                     [action.payload.inputKey]:action.payload.value,
                     _updateStatus: !getValue(state,`${action.payload.formGroupKey}._updateStatus`,false),
                 }
             }; 
        //  case setErrorsKey:
        //      return {
        //          ...state,
        //          [action.payload.formGroupKey]:{
        //              ...state[action.payload.formGroupKey],
        //              _errors:action.payload,
        //              _updateStatus:!getValue(state,`${action.payload.formGroupKey}._updateStatus`,false),
        //          }
        //      };
        //  case setComplexInputValueChangeKey:             
        //      return {
        //          ...state,
        //          [action.formGroupKey]:{
        //              ...getValue(state,action.inputStatePath,action.value)[action.formGroupKey],
        //              _updateStatus:!getValue(state,`${action.formGroupKey}._updateStatus`,false),              
        //          }
        //      };   
        //  case mergeFormObjectKey:   
        //      return {
        //          ...state,
        //          [action.formGroupKey]:{
        //              ...state[action.formGroupKey],
        //              ...action.payload,
        //              _updateStatus:!getValue(state,`${action.formGroupKey}._updateStatus`,false),
                     
        //          }
        //      };   
         default:
             return state;
     }
}
 
 
const FormContextProvider=({children}:ContextProviderProps)=>{
    const [state,dispatch] = useReducer(uiReducer,initialState);
    const dispatcher       = new FormContextAction(dispatch);
    return(
        <FormContext.Provider value = {[state,dispatcher]}>
             {children}
        </FormContext.Provider>
    )
}
 
export {
    FormContext,
    FormContextProvider
}