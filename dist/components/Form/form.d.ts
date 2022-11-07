import React, { ReactNode } from 'react';
import useStore from '../../hooks/useStore';
import { ValidateError } from 'async-validator';
export interface FromPorps {
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
export declare type IFormRef = Omit<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField' | 'formState'>;
export declare type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FromPorps, 'initialValue'>;
export declare const FormContext: React.Context<IFormContext>;
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Form } from 'river-design'
 * ~~~
 */
export declare const Form: React.ForwardRefExoticComponent<FromPorps & React.RefAttributes<IFormRef>>;
export default Form;
