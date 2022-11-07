var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Transition from '../Transition/transition';
export var SubMenu = function (props) {
    var index = props.index, className = props.className, title = props.title, children = props.children, disabled = props.disabled;
    var _a = useState(false), menuOpen = _a[0], setOpen = _a[1];
    var _b = useState(false), isActive = _b[0], setActive = _b[1];
    var context = useContext(MenuContext);
    var classes = classNames('submenu-item', 'river-menuItem', className, {
        'is-disabled': disabled,
        'is-active': context.index === index || isActive,
    });
    //icon Classes
    var iconClasses = classNames('arrow-icon', {
        'arrow-icon-active': menuOpen,
    });
    //初始化menuOpen的值
    useEffect(function () {
        if (context.defaultOpenSubMenus && context.defaultOpenSubMenus.indexOf(index) !== -1) {
            setOpen(true);
        }
    }, [context.defaultOpenSubMenus, index]);
    //submenu和menuItem active状态联动
    useEffect(function () {
        var indexArr = React.Children.map(children, function (child, index) {
            var childElement = child;
            return childElement.props.index;
        });
        //如果activeIndex 存在于submenu的子组件中，则激活submenu的active状态
        if ((indexArr === null || indexArr === void 0 ? void 0 : indexArr.indexOf(context.index)) !== -1) {
            setActive(true);
        }
        else {
            setActive(false);
        }
    }, [context.index, children]);
    //判断子组件是否是MenuItem类型
    var renderChildren = function () {
        var classes = classNames('river-submenu', {
            'is-opened': menuOpen,
        });
        var set = new Set();
        var childrenComponent = React.Children.map(children, function (child, index) {
            var childElement = child;
            if (set.has(childElement.props.index)) {
                console.error('the index of the MenuItem or SubMenu should be unique');
                return;
            }
            else {
                set.add(childElement.props.index);
            }
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return childElement;
            }
            else {
                console.error('Warning: subMenu has a child which is not a MenuItem component');
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: classes }, childrenComponent)));
    };
    //subMenu点击事件
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
        if (context.onSelect && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.triggerSubMenuAction === 'click'
        ? {
            onClick: handleClick,
        }
        : {};
    var hoverEvents = context.triggerSubMenuAction === 'hover'
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        }
        : {};
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: faAngleDown, className: iconClasses })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
