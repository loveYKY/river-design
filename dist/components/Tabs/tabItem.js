import React from 'react';
import classNames from 'classnames';
export var TabItem = function (props) {
    var children = props.children, className = props.className;
    var classes = classNames('river-tab-panel', className);
    return React.createElement("div", { className: classes }, children);
};
TabItem.displayName = 'TabItem';
export default TabItem;
