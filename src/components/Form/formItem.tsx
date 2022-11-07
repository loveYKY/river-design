import React, {ReactNode, useContext, useEffect} from 'react';
import classNames from 'classnames';
import {FormContext} from './form';
import {RuleItem} from 'async-validator';
import {CustomRule} from '../../hooks/useStore';
export interface FromItemPorps {
    /** formItem 唯一的key */
    name: string;
    /** label */
    label?: string;
    /** 校验规则 */
    rules?: CustomRule[];
    /** 校验触发方式 */
    validateTrigger?: string;
    /** label位置 */
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
    const {name, label, valuePropName, trigger, validateTrigger, rules, getValueFromEvent, labelPosition, children} =
        props;

    const {dispatch, validateField, fields, initialValue} =
        useContext(FormContext);

    //根据formitem props初始化fields
    useEffect(() => {
        const init_value = (initialValue && initialValue[name]) || null;
        dispatch({
            type: 'addField',
            name: name,
            value: {label, name, value: init_value, rules: rules || [], isValid: true, errors: []},
        });
    }, []);

    //获取store对应的value
    const fieldState = fields[name];
    const value = fieldState && fieldState.value;

    //获取store对应的error
    const errors = fieldState && fieldState.errors;
    //是否必填
    const isRequired = rules?.some(rule => {
        if (typeof rule !== 'function') {
            return rule.required;
        }
    });
    //是否有错
    const hasError = errors && errors.length > 0;

    //声明更新Store值的函数
    const onValueUpdate = (...args: any) => {
        const value = getValueFromEvent && getValueFromEvent(args);
        dispatch({type: 'updateField', name: name, value: value});
    };

    //表单校验函数
    const onValidate = async () => {
        await validateField(name);
    };

    //构建子组件props
    const controlProps: Record<string, any> = {};
    //子组件默认值
    controlProps[valuePropName!] = value;
    controlProps[trigger!] = onValueUpdate;

    //是否存在表单校验
    if (rules) {
        controlProps[validateTrigger!] = onValidate;
    }

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

    //克隆子组件，传递自定义prop
    const returnChildNode = React.cloneElement(child, {
        ...child.props,
        ...controlProps,
    });

    const rowClass = classNames('river-row', {
        'river-row-no-label': !label,
    });

    const labelClass = classNames('river-form-item-label', {
        [`river-form-item-label-${labelPosition}`]: labelPosition,
        'river-form-item-required': isRequired,
    });

    const RowItemClass = classNames({
        'river-form-item-errors': hasError,
    });
    return (
        <div className={rowClass}>
            {label && (
                <div className={labelClass}>
                    <label title={label}>{label}</label>
                </div>
            )}
            <div className="river-form-item">
                <div className={RowItemClass}>{returnChildNode}</div>
                {hasError && errors[0].message != undefined && (
                    <div className="river-form-item-explain">
                        <span>{errors[0].message}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

FormItem.defaultProps = {
    labelPosition: 'right',
    valuePropName: 'value',
    trigger: 'onChange',
    validateTrigger: 'onBlur',
    getValueFromEvent: args => args[0].target.value,
};
export default FormItem;
