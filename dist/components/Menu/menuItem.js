import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('river-menuItem', className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
    });
    var handleClick = function (e) {
        e.stopPropagation();
        //让自身状态设为active
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: function (e) {
            handleClick(e);
        } }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
