import React, {useEffect, useRef, useState} from 'react';
import Input from '../Input/input';
import Select from '../Select/select';
import Button from '../Button/button';
import FormItem from './formItem';
import Form, {IFormRef} from './form';
import {ComponentMeta, ComponentStory} from '@storybook/react';

const FormMeta: ComponentMeta<typeof Form> = {
    title: 'Form',
    component: Form,
    subcomponents: {FormItem: FormItem},
    decorators: [
        Story => (
            <div style={{width: '550px', height: '700px'}}>
                <Story></Story>
            </div>
        ),
    ],
};

export default FormMeta;

export const BaseForm = () => {
    const options = [
        {
            label: '广州市',
            value: 'GZ',
        },
        {
            label: '其他',
            value: 'other',
        },
    ];
    return (
        <>
            <Form>
                <FormItem label="用户名" name="username">
                    <Input placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem label="密码" name="password">
                    <Input placeholder="请输入密码" type="password"></Input>
                </FormItem>
                <FormItem
                    label="所属地"
                    name="position"
                    valuePropName="defaultSelect"
                    trigger="onSelect"
                    getValueFromEvent={args => args[1]}>
                    <Select options={options}></Select>
                </FormItem>
            </Form>
        </>
    );
};
BaseForm.storyName = '基础表单，通过设置FormItem的trigger、valuePropName、getValueFromEvent完成表单store数据更新';

export const initForm = () => {
    const options = [
        {
            label: '广州市',
            value: 'GZ',
        },
        {
            label: '其他',
            value: 'other',
        },
    ];
    const initialValue = {
        username: 'hejianghao',
        password: '123456',
        position: [
            {
                label: '广州市',
                value: 'GZ',
            },
        ],
    };
    return (
        <>
            <Form initialValue={initialValue}>
                <FormItem label="用户名" name="username">
                    <Input placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem label="密码" name="password">
                    <Input placeholder="请输入密码" type="password"></Input>
                </FormItem>
                <FormItem
                    label="所属地"
                    name="position"
                    valuePropName="defaultSelect"
                    trigger="onSelect"
                    getValueFromEvent={args => args[1]}>
                    <Select options={options}></Select>
                </FormItem>
            </Form>
        </>
    );
};
initForm.storyName = '使用initialValue字段完成表单数据初始化';

export const validateForm = () => {
    const options = [
        {
            label: '广州市',
            value: 'GZ',
        },
        {
            label: '其他',
            value: 'other',
        },
    ];
    return (
        <>
            <Form>
                <FormItem
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                        },
                    ]}>
                    <Input placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input placeholder="请输入密码" type="password"></Input>
                </FormItem>
                <FormItem
                    label="所属地"
                    name="position"
                    valuePropName="defaultSelect"
                    trigger="onSelect"
                    getValueFromEvent={args => args[1]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Select options={options} placeholder="请选择所在地"></Select>
                </FormItem>
            </Form>
        </>
    );
};
validateForm.storyName = '通过rules字段完成表单校验';

export const CustomValidate = () => {
    return (
        <>
            <Form>
                <FormItem
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                        },
                    ]}>
                    <Input placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input placeholder="请输入密码" type="password"></Input>
                </FormItem>
                <FormItem
                    label="确认密码"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                        },
                        ({getFieldValue}) => ({
                            asyncValidator(rule, value) {
                                if (value === getFieldValue('password')) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject('两次输入的密码不一样');
                                }
                            },
                        }),
                    ]}>
                    <Input placeholder="请确认密码" type="password"></Input>
                </FormItem>
                <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                    <Button type="submit" btnType="primary">
                        提交
                    </Button>
                </div>
            </Form>
        </>
    );
};
CustomValidate.storyName = '自定义表单校验';

export const DynamicValidate = () => {
    const formRef = useRef<IFormRef>(null);

    const handleValidate = async () => {
        console.log(formRef.current);
        let res = await formRef.current?.validate([]);
        console.log(res);
    };
    const clearValidate = () => {
        formRef.current?.clearValidate([]);
    };
    return (
        <>
            <Form ref={formRef}>
                <FormItem
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                        },
                    ]}>
                    <Input placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input placeholder="请输入密码" type="password"></Input>
                </FormItem>
                <FormItem
                    label="确认密码"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                        },
                        ({getFieldValue}) => ({
                            asyncValidator(rule, value) {
                                console.log('the value of first password', getFieldValue('password'));
                                console.log(value);
                                if (value === getFieldValue('password')) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject('两次输入的密码不一样');
                                }
                            },
                        }),
                    ]}>
                    <Input placeholder="请确认密码" type="password"></Input>
                </FormItem>
            </Form>
            <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                <Button onClick={handleValidate}>校验表单</Button>
                <Button onClick={clearValidate}>清楚校验</Button>
            </div>
        </>
    );
};
DynamicValidate.storyName = '动态表单校验';
