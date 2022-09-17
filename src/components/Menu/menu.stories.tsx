import React from 'react';
import Menu from './menu';

import {ComponentMeta, ComponentStory} from '@storybook/react';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const MenuMeta: ComponentMeta<typeof Menu> = {
    title: 'Menu',
    component: Menu,
    argTypes: {
        onSelect: {
            control: {
                type: null,
            },
        },
    },
};

export default MenuMeta;

const DefaultMenu = (props: any) => {
    return (
        <Menu {...props}>
            <MenuItem index="1">选项一</MenuItem>
            <MenuItem index="2">选项二</MenuItem>
            <MenuItem index="3">选项三</MenuItem>
            <SubMenu title="下拉菜单" index="4">
                <MenuItem index="5">选项一</MenuItem>
                <MenuItem index="6">选项二</MenuItem>
            </SubMenu>
        </Menu>
    );
};

const Template: ComponentStory<typeof Menu> = args => <DefaultMenu {...args}></DefaultMenu>;

export const Default = Template.bind({});

Default.storyName = '默认Menu';

export const DefaultIndex: ComponentStory<typeof Menu> = () => (
    <>
        <Menu selectedIndex="1">
            <MenuItem index="1">选项一</MenuItem>
            <MenuItem index="2">选项二</MenuItem>
            <MenuItem index="3">选项三</MenuItem>
            <SubMenu title="下拉菜单" index="4">
                <MenuItem index="5">选项一</MenuItem>
                <MenuItem index="6">选项二</MenuItem>
            </SubMenu>
        </Menu>
    </>
);
DefaultIndex.storyName = '通过设置selectedIndex实现菜单默认选中';
