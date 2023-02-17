import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type triggerMode = 'click' | 'hover';
//定义menu组件的props接口
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

//定义MenuContext接口
interface IMenuContext {
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
    triggerSubMenuAction?: triggerMode;
}

export const MenuContext = React.createContext<IMenuContext>({index: '0'});

//Menu组件
/**
 * 支持水平、垂直模式的Menu菜单
 * ###引用方法
 * ```js
 * import { Menu } from 'river-design'
 * ```
 *
 */
export const Menu: React.FC<MenuProps> = props => {
    const {selectedIndex, className, mode, style, onSelect, triggerSubMenuAction, children, defaultOpenSubMenus} =
        props;

    //添加控制选中状态的state
    const [activeIndex, setActive] = useState(selectedIndex);

    useEffect(() => {
        setActive(selectedIndex);
    }, [selectedIndex]);

    //添加class
    const classes = classNames('river-menu', className, {
        'is-vertical': mode === 'vertical',
        'is-horizontal': mode === 'horizontal',
    });

    //判断子组件是否是MenuItem类型
    const renderChildren = () => {
        //利用集合判断MenuItem组件index是否重复
        const set = new Set();
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;

            if (set.has(childElement.props.index)) {
                console.error('the index of the MenuItem or SubMenu should be unique');
                return;
            } else {
                set.add(childElement.props.index);
            }
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return childElement;
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };

    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };

    const passValue: IMenuContext = {
        index: activeIndex ? activeIndex : '0',
        onSelect: handleClick,
        mode: mode,
        triggerSubMenuAction: triggerSubMenuAction,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };

    return (
        <MenuContext.Provider value={passValue}>
            <ul className={classes} style={style}>
                {renderChildren()}
            </ul>
        </MenuContext.Provider>
    );
};

Menu.defaultProps = {
    mode: 'horizontal',
    selectedIndex: '0',
    triggerSubMenuAction: 'click',
};

export default Menu;
