import React from 'react';
import Alert from './alert';

import {ComponentMeta, ComponentStory} from '@storybook/react';

const AlertMeta: ComponentMeta<typeof Alert> = {
    title: 'Alert',
    component: Alert,
    argTypes: {
        onClose: {
            control: {
                type: null,
            },
        },
    },
};

export default AlertMeta;

const Template: ComponentStory<typeof Alert> = args => <Alert {...args}></Alert>;

export const Default = Template.bind({});

Default.args = {
    title: '我是标题',
};

Default.storyName = '默认alert';

export const AlertType: ComponentStory<typeof Alert> = () => (
    <>
        <Alert type="default" title="默认类型的alert"></Alert>
        <Alert type="success" title="成功类型的alert"></Alert>
        <Alert type="danger" title="危险类型的alert"></Alert>
        <Alert type="warning" title="警告类型的alert"></Alert>

        <style>
            {`
                .river-alert{
                    margin-bottom:30px
                }
            `}
        </style>
    </>
);

AlertType.storyName = '不同类型的alert';

export const Description: ComponentStory<typeof Alert> = () => {
    const demo = () => {
        return <span>我是描述</span>;
    };

    return (
        <div>
            <Alert title="我是标题" description="我是描述"></Alert>
            <Alert title="我是标题" description={demo()}></Alert>
        </div>
    );
};

Description.storyName = 'description属性支持string类型和ReactElement类型';

export const CloseAble: ComponentStory<typeof Alert> = () => (
    <>
        <Alert title="我是标题" closable={false}></Alert>
    </>
);

CloseAble.storyName = '设置closable属性可以隐藏关闭icon';
