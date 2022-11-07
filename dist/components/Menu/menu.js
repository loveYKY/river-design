import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
export var MenuContext = React.createContext({ index: '0' });
//Menu组件
/**
 * 支持水平、垂直模式的Menu菜单
 * ###引用方法
 * ```js
 * import Menu from 'river-design'
 * ```
 *
 */
export var Menu = function (props) {
    var selectedIndex = props.selectedIndex, className = props.className, mode = props.mode, style = props.style, onSelect = props.onSelect, triggerSubMenuAction = props.triggerSubMenuAction, children = props.children, defaultOpenSubMenus = props.defaultOpenSubMenus;
    //添加控制选中状态的state
    var _a = useState(selectedIndex), activeIndex = _a[0], setActive = _a[1];
    useEffect(function () {
        setActive(selectedIndex);
    }, [selectedIndex]);
    //添加class
    var classes = classNames('river-menu', className, {
        'is-vertical': mode === 'vertical',
        'is-horizontal': mode === 'horizontal',
    });
    //判断子组件是否是MenuItem类型
    var renderChildren = function () {
        //利用集合判断MenuItem组件index是否重复
        var set = new Set();
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            if (set.has(childElement.props.index)) {
                console.error('the index of the MenuItem or SubMenu should be unique');
                return;
            }
            else {
                set.add(childElement.props.index);
            }
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return childElement;
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passValue = {
        index: activeIndex ? activeIndex : '0',
        onSelect: handleClick,
        mode: mode,
        triggerSubMenuAction: triggerSubMenuAction,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    return (React.createElement(MenuContext.Provider, { value: passValue },
        React.createElement("ul", { className: classes, style: style }, renderChildren())));
};
Menu.defaultProps = {
    mode: 'horizontal',
    selectedIndex: '0',
    triggerSubMenuAction: 'click',
};
export default Menu;
