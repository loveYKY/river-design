import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
/**
 * 支持line、card模式的Tabs菜单
 * ###引用方法
 * ```js
 * import Tabs from 'river-design'
 * ```
 *
 */
export var Tabs = function (props) {
    var activeKey = props.activeKey, className = props.className, onChange = props.onChange, onSelect = props.onSelect, type = props.type, children = props.children;
    var classes = classNames('river-tabs', className);
    //根据type给Tab绑定样式
    var navClass = classNames('river-tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
    });
    var _a = useState(activeKey), activeIndex = _a[0], setActive = _a[1];
    //activeKey变化引起activeIndex变化
    useEffect(function () {
        setActive(activeKey);
    }, [activeKey]);
    //activeKey变化时候触发onChange回调
    useEffect(function () {
        if (onChange && activeIndex) {
            onChange(activeIndex);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);
    //点击tab触发onSelect事件
    var handleClick = function (index, disable) {
        if (!disable) {
            setActive(index);
        }
        if (onSelect && !disable) {
            onSelect(index);
        }
    };
    //渲染tabNavList
    var renderNavLinks = function () {
        var set = new Set();
        return React.Children.map(children, function (child) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            if (set.has(childElement.props.index)) {
                console.error('the index of tabItem should not be repeat');
                return null;
            }
            else {
                set.add(childElement.props.index);
            }
            var classes = classNames('river-tabs-nav-item', {
                'is-active': activeIndex === childElement.props.index,
                disabled: disabled,
            });
            var displayName = childElement.type.displayName;
            if (displayName === 'TabItem') {
                return (React.createElement("li", { className: classes, onClick: function () {
                        handleClick(childElement.props.index, disabled);
                    } }, label));
            }
            else {
                console.error('Warning: Tabs has a child which is not a TabItem component');
                return;
            }
        });
    };
    //渲染Tab展示面板
    var renderTabPane = function () {
        var set = new Set();
        return React.Children.map(children, function (child) {
            var childElement = child;
            if (set.has(childElement.props.index)) {
                console.error('the index of tabItem should not be repeat');
                return null;
            }
            else {
                set.add(childElement.props.index);
            }
            var displayName = childElement.type.displayName;
            if (displayName === 'TabItem') {
                if (childElement.props.index === activeIndex) {
                    return childElement;
                }
                else {
                    return null;
                }
            }
            else {
                console.error('Warning: Tabs has a child which is not a TabItem component');
                return;
            }
        });
    };
    return (React.createElement("div", { className: classes },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("div", { className: "river-tabs-content" }, renderTabPane())));
};
Tabs.defaultProps = {
    type: 'line',
};
export default Tabs;
