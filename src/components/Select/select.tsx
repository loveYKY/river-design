import React, {useEffect, useState} from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import {faAngleDown, faInbox, faXmark} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import _ from 'lodash';

export interface optionType {
    /** 标签名 */
    label: string;
    /** 标签值 unqiue!*/
    value: any;
    /** 是否禁用 */
    disabled?: boolean;
    [propName: string]: any;
}

export interface SelectProps {
    /** 选择单选或多选模式 */
    mode?: 'Single' | 'Multiple';
    /** 是否支持搜索 */
    Search?: boolean;
    /** select的数据 */
    options?: optionType[];
    /** 默认选中的数据 */
    defaultSelect?: optionType[];
    /** 渲染的option label */
    optionLabelProp?: string;
    /** 类名 */
    className?: string;
    /** 样式 */
    style?: React.CSSProperties;
    /** select框icon */
    icon?: React.ReactElement;
    /**多选情况下是否隐藏选项 */
    multipleHidden?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 选中时触发的回调 */
    onSelect?: (curItem: optionType, allItem: optionType[]) => void;
    /** 下拉框出现或隐藏时的回调 */
    onVisibleChange?: (item: boolean) => void;
    /** 默认提示 */
    placeholder?: string;
}

export const Select: React.FC<SelectProps> = props => {
    const {
        mode,
        style,
        defaultSelect,
        onSelect,
        onVisibleChange,
        multipleHidden,
        Search,
        options,
        optionLabelProp,
        icon,
        disabled,
        className,
        placeholder
    } = props;

    //当前渲染的Options
    const [curOptions, setCurOption] = useState<optionType[]>(options ? options : []);
    //是否展示Options
    const [showOptions, setShowOption] = useState(false);
    //当前list-item的值
    const [listIndex, setListIndex] = useState(-1);
    //输入框值
    const [inputVal, setInputVal] = useState('');
    //选中的数据(多选模式下)
    const [selectData, setSelectData] = useState<optionType[]>(defaultSelect ? defaultSelect : []);

    //初始化inputVal
    useEffect(() => {
        if (mode === 'Single') {
            if (defaultSelect && defaultSelect.length) {
                let temp = defaultSelect[0];
                if (optionLabelProp) {
                    setInputVal(temp[optionLabelProp]);
                } else {
                    setInputVal(temp.label);
                }
            }
        }
    }, [defaultSelect]);

    //初始化option列表的scrollTop，让其停留在被选中item的高度
    useEffect(() => {
        if (showOptions && selectData.length !== 0) {
            let temp = selectData[selectData.length - 1];
            let index = curOptions.findIndex(item => {
                return item.value === temp.value;
            });
            if (index !== -1) {
                let itemHeight = document.querySelector('.options-item')?.clientHeight;
                let clientHeight = document.querySelector('.river-options-list')!.clientHeight;
                let height = itemHeight == null ? 0 : itemHeight * (index + 1);
                let scrollTop = document.querySelector('.river-options-list')!.scrollTop;
                let temp = height - scrollTop;
                if (temp > clientHeight) {
                    document.querySelector('.river-options-list')!.scrollTop = height - clientHeight;
                }
            }
        }
    }, [showOptions]);

    //非Search模式下，输入框不允许聚焦
    const handleFocus = (e: React.FocusEvent<HTMLElement, Element>) => {
        if (Search || mode === 'Multiple') return;
        e.target.blur();
    };

    //输入框值变化时的回调函数
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim();
        //Search模式下，inputVal变化会导致下拉框数据变化
        if (Search && options) {
            let tempArr: optionType[] = [];
            if (val === '') {
                tempArr = options;
            } else {
                if (optionLabelProp) {
                    tempArr = options.filter(item => {
                        return item[optionLabelProp].indexOf(val) !== -1;
                    });
                } else {
                    tempArr = options.filter(item => {
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
    const handleSelect = (data: optionType) => {
        if (mode === 'Single') {
            if (optionLabelProp) {
                setInputVal(data[optionLabelProp]);
            } else {
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
        } else {
            let temp = _.cloneDeep(selectData);
            let index = selectData.findIndex(item => {
                return item.value === data.value;
            });
            if (index === -1) {
                temp.push(data);
            } else {
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
    const deleteData = (item: optionType) => {
        let temp = selectData.filter(val => {
            return val.value !== item.value;
        });
        setSelectData(temp);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (curOptions.length === 0 && !showOptions) return;
        let itemHeight = document.querySelector('.options-item')?.clientHeight;
        if (e.key === 'ArrowDown') {
            if (listIndex < curOptions.length - 1) {
                let index = listIndex + 1;
                let height = itemHeight == null ? 0 : itemHeight * (index + 1);
                let clientHeight = document.querySelector('.river-options-list')!.clientHeight;
                let scrollTop = document.querySelector('.river-options-list')!.scrollTop;
                let temp = height - scrollTop;
                if (temp > clientHeight) {
                    document.querySelector('.river-options-list')!.scrollTop = height - clientHeight;
                }
                setListIndex(index);
            }
        } else if (e.key === 'ArrowUp') {
            if (listIndex > 0) {
                let index = listIndex - 1;
                let height = itemHeight == null ? 0 : itemHeight * index;
                let scrollTop = document.querySelector('.river-options-list')!.scrollTop;
                if (height < scrollTop) {
                    document.querySelector('.river-options-list')!.scrollTop = height;
                }
                setListIndex(index);
            }
        } else if (e.key === 'Enter') {
            let data = curOptions[listIndex];
            if (!data) return;
            if (mode === 'Single') {
                if (optionLabelProp) {
                    setInputVal(data[optionLabelProp]);
                } else {
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
            } else {
                let temp = _.cloneDeep(selectData);
                let index = selectData.findIndex(item => {
                    return item.value === data.value;
                });
                if (index === -1) {
                    temp.push(data);
                } else {
                    temp.splice(index, 1);
                }
                setSelectData(temp);
                setInputVal('');
                setCurOption(options ? options : []);
                if (onSelect) {
                    onSelect(data, temp);
                }
            }
        }
    };
    const handleMouseEnter = (index: number) => {
        setListIndex(index);
    };

    //renderICon的函数
    const renderIcon = () => {
        if (icon) {
            return icon;
        } else {
            return <Icon icon={faAngleDown}></Icon>;
        }
    };

    //render下拉框数据的函数
    const renderOptions = () => {
        return (
            <ul className="river-options-list">
                {(() => {
                    //数据不存在
                    if (curOptions.length === 0) {
                        return (
                            <div className="river-select-noData">
                                <div>
                                    <Icon icon={faInbox} color="grey" size="3x"></Icon>
                                    <p>No Data</p>
                                </div>
                            </div>
                        );
                    } else {
                        //渲染数据
                        return curOptions.map((item, index) => {
                            let optionItemClass = classNames('options-item', {
                                'item-disabled': item.disabled,
                                'is-active': listIndex === index,
                                'is-selected': (() => {
                                    let index = selectData.findIndex(temp => {
                                        return temp.value === item.value;
                                    });
                                    return index === -1 ? false : true;
                                })(),
                            });
                            return (
                                <li
                                    className={optionItemClass}
                                    key={item.label + item.value}
                                    onClick={() => {
                                        handleSelect(item);
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}>
                                    {(() => {
                                        //根据指定的属性进行渲染
                                        if (optionLabelProp) {
                                            return item[optionLabelProp];
                                        } else {
                                            return item.label;
                                        }
                                    })()}
                                </li>
                            );
                        });
                    }
                })()}
            </ul>
        );
    };

    let classes = classNames('river-select', className, {
        'river-select-active': showOptions,
    });

    let tagClasses = classNames('river-select-tags', {
        'river-select-tags-hidden': multipleHidden,
    });

    return (
        <div className={classes} style={style}>
            <div className="river-select-wrapper">
                {mode === 'Multiple' ? (
                    <div className={tagClasses}>
                        {(() => {
                            if (multipleHidden && selectData.length !== 0) {
                                return (
                                    <div className="river-select-tags-item">
                                        <span className="tags-item-label">+{selectData.length}...</span>
                                    </div>
                                );
                            } else {
                                return selectData.map((item, index) => {
                                    return (
                                        <div className="river-select-tags-item" key={item.label + item.value}>
                                            <span className="tags-item-label">{item.label}</span>
                                            <Icon
                                                icon={faXmark}
                                                color="#adb5bd"
                                                onClick={() => {
                                                    deleteData(item);
                                                }}></Icon>
                                        </div>
                                    );
                                });
                            }
                        })()}
                    </div>
                ) : null}
                <Input
                    value={inputVal}
                    icon={renderIcon()}
                    disabled={disabled}
                    placeholder={placeholder}
                    onClick={() => {
                        if (onVisibleChange) {
                            onVisibleChange(showOptions);
                        }
                        setShowOption(!showOptions);
                    }}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}></Input>
            </div>
            {showOptions && renderOptions()}
        </div>
    );
};

Select.defaultProps = {
    mode: 'Single',
    Search: false,
};

export default Select;
