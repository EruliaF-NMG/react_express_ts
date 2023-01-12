import React, { Fragment } from "react";
import { ContextProviderProps, ProviderComposerProps } from "../components/modules/core/context-providers/form/form-context";
import { FormContextProvider } from "../components/modules/core/context-providers/form/form-context.provider";



const ProviderComposer=({ contexts,children }:ProviderComposerProps):JSX.Element => {
    return (
        <Fragment>
            {
                contexts.reduceRight(
                    (kids, parent) =>
                    React.cloneElement(parent, {
                        children: kids,
                    }),
                    children
                )
            }
        </Fragment>
    );
}

const ContextProvider=({ children }:ContextProviderProps) => {
    return (
      <ProviderComposer
        contexts={[ 
            <FormContextProvider/>,  
        ]}
      >
        {children}
      </ProviderComposer>
    );
}
  
export default ContextProvider;
