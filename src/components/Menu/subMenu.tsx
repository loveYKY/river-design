import React, {useContext, useEffect, useState} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';
import Icon from '../Icon/icon';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import Transition from '../Transition/transition';

export interface SubMenuProps {
    //SubMenu的index
    index: string;
    //类名
    className?: string;
    //标题
    title: string;
    //是否禁用
    disabled?: boolean;
    children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = props => {
    const {index, className, title, children, disabled} = props;

    const [menuOpen, setOpen] = useState(false);

    const [isActive, setActive] = useState(false);

    const context = useContext(MenuContext);

    const classes = classNames('submenu-item', 'river-menuItem', className, {
        'is-disabled': disabled,
        'is-active': context.index === index || isActive,
    });

    //icon Classes
    const iconClasses = classNames('arrow-icon', {
        'arrow-icon-active': menuOpen,
    });

    //初始化menuOpen的值

    useEffect(() => {
        if (context.defaultOpenSubMenus && context.defaultOpenSubMenus.indexOf(index) !== -1) {
            setOpen(true);
        }
    }, [context.defaultOpenSubMenus, index]);

    //submenu和menuItem active状态联动
    useEffect(() => {
        const indexArr = React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            return childElement.props.index;
        });
        //如果activeIndex 存在于submenu的子组件中，则激活submenu的active状态
        if (indexArr?.indexOf(context.index) !== -1) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [context.index, children]);

    //判断子组件是否是MenuItem类型
    const renderChildren = () => {
        const classes = classNames('river-submenu', {
            'is-opened': menuOpen,
        });
        let set = new Set();
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            if (set.has(childElement.props.index)) {
                console.error('the index of the MenuItem or SubMenu should be unique');
                return;
            } else {
                set.add(childElement.props.index);
            }
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem') {
                return childElement;
            } else {
                console.error('Warning: subMenu has a child which is not a MenuItem component');
            }
        });

        return (
            <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
                <ul className={classes}>{childrenComponent}</ul>
            </Transition>
        );
    };

    //subMenu点击事件
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
        if (context.onSelect && typeof index === 'string') {
            context.onSelect(index);
        }
    };

    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    };

    const clickEvents =
        context.triggerSubMenuAction === 'click'
            ? {
                  onClick: handleClick,
              }
            : {};
    const hoverEvents =
        context.triggerSubMenuAction === 'hover'
            ? {
                  onMouseEnter: (e: React.MouseEvent) => {
                      handleMouse(e, true);
                  },
                  onMouseLeave: (e: React.MouseEvent) => {
                      handleMouse(e, false);
                  },
              }
            : {};

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon={faAngleDown} className={iconClasses}></Icon>
            </div>
            {renderChildren()}
        </li>
    );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
