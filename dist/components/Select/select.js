import React, { useEffect, useState } from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import { faAngleDown, faInbox, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import _ from 'lodash';
export var Select = function (props) {
    var mode = props.mode, style = props.style, defaultSelect = props.defaultSelect, onSelect = props.onSelect, onVisibleChange = props.onVisibleChange, multipleHidden = props.multipleHidden, Search = props.Search, options = props.options, optionLabelProp = props.optionLabelProp, icon = props.icon, disabled = props.disabled, className = props.className, placeholder = props.placeholder;
    //当前渲染的Options
    var _a = useState(options ? options : []), curOptions = _a[0], setCurOption = _a[1];
    //是否展示Options
    var _b = useState(false), showOptions = _b[0], setShowOption = _b[1];
    //当前list-item的值
    var _c = useState(-1), listIndex = _c[0], setListIndex = _c[1];
    //输入框值
    var _d = useState(''), inputVal = _d[0], setInputVal = _d[1];
    //选中的数据(多选模式下)
    var _e = useState(defaultSelect ? defaultSelect : []), selectData = _e[0], setSelectData = _e[1];
    //初始化inputVal
    useEffect(function () {
        if (mode === 'Single') {
            if (defaultSelect && defaultSelect.length) {
                var temp = defaultSelect[0];
                if (optionLabelProp) {
                    setInputVal(temp[optionLabelProp]);
                }
                else {
                    setInputVal(temp.label);
                }
            }
        }
    }, [defaultSelect]);
    //初始化option列表的scrollTop，让其停留在被选中item的高度
    useEffect(function () {
        var _a;
        if (showOptions && selectData.length !== 0) {
            var temp_1 = selectData[selectData.length - 1];
            var index = curOptions.findIndex(function (item) {
                return item.value === temp_1.value;
            });
            if (index !== -1) {
                var itemHeight = (_a = document.querySelector('.options-item')) === null || _a === void 0 ? void 0 : _a.clientHeight;
                var clientHeight = document.querySelector('.river-options-list').clientHeight;
                var height = itemHeight == null ? 0 : itemHeight * (index + 1);
                var scrollTop = document.querySelector('.river-options-list').scrollTop;
                var temp_2 = height - scrollTop;
                if (temp_2 > clientHeight) {
                    document.querySelector('.river-options-list').scrollTop = height - clientHeight;
                }
            }
        }
    }, [showOptions]);
    //非Search模式下，输入框不允许聚焦
    var handleFocus = function (e) {
        if (Search || mode === 'Multiple')
            return;
        e.target.blur();
    };
    //输入框值变化时的回调函数
    var handleChange = function (e) {
        var val = e.target.value.trim();
        //Search模式下，inputVal变化会导致下拉框数据变化
        if (Search && options) {
            var tempArr = [];
            if (val === '') {
                tempArr = options;
            }
            else {
                if (optionLabelProp) {
                    tempArr = options.filter(function (item) {
                        return item[optionLabelProp].indexOf(val) !== -1;
                    });
                }
                else {
                    tempArr = options.filter(function (item) {
                        return item.label.indexOf(val) !== -1;
                    });
                }
            }
            setCurOption(tempArr);
            setShowOption(true);
        }
        setInputVal(val);
    };
    //点击选中option时更改input的值
    var handleSelect = function (data) {
        if (mode === 'Single') {
            if (optionLabelProp) {
                setInputVal(data[optionLabelProp]);
            }
            else {
                setInputVal(data.label);
            }
            setSelectData([data]);
            setShowOption(!showOptions);
            if (onVisibleChange) {
                onVisibleChange(showOptions);
            }
            if (onSelect) {
                onSelect(data, [data]);
            }
        }
        else {
            var temp = _.cloneDeep(selectData);
            var index = selectData.findIndex(function (item) {
                return item.value === data.value;
            });
            if (index === -1) {
                temp.push(data);
            }
            else {
                temp.splice(index, 1);
            }
            setSelectData(temp);
            setInputVal('');
            setCurOption(options ? options : []);
            if (onSelect) {
                onSelect(data, temp);
            }
        }
    };
    //点击tag icon删除数据
    var deleteData = function (item) {
        var temp = selectData.filter(function (val) {
            return val.value !== item.value;
        });
        setSelectData(temp);
    };
    var handleKeyDown = function (e) {
        var _a;
        if (curOptions.length === 0 && !showOptions)
            return;
        var itemHeight = (_a = document.querySelector('.options-item')) === null || _a === void 0 ? void 0 : _a.clientHeight;
        if (e.key === 'ArrowDown') {
            if (listIndex < curOptions.length - 1) {
                var index = listIndex + 1;
                var height = itemHeight == null ? 0 : itemHeight * (index + 1);
                var clientHeight = document.querySelector('.river-options-list').clientHeight;
                var scrollTop = document.querySelector('.river-options-list').scrollTop;
                var temp = height - scrollTop;
                if (temp > clientHeight) {
                    document.querySelector('.river-options-list').scrollTop = height - clientHeight;
                }
                setListIndex(index);
            }
        }
        else if (e.key === 'ArrowUp') {
            if (listIndex > 0) {
                var index = listIndex - 1;
                var height = itemHeight == null ? 0 : itemHeight * index;
                var scrollTop = document.querySelector('.river-options-list').scrollTop;
                if (height < scrollTop) {
                    document.querySelector('.river-options-list').scrollTop = height;
                }
                setListIndex(index);
            }
        }
        else if (e.key === 'Enter') {
            var data_1 = curOptions[listIndex];
            if (!data_1)
                return;
            if (mode === 'Single') {
                if (optionLabelProp) {
                    setInputVal(data_1[optionLabelProp]);
                }
                else {
                    setInputVal(data_1.label);
                }
                setSelectData([data_1]);
                setShowOption(!showOptions);
                if (onVisibleChange) {
                    onVisibleChange(showOptions);
                }
                if (onSelect) {
                    onSelect(data_1, [data_1]);
                }
            }
            else {
                var temp = _.cloneDeep(selectData);
                var index = selectData.findIndex(function (item) {
                    return item.value === data_1.value;
                });
                if (index === -1) {
                    temp.push(data_1);
                }
                else {
                    temp.splice(index, 1);
                }
                setSelectData(temp);
                setInputVal('');
                setCurOption(options ? options : []);
                if (onSelect) {
                    onSelect(data_1, temp);
                }
            }
        }
    };
    var handleMouseEnter = function (index) {
        setListIndex(index);
    };
    //renderICon的函数
    var renderIcon = function () {
        if (icon) {
            return icon;
        }
        else {
            return React.createElement(Icon, { icon: faAngleDown });
        }
    };
    //render下拉框数据的函数
    var renderOptions = function () {
        return (React.createElement("ul", { className: "river-options-list" }, (function () {
            //数据不存在
            if (curOptions.length === 0) {
                return (React.createElement("div", { className: "river-select-noData" },
                    React.createElement("div", null,
                        React.createElement(Icon, { icon: faInbox, color: "grey", size: "3x" }),
                        React.createElement("p", null, "No Data"))));
            }
            else {
                //渲染数据
                return curOptions.map(function (item, index) {
                    var optionItemClass = classNames('options-item', {
                        'item-disabled': item.disabled,
                        'is-active': listIndex === index,
                        'is-selected': (function () {
                            var index = selectData.findIndex(function (temp) {
                                return temp.value === item.value;
                            });
                            return index === -1 ? false : true;
                        })(),
                    });
                    return (React.createElement("li", { className: optionItemClass, key: item.label + item.value, onClick: function () {
                            handleSelect(item);
                        }, onMouseEnter: function () { return handleMouseEnter(index); } }, (function () {
                        //根据指定的属性进行渲染
                        if (optionLabelProp) {
                            return item[optionLabelProp];
                        }
                        else {
                            return item.label;
                        }
                    })()));
                });
            }
        })()));
    };
    var classes = classNames('river-select', className, {
        'river-select-active': showOptions,
    });
    var tagClasses = classNames('river-select-tags', {
        'river-select-tags-hidden': multipleHidden,
    });
    return (React.createElement("div", { className: classes, style: style },
        React.createElement("div", { className: "river-select-wrapper" },
            mode === 'Multiple' ? (React.createElement("div", { className: tagClasses }, (function () {
                if (multipleHidden && selectData.length !== 0) {
                    return (React.createElement("div", { className: "river-select-tags-item" },
                        React.createElement("span", { className: "tags-item-label" },
                            "+",
                            selectData.length,
                            "...")));
                }
                else {
                    return selectData.map(function (item, index) {
                        return (React.createElement("div", { className: "river-select-tags-item", key: item.label + item.value },
                            React.createElement("span", { className: "tags-item-label" }, item.label),
                            React.createElement(Icon, { icon: faXmark, color: "#adb5bd", onClick: function () {
                                    deleteData(item);
                                } })));
                    });
                }
            })())) : null,
            React.createElement(Input, { value: inputVal, icon: renderIcon(), disabled: disabled, placeholder: placeholder, onClick: function () {
                    if (onVisibleChange) {
                        onVisibleChange(showOptions);
                    }
                    setShowOption(!showOptions);
                }, onFocus: handleFocus, onChange: handleChange, onKeyDown: handleKeyDown })),
        showOptions && renderOptions()));
};
Select.defaultProps = {
    mode: 'Single',
    Search: false,
};
export default Select;
