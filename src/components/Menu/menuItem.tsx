import React, {useContext} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';
export interface MenuItemProps {
    index: string;
    /**选项是否被禁用 */
    disabled?: boolean;
    /**选项扩展的 className */
    className?: string;
    /**选项的自定义 style */
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = props => {
    const {index, disabled, className, style, children} = props;
    const context = useContext(MenuContext);
    const classes = classNames('river-menuItem', className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
    });

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        //让自身状态设为active
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index);
        }
    };


    return (
        <li
            className={classes}
            style={style}
            onClick={e => {
                handleClick(e);
            }}>
            {children}
        </li>
    );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
