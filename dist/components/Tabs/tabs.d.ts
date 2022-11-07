import React from 'react';
declare type TabType = 'line' | 'card';
export interface TabsProps {
    /** 默认选中的tab */
    activeKey?: string;
    /** 设置类名 */
    className?: string;
    /** activeKey变化时触发的回调 */
    onChange?: (key: string) => void;
    /** 选中tab触发的回调 */
    onSelect?: (key: string) => void;
    /** tab的样式，支持line和card两种模式 */
    type?: TabType;
    children?: React.ReactNode;
}
/**
 * 支持line、card模式的Tabs菜单
 * ###引用方法
 * ```js
 * import Tabs from 'river-design'
 * ```
 *
 */
export declare const Tabs: React.FC<TabsProps>;
export default Tabs;
