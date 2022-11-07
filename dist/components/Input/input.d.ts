import React, { InputHTMLAttributes } from 'react';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 默认展示 */
    placeholder?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 设置input框大小 */
    size?: 'lg' | 'sm' | 'normal';
    /** 添加图标，在右侧悬浮添加一个图标，类型可自定义ReactElement */
    icon?: React.ReactElement;
    /** 添加前缀 用于配置一些固定组合 */
    prepend?: string | React.ReactElement;
    /** 添加后缀 用于配置一些固定组合 */
    append?: string | React.ReactElement;
    /** 输入框内容改变时的回调函数 */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** 设置类名 */
    className?: string;
    /** 设置样式 */
    style?: React.CSSProperties;
}
/**
 * 支持 HTML Input的所有属性
 * ###引用方法
 * ```js
 * import Input from 'river-design'
 * ```
 */
export declare const Input: React.FC<InputProps>;
export default Input;
