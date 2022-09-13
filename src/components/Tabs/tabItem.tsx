import React from 'react';
import classNames from 'classnames';

type LabelType = React.ReactElement | string;
export interface TabItemProps {
    //tab的index值
    index: string;
    //tab的标签
    label: LabelType;
    //是否禁用
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const TabItem: React.FC<TabItemProps> = props => {
    const {children, className} = props;
    const classes = classNames('river-tab-panel', className);
    return <div className={classes}>{children}</div>;
};

TabItem.displayName = 'TabItem';

export default TabItem;
