import React, {InputHTMLAttributes, useState, useEffect} from 'react';
import classNames from 'classnames';

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
export const Input: React.FC<InputProps> = props => {
    const {disabled, size, icon, prepend, append, className, style, ...restProps} = props;

    const [isInGroup, setGroup] = useState(false);

    useEffect(() => {
        if (append !== undefined || prepend !== undefined) {
            setGroup(true);
        } else {
            setGroup(false);
        }
    }, [append, prepend]);

    const classes = classNames('river-input-wrapper', className, {
        'is-disabled': disabled,
        [`input-size-${size}`]: size,
        'input-group': isInGroup,
        'input-group-prepend': prepend,
        'input-group-append': append,
    });

    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }

    return (
        <div className={classes} style={style}>
            {prepend ? <div className="river-input-group-prepend">{prepend}</div> : null}
            {icon ? <div className="icon-wrapper">{icon}</div> : null}
            <input className="river-input-inner" disabled={disabled} {...restProps}></input>
            {append ? <div className="river-input-group-append">{append}</div> : null}
        </div>
    );
};

export default Input;
