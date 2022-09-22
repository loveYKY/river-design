import React from 'react';
import classNames from 'classnames';

type LabelType = React.ReactElement | string;
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

export const TabItem: React.FC<TabItemProps> = props => {
    const {children, className} = props;
    const classes = classNames('river-tab-panel', className);
    return <div className={classes}>{children}</div>;
};

TabItem.displayName = 'TabItem';

export default TabItem;
