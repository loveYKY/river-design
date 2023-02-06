import React, {createContext, FormHTMLAttributes, ReactNode, useEffect, useImperativeHandle, useState} from 'react';
import useStore from '../../hooks/useStore';
import {ValidateError} from 'async-validator';
export interface FormProps {
    /** 表单名称 */
    name?: string;
    /** 表单元素初始值 */
    initialValue?: Record<string, any>;
    /** 表单提交成功的回调 */
    onFinished?: (values: Record<string, any>) => void;
    /** 表单提交失败的回调 */
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
    /** 组件实例方法，表单验证函数 */
    validate?: (nameList: string[]) => any;
    /** 组件实例方法，还原初始fields */
    resetFields?: () => void;
    /** 组件实例方法，获得fields对象 */
    getFieldsValue?: () => any;
    /** 组件实例方法，设置fields对象 */
    setFieldsValue?: (name: string) => void;
    /** 组件实例方法，清除表单验证结果 */
    clearValidate?: (nameList: string[]) => void;
    children?: ReactNode;
}

export type IFormRef = Omit<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField' | 'formState'>;

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> &
    Pick<FormProps, 'initialValue'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Form } from 'river-design'
 * ~~~
 */
export const Form = React.forwardRef<IFormRef, FormProps>((props, ref) => {
    const {name, children, initialValue, onFinished, onFinishFailed} = props;

    const {fields, formState, dispatch, validateField, validate, ...restProps} = useStore(initialValue);

    //将方法挂载到自定义组件实例
    useImperativeHandle(ref, () => ({
        validate,
        ...restProps,
    }));

    const passContext: IFormContext = {
        dispatch,
        fields,
        initialValue,
        validateField,
    };

    useEffect(() => {
        console.log(fields);
    }, [fields]);

    //提交表单事件
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const {values, errors, isValid} = await validate([]);

        //校验成功
        if (isValid) {
            if (onFinished) {
                onFinished(values);
            }
        } else {
            if (onFinishFailed) {
                onFinishFailed(values, errors);
            }
        }
    };

    return (
        <form name={name} className="river-form" onSubmit={handleSubmit}>
            <FormContext.Provider value={passContext}>{children}</FormContext.Provider>
        </form>
    );
});

Form.defaultProps = {
    name: 'river-form',
};

export default Form;
