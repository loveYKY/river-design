import React, {useState} from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import Transition from '../Transition/transition';
export type AlertType = 'success' | 'default' | 'danger' | 'warning';

type closeFuntion = () => void;

export interface BaseAlertProps {
    /**
     * 设置类名
     */
    className?: string;
    /**
     * 设置标题
     */
    title: string;
    /**
     * 设置描述
     */
    description?: string | React.ReactElement | null;
    /**
     * 设置类型
     */
    type?: AlertType;
    /**
     * 关闭alert时的回调
     */
    onClose?: closeFuntion;
    /**
     * 关闭icon是否可见
     */
    closable?: boolean;
}

/**
 * 用于提示信息,支持多种类型的alert组件
 * ###引用方法
 * ```js
 * import Alert from 'river-design'
 * ```
 *
 */

export const Alert: React.FC<BaseAlertProps> = props => {
    const {className, title, description, type, onClose, closable} = props;
    const classes = classNames('river-alert', className, {
        [`river-alert-${type}`]: type,
    });
    const [visible, setVisible] = useState(true);

    const handleClose = (e: React.MouseEvent) => {
        if (onClose) {
            onClose();
        }
        setVisible(false);
    };

    return (
        <Transition in={visible} timeout={300} animation="zoom-in-top">
            <div className={classes}>
                <div className="river-alert-container">
                    {closable ? (
                        <Icon className="river-alert-close" icon={faClose} color="white" onClick={handleClose}></Icon>
                    ) : null}
                    <div className="river-alert-title">{title}</div>
                    {description === null ? null : <div className="river-alert-description">{description}</div>}
                </div>
            </div>
        </Transition>
    );
};

Alert.defaultProps = {
    description: null,
    type: 'default',
    closable: true,
};

export default Alert;
