import React from 'react';
declare type LabelType = React.ReactElement | string;
export interface TabItemProps {
    /** tab唯一标识符 */
    index: string;
    /** tab的标签名 */
    label: LabelType;
    /** 设置是否禁用 */
    disabled?: boolean;
    /** 设置类名 */
    className?: string;
    /** ReactNode */
    children?: React.ReactNode;
}
export declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
