import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Input, {InputProps} from '../Input/input';
import Icon from '../Icon/icon';
import useDebounced from '../../hooks/useDebounced';

export interface dataSourceType {
    /** 标签名 */
    label: string;
    /** 标签值 */
    value: any;
}
export type dataStructure<T = {}> = T & dataSourceType;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**
     * 完整数据数组
     * 
     * interface dataSourceType {
            label: string;
            value: any;
        }
     * type dataStructure<T = {}> = T & dataSourceType;
     * 
     */
    /** 搜索函数 */
    fetchSuggestion: (query: string) => dataStructure[] | Promise<dataStructure[]>;
    /** 设置展示数据的模板 */
    renderOption?: (data: dataStructure) => React.ReactElement;
    /** 选中时触发的回调 */
    onSelect?: (item: dataStructure) => void;
}

/**
 * 支持Input标签属性的AutoCompete组件
 * ###引用方法
 * ```js
 * import AutoCompete from 'river-design'
 * ```
 *
 */
export const AutoCompete: React.FC<AutoCompleteProps> = props => {
    const {fetchSuggestion, onSelect, renderOption, value, ...restProps} = props;
    //输入框值
    const [inputVal, setInputVal] = useState(value === undefined ? '' : value);
    //搜索结果数组
    const [suggestions, setSuggestions] = useState<dataStructure[]>([]);
    //Loading
    const [isLoading, setLoading] = useState(false);
    //判断此时是否是搜索状态
    const triggerSearch = useRef(false);

    //当前list-item的值
    const [listIndex, setListIndex] = useState(-1);

    //当前选中的list-item的值
    const [selectIndex, setSelectIndex] = useState(-1);

    //初始化listIndex 和 setSelectIndex

    useEffect(() => {
        if (suggestions.length !== 0 && inputVal) {
            const index = suggestions.findIndex(item => {
                return item.label === inputVal;
            });
            setSelectIndex(index);
            setListIndex(index);
        }
    }, [suggestions, inputVal]);

    //实现异步搜索防抖
    const debouncedValue = useDebounced(inputVal, 300);
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestion(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results
                    .then(res => {
                        setLoading(false);
                        setSuggestions(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
        }
    }, [debouncedValue]);

    //input输入框值变化时的回调函数
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim();
        setInputVal(val);
        triggerSearch.current = true;
    };

    //选中时的回调函数
    const handleSelect = (item: dataStructure) => {
        setInputVal(item.label);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };

    //搜索内容模板
    const renderTemplate = (data: dataStructure) => {
        if (renderOption) {
            return renderOption(data);
        } else {
            return data.label;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (suggestions.length === 0) return;
        let itemHeight = document.querySelector('.suggestion-item')?.clientHeight;
        if (e.key === 'ArrowDown') {
            if (listIndex < suggestions.length - 1) {
                let index = listIndex + 1;
                let height = itemHeight == null ? 0 : itemHeight * (index + 1);
                let clientHeight = document.querySelector('.river-suggestion-list')!.clientHeight;
                let scrollTop = document.querySelector('.river-suggestion-list')!.scrollTop;
                let temp = height - scrollTop;
                if (temp > clientHeight) {
                    document.querySelector('.river-suggestion-list')!.scrollTop = height - clientHeight;
                }
                setListIndex(index);
            }
        } else if (e.key === 'ArrowUp') {
            if (listIndex > 0) {
                let index = listIndex - 1;
                let height = itemHeight == null ? 0 : itemHeight * index;
                let scrollTop = document.querySelector('.river-suggestion-list')!.scrollTop;
                if (height < scrollTop) {
                    document.querySelector('.river-suggestion-list')!.scrollTop = height;
                }
                setListIndex(index);
            }
        } else if (e.key === 'Enter') {
            setInputVal(suggestions[listIndex].label);
            setSuggestions([]);
            if (onSelect) {
                onSelect(suggestions[listIndex]);
            }
            triggerSearch.current = false;
        }
    };

    const handleMouseEnter = (index: number) => {
        setListIndex(index);
    };

    const renderSuggestions = () => {
        return (
            <ul className="river-suggestion-list">
                {(() => {
                    if (isLoading) {
                        return (
                            <div className="suggstions-loading-icon">
                                <Icon icon="spinner"></Icon>;
                            </div>
                        );
                    } else {
                        if (suggestions?.length !== 0) {
                            return suggestions.map((item, index) => {
                                return (
                                    <li
                                        className={`suggestion-item ${index === selectIndex ? 'is-selected' : ''} ${
                                            index === listIndex ? 'is-active' : ''
                                        }`}
                                        key={item.label + item.value}
                                        onClick={() => {
                                            handleSelect(item);
                                        }}
                                        onMouseEnter={e => handleMouseEnter(index)}>
                                        {renderTemplate(item)}
                                    </li>
                                );
                            });
                        }
                    }
                })()}
            </ul>
        );
    };

    return (
        <div className="river-auto-complete">
            <Input value={inputVal} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown}></Input>
            {suggestions?.length !== 0 && renderSuggestions()}
        </div>
    );
};

export default AutoCompete;
