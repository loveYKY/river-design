import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {TabItemProps} from './tabItem';

type TabType = 'line' | 'card';

export interface TabsProps {
    //默认选中的tab
    activeKey?: string;
    //类名
    className?: string;
    //activeKey变换触发的回调
    onChange?: (key: string) => void;
    //点击Tab触发的回调
    onSelect?: (key: string) => void;
    //tab的样式
    type?: TabType;
    children?: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = props => {
    const {activeKey, className, onChange, onSelect, type, children} = props;

    const classes = classNames('river-tabs', className);

    //根据type给Tab绑定样式
    const navClass = classNames('river-tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
    });

    const [activeIndex, setActive] = useState(activeKey);

    //activeKey变化引起activeIndex变化
    useEffect(() => {
        setActive(activeKey);
    }, [activeKey]);

    //activeKey变化时候触发onChange回调
    useEffect(() => {
        if (onChange && activeIndex) {
            onChange(activeIndex);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    //点击tab触发onSelect事件
    const handleClick = (index: string, disable: boolean | undefined) => {
        if (!disable) {
            setActive(index);
        }
        if (onSelect && !disable) {
            onSelect(index);
        }
    };

    //渲染tabNavList
    const renderNavLinks = () => {
        let set = new Set();
        return React.Children.map(children, child => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>;
            const {label, disabled} = childElement.props;

            if (set.has(childElement.props.index)) {
                console.error('the index of tabItem should not be repeat');
                return null;
            } else {
                set.add(childElement.props.index);
            }

            const classes = classNames('river-tabs-nav-item', {
                'is-active': activeIndex === childElement.props.index,
                disabled: disabled,
            });

            const {displayName} = childElement.type;
            if (displayName === 'TabItem') {
                return (
                    <li
                        className={classes}
                        onClick={() => {
                            handleClick(childElement.props.index, disabled);
                        }}>
                        {label}
                    </li>
                );
            } else {
                console.error('Warning: Tabs has a child which is not a TabItem component');
                return;
            }
        });
    };

    //渲染Tab展示面板
    const renderTabPane = () => {
        let set = new Set();
        return React.Children.map(children, child => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>;
            if (set.has(childElement.props.index)) {
                console.error('the index of tabItem should not be repeat');
                return null;
            } else {
                set.add(childElement.props.index);
            }

            const {displayName} = childElement.type;

            if (displayName === 'TabItem') {
                if (childElement.props.index === activeIndex) {
                    return childElement;
                } else {
                    return null;
                }
            } else {
                console.error('Warning: Tabs has a child which is not a TabItem component');
                return;
            }
        });
    };

    return (
        <div className={classes}>
            <ul className={navClass}>{renderNavLinks()}</ul>
            <div className="viking-tabs-content">{renderTabPane()}</div>
        </div>
    );
};

Tabs.defaultProps = {
    type: 'line',
};

export default Tabs;
