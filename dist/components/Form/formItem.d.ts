import React, { ReactNode } from 'react';
import { CustomRule } from '../../hooks/useStore';
export interface FormItemProps {
    /** formItem 唯一的key */
    name: string;
    /** label */
    label?: string;
    /** 校验规则 */
    rules?: CustomRule[];
    /** 校验触发方式 */
    validateTrigger?: string;
    /** label位置 */
    labelPosition?: 'left' | 'center' | 'right';
    /** value的属性名称 */
    valuePropName?: string;
    /** 更新值的回调属性名称 */
    trigger?: string;
    /** 怎么样从事件对象(e)里面获取真正的值 */
    getValueFromEvent?: (...args: any) => any;
    children?: ReactNode;
}
export declare const FormItem: React.FC<FormItemProps>;
export default FormItem;
