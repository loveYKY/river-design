import {useEffect, useReducer, useState} from 'react';
import Schema, {RuleItem, ValidateError} from 'async-validator';
import {mapValues, each, clone, cloneDeep} from 'lodash';
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
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>;
}

export interface FieldAction {
    type: 'addField' | 'updateField' | 'updateValidateResult';
    name: string;
    value: any;
}

export interface validateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
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

const useStore = (initialValue: Record<string, any> | undefined) => {
    const [formState, setFormState] = useState<FormState>({isValid: true, isSubmitting: false, errors: {}});

    const [fields, dispatch] = useReducer(fieldReducer, {});

    const getFieldValue = (key: string) => {
        return fields && fields[key].value;
    };

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
    const validateField = async (name: string) => {
        const {value, rules} = fields[name];

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
            let err = e as validateErrorType;
            isValid = false;
            errors = err.errors;
        } finally {
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

    //全部验证
    const validate = async (nameList: string[]) => {
        let isValid = true;
        let errors: Record<string, ValidateError[]> = {};
        let fieldData: FieldState = {};
        if (nameList && nameList.length !== 0) {
            for (let i = 0; i < nameList.length; i++) {
                fieldData[nameList[i]] = fields[nameList[i]];
            }
        } else {
            fieldData = cloneDeep(fields);
        }
        //需要验证的值
        const valueMap = mapValues(fieldData, item => item.value);
        //验证描述器
        const descriptor = mapValues(fieldData, item => getRules(item.rules));
        //构造验证器
        const validator = new Schema(descriptor);
        //开启验证
        setFormState({...formState, isSubmitting: true});

        try {
            //等待验证
            await validator.validate(valueMap);
        } catch (e) {
            //获得验证的错误
            let err = e as validateErrorType;
            isValid = false;
            errors = err.fields;
            each(fieldData, (value, name) => {
                if (errors[name]) {
                    const itemError = errors[name];
                    dispatch({
                        type: 'updateValidateResult',
                        name: name,
                        value: {
                            isValid,
                            errors: itemError,
                        },
                    });
                } else if (value.rules.length > 0 && !errors[name]) {
                    dispatch({
                        type: 'updateValidateResult',
                        name: name,
                        value: {
                            isValid: true,
                            errors: [],
                        },
                    });
                }
            });
        } finally {
            setFormState({...formState, isSubmitting: false, isValid, errors});

            return {
                isValid,
                errors,
                values: valueMap,
            };
        }
    };

    const getFieldsValue = () => {
        return mapValues(fields, item => item.value);
    };
    const setFieldsValue = (name: string, value: any) => {
        if (fields[name]) {
            dispatch({
                type: 'updateField',
                name,
                value,
            });
        }
    };

    const resetFields = () => {
        if (initialValue) {
            each(initialValue, (value, name) => {
                if (fields[name]) {
                    dispatch({
                        type: 'updateField',
                        name,
                        value,
                    });
                }
            });
        }
    };

    const clearValidate = (nameList: string[]) => {
        let fieldData: FieldState = {};
        if (nameList && nameList.length !== 0) {
            for (let i = 0; i < nameList.length; i++) {
                fieldData[nameList[i]] = fields[nameList[i]];
            }
        } else {
            fieldData = cloneDeep(fields);
        }

        each(fieldData, (item, name) => {
            if (fields[name]) {
                console.log(item);
                dispatch({
                    type: 'updateValidateResult',
                    name,
                    value: {
                        isValid: true,
                        errors: [],
                    },
                });
            }
        });
    };

    return {
        fields,
        dispatch,
        formState,
        validateField,
        validate,
        resetFields,
        getFieldsValue,
        setFieldsValue,
        clearValidate,
    };
};

export default useStore;
