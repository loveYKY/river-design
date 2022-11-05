import React, {useEffect} from 'react';
import Input from '../Input/input';
import Select from '../Select/select';
import Button from '../Button/button';
import FormItem from './formItem';
import Form from './form';
import useStore from '../../hooks/useStore';
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
    const {fields, formState} = useStore();

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
                    label="测试"
                    name="test"
                    valuePropName="defaultSelect"
                    trigger="onSelect"
                    getValueFromEvent={args => args[1]}>
                    <Select options={options}></Select>
                </FormItem>
            </Form>
        </>
    );
};
