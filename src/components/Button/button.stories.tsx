import React from 'react';
import Button from './button';

import {ComponentMeta, ComponentStory} from '@storybook/react';

const ButtonMeta: ComponentMeta<typeof Button> = {
    title: 'Button',
    component: Button,
};

export default ButtonMeta;

const Template: ComponentStory<typeof Button> = args => <Button {...args}></Button>;

export const Default = Template.bind({});

Default.args = {
    children: 'Default Button',
};

Default.storyName = '默认按钮';

export const ButtonType: ComponentStory<typeof Button> = () => (
    <>
        <Button btnType="default" style={{marginRight: '20px'}}>
            Default Button
        </Button>
        <Button btnType="primary" style={{marginRight: '20px'}}>
            Primary Button
        </Button>
        <Button btnType="danger" style={{marginRight: '20px'}}>
            {' '}
            Danger Button
        </Button>
        <Button btnType="link" href="http://www.baidu.com">
            Link Button
        </Button>
    </>
);

ButtonType.storyName = '不同类型的按钮';

export const ButtonSize: ComponentStory<typeof Button> = () => (
    <>
        <Button size="lg" style={{marginRight:'20px'}}>large Button</Button>
        <Button style={{marginRight:'20px'}}>normal Button</Button>
        <Button size="sm">small Button</Button>
    </>
);

ButtonSize.storyName = '不同尺寸的按钮';

export const DisableButton: ComponentStory<typeof Button> = () => (
    <>
        <Button disabled btnType="primary">
            disabled
        </Button>
    </>
);

DisableButton.storyName = '按钮禁用';
