import {useEffect, useReducer, useState} from 'react';
import Schema, {RuleItem, ValidateError} from 'async-validator';

export type CustomRuleFn = ({getFieldValue}: any) => RuleItem;
export type CustomRule = CustomRuleFn | RuleItem;

export interface FieldDetail {
    name: string;
    value: any;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}

export interface FieldState {
    [key: string]: FieldDetail;
}

export interface FormState {
    isValid: boolean;
}

export interface FieldAction {
    type: 'addField' | 'updateField' | 'updateValidateResult';
    name: string;
    value: any;
}

const fieldReducer = (state: FieldState, action: FieldAction): FieldState => {
    switch (action.type) {
        case 'addField':
            return {
                ...state,
                [action.name]: {...action.value},
            };

        case 'updateField':
            return {
                ...state,
                [action.name]: {...state[action.name], value: action.value},
            };
        case 'updateValidateResult':
            const {isValid, errors} = action.value;
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    isValid,
                    errors,
                },
            };
        default:
            return state;
    }
};

const useStore = () => {
    const [formState, setFormState] = useState<FormState>({isValid: true});

    const [fields, dispatch] = useReducer(fieldReducer, {});

    const getFieldValue = (key: string) => {
        return fields && fields[key].value;
    };
    const validateField = async (name: string) => {
        const {value, rules} = fields[name];

        //完成rule格式的传唤=>RuleItem
        const getRules = (rules: CustomRule[]) => {
            return rules.map(rule => {
                if (typeof rule === 'function') {
                    return rule({getFieldValue});
                } else {
                    return rule;
                }
            });
        };

        //获取转换后的rules
        const newRules = getRules(rules);

        const descriptor = {
            [name]: newRules,
        };
        const valueMap = {
            [name]: value,
        };

        const validator = new Schema(descriptor);
        let isValid = true;
        let errors: ValidateError[] = [];

        try {
            console.log(valueMap);
            await validator.validate(valueMap);
        } catch (e) {
            let err = e as any;
            isValid = false;
            console.log(err.errors);
            console.log(err.fields);
            errors = err.errors;
        } finally {
            console.log('errors', isValid);
            dispatch({
                type: 'updateValidateResult',
                name: name,
                value: {
                    isValid,
                    errors,
                },
            });
        }
    };

    return {
        fields,
        dispatch,
        formState,
        validateField,
    };
};

export default useStore;
