import React from 'react';
export interface MenuItemProps {
    index: string;
    /**选项是否被禁用 */
    disabled?: boolean;
    /**选项扩展的 className */
    className?: string;
    /**选项的自定义 style */
    style?: React.CSSProperties;
    /** ReactNode */
    children?: React.ReactNode;
}
export declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
