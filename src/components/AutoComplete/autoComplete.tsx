import React, {ChangeEvent, useState} from 'react';
import Input, {InputProps} from '../Input/input';

export interface dataStructure {
    /** 标签名 */
    label: string;
    /** 标签值 */
    value: any;
}
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 完整数据数组 */
    data: Array<dataStructure>;
    /** 搜索函数 */
    fetchSuggestion: (query: string, data: Array<dataStructure>) => Array<dataStructure>;
    /** 选中时触发的回调 */
    onSelect?: (item: dataStructure) => void;
}

export const AutoCompete: React.FC<AutoCompleteProps> = props => {
    const {fetchSuggestion, onSelect, data, value, ...restProps} = props;
    const [inputVal, setInputVal] = useState(value === undefined ? '' : value);
    const [suggestions, setSuggestions] = useState<Array<dataStructure>>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputVal(val);
        if (val) {
            const results = fetchSuggestion(val, data);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (item: dataStructure) => {
        setInputVal(item.label);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };

    const renderSuggestions = () => {
        return (
            <ul>
                {suggestions.map(item => {
                    return (
                        <li
                            key={item.label + item.value}
                            onClick={() => {
                                handleSelect(item);
                            }}>
                            {item.label}
                        </li>
                    );
                })}
            </ul>
        );
    };
    return (
        <div className="river-auto-complete">
            <Input value={inputVal} {...restProps} onChange={handleChange}></Input>
            {suggestions.length !== 0 && renderSuggestions()}
        </div>
    );
};

export default AutoCompete;
