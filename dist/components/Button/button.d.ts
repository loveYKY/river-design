import React from 'react';
export declare type ButtonSize = 'lg' | 'mid' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export interface BaseButtonProps {
    /** 设置类名 */
    className?: string;
    /** 设置是否禁用  */
    disabled?: boolean;
    /** 设置按钮大小 */
    size?: ButtonSize;
    /** 设置按钮类型 */
    btnType?: ButtonType;
    /** link类型下button目标url */
    href?: string;
    /** ReactNode */
    children?: React.ReactNode;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 支持 HTML button 和 a 链接 的所有属性
 * ###引用方法
 * ```js
 * import Button from 'river-design'
 * ```
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
