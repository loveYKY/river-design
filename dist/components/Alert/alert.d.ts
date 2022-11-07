import React from 'react';
export declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
declare type closeFuntion = () => void;
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
export declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
