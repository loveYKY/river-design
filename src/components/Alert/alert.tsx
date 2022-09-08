import React from 'react';
import classNames from 'classnames';

export type AlertType = 'success' | 'default' | 'danger' | 'warning';

type closeFuntion = () => void;

export interface BaseAlertProps {
    className?: string;
    title: string;
    description?: string | React.ReactNode | null;
    type?: AlertType;
    onClose?: closeFuntion;
    closable?: boolean;
}

const Alert: React.FC<BaseAlertProps> = props => {
    const {className, title, description, type, onClose, closable} = props;
    const classes = classNames('alert', className, {
        [`alert-${type}`]: type,
    });

    return (
        <div className={classes}>
            <div className="alert-title">{title}</div>
            {description === null ? null : <div className="alert-description">{description}</div>}
        </div>
    );
};

Alert.defaultProps = {
    description: null,
    type: 'default',
};


export default Alert