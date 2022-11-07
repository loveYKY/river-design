import React from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type triggerMode = 'click' | 'hover';
export interface MenuProps {
    /**
     * 选中的菜单的index
     */
    selectedIndex?: string;
    /**
     * 设置类名
     */
    className?: string;
    /**
     * 设置Menu模式：水平或垂直
     */
    mode?: MenuMode;
    /** 设置样式 */
    style?: React.CSSProperties;
    /** 设置触发子菜单展开的方式 */
    triggerSubMenuAction?: triggerMode;
    /** 点击菜单的回调函数 */
    onSelect?: (selectIndex: string) => void;
    /** 默认展开的子菜单 */
    defaultOpenSubMenus?: string[];
    /** ReactNode */
    children?: React.ReactNode;
}
interface IMenuContext {
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
    triggerSubMenuAction?: triggerMode;
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * 支持水平、垂直模式的Menu菜单
 * ###引用方法
 * ```js
 * import Menu from 'river-design'
 * ```
 *
 */
export declare const Menu: React.FC<MenuProps>;
export default Menu;
