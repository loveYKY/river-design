import React from 'react';
import {ComponentMeta} from '@storybook/react';
import Icon from './icon';
import Button from '../Button/button';

export default {
    title: 'Icon',
    id: 'Icon',
    component: Icon,
} as ComponentMeta<typeof Icon>;
export const ADefaultIcons = () => (
    <>
        <Button size="lg" btnType="primary">
            <Icon icon="check" /> check{' '}
        </Button>
    </>
);
ADefaultIcons.storyName = '默认图标';
