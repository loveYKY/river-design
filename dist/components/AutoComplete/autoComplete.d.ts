import React from 'react';
import { InputProps } from '../Input/input';
export interface dataSourceType {
    /** 标签名 */
    label: string;
    /** 标签值 */
    value: any;
}
export declare type dataStructure<T = {}> = T & dataSourceType;
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
export declare const AutoCompete: React.FC<AutoCompleteProps>;
export default AutoCompete;
