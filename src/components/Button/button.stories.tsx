import React from 'react';
import Button from './button';

import {ComponentMeta, ComponentStory} from '@storybook/react';

const ButtonMeta: ComponentMeta<typeof Button> = {
    title: 'Button',
    component: Button,
};

export default ButtonMeta;

export const Default: ComponentStory<typeof Button> = () => {
    return (
        <>
            <Button btnType="default">Default Button</Button>
            <Button btnType="primary">Primary Button</Button>
            <Button btnType="danger">Danger Button</Button>
            <Button btnType="link">Link Button</Button>
        </>
    );
};

Default.storyName = '不同类型的按钮';

export const ButtonSize: ComponentStory<typeof Button> = () => {
    return (
        <>
            <Button size="lg">large Button</Button>
            <Button >normal Button</Button>
            <Button size="sm">small Button</Button>
        </>
    );
};

ButtonSize.storyName = '不同尺寸的按钮';
