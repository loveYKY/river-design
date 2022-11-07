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
import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounced from '../../hooks/useDebounced';
/**
 * 支持Input标签属性的AutoCompete组件
 * ###引用方法
 * ```js
 * import AutoCompete from 'river-design'
 * ```
 *
 */
export var AutoCompete = function (props) {
    var fetchSuggestion = props.fetchSuggestion, onSelect = props.onSelect, renderOption = props.renderOption, value = props.value, restProps = __rest(props, ["fetchSuggestion", "onSelect", "renderOption", "value"]);
    //输入框值
    var _a = useState(value === undefined ? '' : value), inputVal = _a[0], setInputVal = _a[1];
    //搜索结果数组
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    //Loading
    var _c = useState(false), isLoading = _c[0], setLoading = _c[1];
    //判断此时是否是搜索状态
    var triggerSearch = useRef(false);
    //当前list-item的值
    var _d = useState(-1), listIndex = _d[0], setListIndex = _d[1];
    //当前选中的list-item的值
    var _e = useState(-1), selectIndex = _e[0], setSelectIndex = _e[1];
    //初始化listIndex 和 setSelectIndex
    useEffect(function () {
        if (suggestions.length !== 0 && inputVal) {
            var index = suggestions.findIndex(function (item) {
                return item.label === inputVal;
            });
            setSelectIndex(index);
            setListIndex(index);
        }
    }, [suggestions, inputVal]);
    //实现异步搜索防抖
    var debouncedValue = useDebounced(inputVal, 300);
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestion(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results
                    .then(function (res) {
                    setLoading(false);
                    setSuggestions(res);
                })
                    .catch(function (err) {
                    console.log(err);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
    }, [debouncedValue]);
    //input输入框值变化时的回调函数
    var handleChange = function (e) {
        var val = e.target.value.trim();
        setInputVal(val);
        triggerSearch.current = true;
    };
    //选中时的回调函数
    var handleSelect = function (item) {
        setInputVal(item.label);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    //搜索内容模板
    var renderTemplate = function (data) {
        if (renderOption) {
            return renderOption(data);
        }
        else {
            return data.label;
        }
    };
    var handleKeyDown = function (e) {
        var _a;
        if (suggestions.length === 0)
            return;
        var itemHeight = (_a = document.querySelector('.suggestion-item')) === null || _a === void 0 ? void 0 : _a.clientHeight;
        if (e.key === 'ArrowDown') {
            if (listIndex < suggestions.length - 1) {
                var index = listIndex + 1;
                var height = itemHeight == null ? 0 : itemHeight * (index + 1);
                var clientHeight = document.querySelector('.river-suggestion-list').clientHeight;
                var scrollTop = document.querySelector('.river-suggestion-list').scrollTop;
                var temp = height - scrollTop;
                if (temp > clientHeight) {
                    document.querySelector('.river-suggestion-list').scrollTop = height - clientHeight;
                }
                setListIndex(index);
            }
        }
        else if (e.key === 'ArrowUp') {
            if (listIndex > 0) {
                var index = listIndex - 1;
                var height = itemHeight == null ? 0 : itemHeight * index;
                var scrollTop = document.querySelector('.river-suggestion-list').scrollTop;
                if (height < scrollTop) {
                    document.querySelector('.river-suggestion-list').scrollTop = height;
                }
                setListIndex(index);
            }
        }
        else if (e.key === 'Enter') {
            setInputVal(suggestions[listIndex].label);
            setSuggestions([]);
            if (onSelect) {
                onSelect(suggestions[listIndex]);
            }
            triggerSearch.current = false;
        }
    };
    var handleMouseEnter = function (index) {
        setListIndex(index);
    };
    var renderSuggestions = function () {
        return (React.createElement("ul", { className: "river-suggestion-list" }, (function () {
            if (isLoading) {
                return (React.createElement("div", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: "spinner" }),
                    ";"));
            }
            else {
                if ((suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) !== 0) {
                    return suggestions.map(function (item, index) {
                        return (React.createElement("li", { className: "suggestion-item ".concat(index === selectIndex ? 'is-selected' : '', " ").concat(index === listIndex ? 'is-active' : ''), key: item.label + item.value, onClick: function () {
                                handleSelect(item);
                            }, onMouseEnter: function (e) { return handleMouseEnter(index); } }, renderTemplate(item)));
                    });
                }
            }
        })()));
    };
    return (React.createElement("div", { className: "river-auto-complete" },
        React.createElement(Input, __assign({ value: inputVal }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })),
        (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) !== 0 && renderSuggestions()));
};
export default AutoCompete;
