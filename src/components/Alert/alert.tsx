import React, {useState} from 'react';
import classNames from 'classnames';

export type AlertType = 'success' | 'default' | 'danger' | 'warning';

type closeFuntion = () => void;

export interface BaseAlertProps {
    className?: string;
    title: string;
    description?: string | React.ReactElement | null;
    type?: AlertType;
    onClose?: closeFuntion;
    closable?: boolean;
}

const Alert: React.FC<BaseAlertProps> = props => {
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

    return visible ? (
        <div className={classes}>
            <div className="river-alert-container">
                {closable ? (
                    <div className="river-alert-close" onClick={handleClose}>
                        关闭
                    </div>
                ) : null}
                <div className="river-alert-title">{title}</div>
                {description === null ? null : <div className="river-alert-description">{description}</div>}
            </div>
        </div>
    ) : null;
};

Alert.defaultProps = {
    description: null,
    type: 'default',
    closable: true,
};

export default Alert;
