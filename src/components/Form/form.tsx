import React, {createContext, ReactNode, useEffect} from 'react';
import useStore from '../../hooks/useStore';

export interface FromPorps {
    /** 表单名称 */
    name?: string;
    /** 表单元素初始值 */
    initialValue?: Record<string, any>;
    children?: ReactNode;
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> &
    Pick<FromPorps, 'initialValue'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form: React.FC<FromPorps> = props => {
    const {name, children, initialValue} = props;

    const {fields, formState, dispatch, validateField} = useStore();
    const passContext: IFormContext = {
        dispatch,
        fields,
        initialValue,
        validateField
    };
    useEffect(() => {
        console.log(fields);
    }, [fields]);

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
