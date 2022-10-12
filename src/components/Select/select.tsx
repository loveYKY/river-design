import React, {useEffect, useState} from 'react';
import Input from '../Input/input';
import {InputProps} from '../Input/input';
import Icon from '../Icon/icon';
import {faAngleDown, faInbox} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import e from 'express';

export interface optionType {
    /** 标签名 */
    label: string;
    /** 标签值 */
    value: any;
    /** 是否禁用 */
    disabled?: boolean;
    [propName: string]: any;
}

export interface SelectProps extends Omit<InputProps, 'onSelect'> {
    /** 选择单选或多选模式 */
    mode?: 'Single' | 'Multiple';
    /** 是否支持搜索 */
    Search?: boolean;
    /** select的数据 */
    options?: optionType[];
    /** 渲染的option label */
    optionLabelProp?: string;
    /** 类名 */
    className?: string;
    /** 样式 */
    style?: React.CSSProperties;
    /** select框icon */
    icon?: React.ReactElement;
    /** 选中时触发的回调 */
    onSelect?: (item: optionType) => void;
}

export const Select: React.FC<SelectProps> = props => {
    const {mode, style, value, onSelect, Search, options, optionLabelProp, icon, className, ...restProps} = props;

    //当前渲染的Options
    const [curOptions, setCurOption] = useState<optionType[]>([]);
    //是否展示Options
    const [showOptions, setShowOption] = useState(false);
    //当前list-item的值
    const [listIndex, setIndex] = useState<number[]>([]);
    //当前选中的list-item的值
    const [selectIndex, setSelectIndex] = useState<number[]>([]);
    //输入框值
    const [inputVal, setInputVal] = useState(value === undefined ? '' : value);

    //初始化curOptions
    useEffect(() => {
        if (options) {
            setCurOption(options);
        }
    }, [options]);

    //非Search模式下，输入框不允许聚焦
    const handleFocus = (e: React.FocusEvent<HTMLElement, Element>) => {
        if (!Search) {
            e.target.blur();
        }
    };

    //输入框值变化时的回调函数
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim();
        setInputVal(val);
    };

    //点击选中option时更改input的值
    const handleSelect = (item: optionType) => {
        if (optionLabelProp) {
            setInputVal(item[optionLabelProp]);
        } else {
            setInputVal(item.label);
        }
        if (onSelect) {
            onSelect(item);
        }
        setShowOption(!showOptions)
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
                                'is-active': listIndex.includes(index),
                                'is-selected': selectIndex.includes(index),
                            });
                            return (
                                <li
                                    className={optionItemClass}
                                    key={item.label + item.value}
                                    onClick={() => {
                                        handleSelect(item);
                                    }}>
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

    return (
        <div className="river-select" style={style}>
            <Input
                value={inputVal}
                className={`${showOptions ? 'river-input-active' : ''}`}
                {...restProps}
                icon={renderIcon()}
                onClick={() => setShowOption(!showOptions)}
                onFocus={handleFocus}
                onChange={handleChange}></Input>
            {showOptions && renderOptions()}
        </div>
    );
};

Select.defaultProps = {
    mode: 'Single',
    Search: false,
};

export default Select;
