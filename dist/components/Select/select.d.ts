import React from 'react';
export interface optionType {
    /** 标签名 */
    label: string;
    /** 标签值 unqiue!*/
    value: any;
    /** 是否禁用 */
    disabled?: boolean;
    [propName: string]: any;
}
export interface SelectProps {
    /** 选择单选或多选模式 */
    mode?: 'Single' | 'Multiple';
    /** 是否支持搜索 */
    Search?: boolean;
    /** select的数据 */
    options?: optionType[];
    /** 默认选中的数据 */
    defaultSelect?: optionType[];
    /** 渲染的option label */
    optionLabelProp?: string;
    /** 类名 */
    className?: string;
    /** 样式 */
    style?: React.CSSProperties;
    /** select框icon */
    icon?: React.ReactElement;
    /**多选情况下是否隐藏选项 */
    multipleHidden?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 选中时触发的回调 */
    onSelect?: (curItem: optionType, allItem: optionType[]) => void;
    /** 下拉框出现或隐藏时的回调 */
    onVisibleChange?: (item: boolean) => void;
    /** 默认提示 */
    placeholder?: string;
}
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'river-design'
 * ~~~
 */
export declare const Select: React.FC<SelectProps>;
export default Select;
