/// <reference types="react" />
import { RuleItem, ValidateError } from 'async-validator';
export declare type CustomRuleFn = ({ getFieldValue }: any) => RuleItem;
export declare type CustomRule = CustomRuleFn | RuleItem;
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
declare const useStore: (initialValue: Record<string, any> | undefined) => {
    fields: FieldState;
    dispatch: import("react").Dispatch<FieldAction>;
    formState: FormState;
    validateField: (name: string) => Promise<void>;
    validate: (nameList: string[]) => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            [x: string]: any;
        };
    }>;
    resetFields: () => void;
    getFieldsValue: () => {
        [x: string]: any;
    };
    setFieldsValue: (name: string, value: any) => void;
    clearValidate: (nameList: string[]) => void;
};
export default useStore;
