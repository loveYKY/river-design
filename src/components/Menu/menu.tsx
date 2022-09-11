import React, {useState} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type triggerMode = 'click' | 'hover';
//定义menu组件的props接口
export interface MenuProps {
    //默认选中的
    defaultIndex?: string;
    //类名
    className?: string;
    //设置垂直或水平模式
    mode?: MenuMode;
    //样式
    style?: React.CSSProperties;
    //子菜单展开的触发方式
    triggerSubMenuAction?: triggerMode;
    //选中回调函数
    onSelect?: (selectIndex: string) => void;
    //默认展开的子菜单
    defaultOpenSubMenus?: string[];
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
const Menu: React.FC<MenuProps> = props => {
    const {defaultIndex, className, mode, style, onSelect, triggerSubMenuAction, children, defaultOpenSubMenus} = props;

    //添加控制选中状态的state
    const [activeIndex, setActive] = useState(defaultIndex);

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
    defaultIndex: '0',
    triggerSubMenuAction: 'click',
};

export default Menu;