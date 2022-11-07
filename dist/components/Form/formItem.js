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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FormContext } from './form';
export var FormItem = function (props) {
    var _a;
    var name = props.name, label = props.label, valuePropName = props.valuePropName, trigger = props.trigger, validateTrigger = props.validateTrigger, rules = props.rules, getValueFromEvent = props.getValueFromEvent, labelPosition = props.labelPosition, children = props.children;
    var _b = useContext(FormContext), dispatch = _b.dispatch, validateField = _b.validateField, fields = _b.fields, initialValue = _b.initialValue;
    //根据formitem props初始化fields
    useEffect(function () {
        var init_value = (initialValue && initialValue[name]) || null;
        dispatch({
            type: 'addField',
            name: name,
            value: { label: label, name: name, value: init_value, rules: rules || [], isValid: true, errors: [] },
        });
    }, []);
    //获取store对应的value
    var fieldState = fields[name];
    var value = fieldState && fieldState.value;
    //获取store对应的error
    var errors = fieldState && fieldState.errors;
    //是否必填
    var isRequired = rules === null || rules === void 0 ? void 0 : rules.some(function (rule) {
        if (typeof rule !== 'function') {
            return rule.required;
        }
    });
    //是否有错
    var hasError = errors && errors.length > 0;
    //声明更新Store值的函数
    var onValueUpdate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value = getValueFromEvent && getValueFromEvent(args);
        dispatch({ type: 'updateField', name: name, value: value });
    };
    //表单校验函数
    var onValidate = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateField(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    //构建子组件props
    var controlProps = {};
    //子组件默认值
    controlProps[valuePropName] = value;
    controlProps[trigger] = onValueUpdate;
    //是否存在表单校验
    if (rules) {
        controlProps[validateTrigger] = onValidate;
    }
    //获取children数组的第一个元素
    var childList = React.Children.toArray(children);
    //没有子组件
    if (childList.length === 0) {
        console.error('缺少子组件');
    }
    //子组件不唯一
    if (childList.length > 1) {
        console.warn('子组件大于一个');
    }
    //子组件不是ReactElement
    if (!React.isValidElement(childList[0])) {
        console.error('不是ReactElement的子组件');
    }
    var child = childList[0];
    //克隆子组件，传递自定义prop
    var returnChildNode = React.cloneElement(child, __assign(__assign({}, child.props), controlProps));
    var rowClass = classNames('river-row', {
        'river-row-no-label': !label,
    });
    var labelClass = classNames('river-form-item-label', (_a = {},
        _a["river-form-item-label-".concat(labelPosition)] = labelPosition,
        _a['river-form-item-required'] = isRequired,
        _a));
    var RowItemClass = classNames({
        'river-form-item-errors': hasError,
    });
    return (React.createElement("div", { className: rowClass },
        label && (React.createElement("div", { className: labelClass },
            React.createElement("label", { title: label }, label))),
        React.createElement("div", { className: "river-form-item" },
            React.createElement("div", { className: RowItemClass }, returnChildNode),
            hasError && errors[0].message != undefined && (React.createElement("div", { className: "river-form-item-explain" },
                React.createElement("span", null, errors[0].message))))));
};
FormItem.defaultProps = {
    labelPosition: 'right',
    valuePropName: 'value',
    trigger: 'onChange',
    validateTrigger: 'onBlur',
    getValueFromEvent: function (args) { return args[0].target.value; },
};
export default FormItem;
