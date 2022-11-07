import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Transition from '../Transition/transition';
/**
 * 用于提示信息,支持多种类型的alert组件
 * ###引用方法
 * ```js
 * import Alert from 'river-design'
 * ```
 *
 */
export var Alert = function (props) {
    var _a;
    var className = props.className, title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable;
    var classes = classNames('river-alert', className, (_a = {},
        _a["river-alert-".concat(type)] = type,
        _a));
    var _b = useState(true), visible = _b[0], setVisible = _b[1];
    var handleClose = function (e) {
        if (onClose) {
            onClose();
        }
        setVisible(false);
    };
    return (React.createElement(Transition, { in: visible, timeout: 300, animation: "zoom-in-top" },
        React.createElement("div", { className: classes },
            React.createElement("div", { className: "river-alert-container" },
                closable ? (React.createElement(Icon, { className: "river-alert-close", icon: faClose, color: "white", onClick: handleClose })) : null,
                React.createElement("div", { className: "river-alert-title" }, title),
                description === null ? null : React.createElement("div", { className: "river-alert-description" }, description)))));
};
Alert.defaultProps = {
    description: null,
    type: 'default',
    closable: true,
};
export default Alert;
