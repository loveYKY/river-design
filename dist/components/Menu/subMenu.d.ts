import React from 'react';
export interface SubMenuProps {
    /** SubMenu唯一标识符 */
    index: string;
    /** 设置类名 */
    className?: string;
    /** 设置菜单名 */
    title: string;
    /** 设置是否禁用 */
    disabled?: boolean;
    /** ReactNode */
    children?: React.ReactNode;
}
export declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
