import React, {ReactNode, useContext, useEffect} from 'react';
import classNames from 'classnames';
import {FormContext} from './form';
export interface FromItemPorps {
    name: string;
    label?: string;
    labelPosition?: 'left' | 'center' | 'right';
    /** value的属性名称 */
    valuePropName?: string;
    /** 更新值的回调属性名称 */
    trigger?: string;
    /** 怎么样从事件对象(e)里面获取真正的值 */
    getValueFromEvent?: (...args: any) => any;
    children?: ReactNode;
}

export const FormItem: React.FC<FromItemPorps> = props => {
    const {name, label, valuePropName, trigger, getValueFromEvent, labelPosition, children} = props;

    const {dispatch, fields} = useContext(FormContext);

    useEffect(() => {
        dispatch({
            type: 'addField',
            name: name,
            value: {label, name, value: null},
        });
    }, []);

    //获取store对应的value
    const fieldState = fields[name];
    const value = fieldState && fieldState.value;

    const onValueUpdate = (...args: any) => {
        const value = getValueFromEvent && getValueFromEvent(args);
        console.log('new value', value);
        dispatch({type: 'updateField', name: name, value: value});
    };
    //构建子组件props
    const controlProps: Record<string, any> = {};
    controlProps[valuePropName!] = value;
    controlProps[trigger!] = onValueUpdate;

    //获取children数组的第一个元素
    const childList = React.Children.toArray(children);

    //没有子组件
    if (childList.length === 0) {
        console.error('缺少子组件');
    }
    //子组件不唯一
    if (childList.length > 1) {
        console.warn('子组件大于一个');
    }
    //子组件不是ReactElement
    if (!React.isValidElement(childList[0])) {
        console.error('不是ReactElement的子组件');
    }

    const child = childList[0] as React.ReactElement;

    const returnChildNode = React.cloneElement(child, {
        ...child.props,
        ...controlProps,
    });

    const rowClass = classNames('river-row', {
        'river-row-no-label': !label,
    });

    const labelClass = classNames('river-form-item-label', {
        [`river-form-item-label-${labelPosition}`]: labelPosition,
    });
    return (
        <div className={rowClass}>
            {label && (
                <div className={labelClass}>
                    <label title={label}>{label}</label>
                </div>
            )}
            <div className="river-form-item">{returnChildNode}</div>
        </div>
    );
};

FormItem.defaultProps = {
    labelPosition: 'right',
    valuePropName: 'value',
    trigger: 'onChange',
    getValueFromEvent: (args) => args[0].target.value,
};
export default FormItem;
