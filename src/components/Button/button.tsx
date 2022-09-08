import React from 'react';
import classNames from 'classnames';
export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    href?: string;
    children?: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = props => {
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
};

export default Button;
