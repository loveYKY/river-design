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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
/**
 * 支持 HTML Input的所有属性
 * ###引用方法
 * ```js
 * import Input from 'river-design'
 * ```
 */
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, className = props.className, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "className", "style"]);
    var _b = useState(false), isInGroup = _b[0], setGroup = _b[1];
    useEffect(function () {
        if (append !== undefined || prepend !== undefined) {
            setGroup(true);
        }
        else {
            setGroup(false);
        }
    }, [append, prepend]);
    var classes = classNames('river-input-wrapper', className, (_a = {
            'is-disabled': disabled
        },
        _a["input-size-".concat(size)] = size,
        _a['input-group'] = isInGroup,
        _a['input-group-prepend'] = prepend,
        _a['input-group-append'] = append,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: classes, style: style },
        prepend ? React.createElement("div", { className: "river-input-group-prepend" }, prepend) : null,
        icon ? React.createElement("div", { className: "icon-wrapper" }, icon) : null,
        React.createElement("input", __assign({ className: "river-input-inner", disabled: disabled }, restProps)),
        append ? React.createElement("div", { className: "river-input-group-append" }, append) : null));
};
export default Input;
