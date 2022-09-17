import React from 'react';
import classNames from 'classnames';
export type ButtonSize = 'lg' | 'mid' | 'sm';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

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

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 支持 HTML button 和 a 链接 的所有属性
 * ###引用方法
 * ```js
 * import Button from 'river-design'
 * ```
 */

export const Button: React.FC<ButtonProps> = props => {
    const {className, disabled, size, btnType, href, children, ...restProps} = props;

    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        disabled: btnType === 'link' && disabled,
    });

    if (btnType === 'link') {
        return (
            <a href={href} className={classes} {...restProps}>
                {children}
            </a>
        );
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>
                {children}
            </button>
        );
    }
};

Button.defaultProps = {
    disabled: false,
    btnType: 'default',
    size: 'mid',
};

export default Button;
