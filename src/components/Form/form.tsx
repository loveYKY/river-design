import React, {createContext, ReactNode, useEffect} from 'react';
import useStore from '../../hooks/useStore';

export interface FromPorps {
    name?: string;
    children?: ReactNode;
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form: React.FC<FromPorps> = props => {
    const {name, children} = props;

    const {fields, formState, dispatch} = useStore();
    const passContext: IFormContext = {
        dispatch,
        fields,
    };
    useEffect(()=>{
        console.log(fields)
    },[fields])

    return (
        <form name={name} className="river-form">
            <FormContext.Provider value={passContext}>{children}</FormContext.Provider>
        </form>
    );
};

Form.defaultProps = {
    name: 'river-form',
};

export default Form;
