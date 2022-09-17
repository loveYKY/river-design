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
    subcomponents: {SubMenu: SubMenu, Item: MenuItem},
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

export const MenuMode: ComponentStory<typeof Menu> = () => (
    <>
        <Menu mode="horizontal">
            <MenuItem index="1">选项一</MenuItem>
            <MenuItem index="2">选项二</MenuItem>
            <MenuItem index="3">选项三</MenuItem>
            <SubMenu title="下拉菜单" index="4">
                <MenuItem index="5">选项一</MenuItem>
                <MenuItem index="6">选项二</MenuItem>
            </SubMenu>
        </Menu>
        <Menu mode="vertical">
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
MenuMode.storyName = '通过设置mode属性让Menu菜单支持水平或垂直模式';

export const TriggerSubMenuAction: ComponentStory<typeof Menu> = () => (
    <>
        <Menu triggerSubMenuAction="click">
            <MenuItem index="1">选项一</MenuItem>
            <MenuItem index="2">选项二</MenuItem>
            <MenuItem index="3">选项三</MenuItem>
            <SubMenu title="click触发" index="4">
                <MenuItem index="5">选项一</MenuItem>
                <MenuItem index="6">选项二</MenuItem>
            </SubMenu>
        </Menu>
        <Menu triggerSubMenuAction="hover">
            <MenuItem index="1">选项一</MenuItem>
            <MenuItem index="2">选项二</MenuItem>
            <MenuItem index="3">选项三</MenuItem>
            <SubMenu title="hover触发" index="4">
                <MenuItem index="5">选项一</MenuItem>
                <MenuItem index="6">选项二</MenuItem>
            </SubMenu>
        </Menu>
    </>
);
TriggerSubMenuAction.storyName = '设置触发子菜单展开的方式,支持click和hover两种方式';

export const DefaultOpenSubMenus: ComponentStory<typeof Menu> = () => (
    <>
        <Menu defaultOpenSubMenus={['4']}>
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
DefaultOpenSubMenus.storyName = '默认展开的子菜单';

export const Disable: ComponentStory<typeof Menu> = () => (
    <>
        <Menu>
            <MenuItem index="1" disabled>选项一</MenuItem>
            <MenuItem index="2">选项二</MenuItem>
            <MenuItem index="3">选项三</MenuItem>
            <SubMenu title="下拉菜单" index="4" disabled>
                <MenuItem index="5">选项一</MenuItem>
                <MenuItem index="6">选项二</MenuItem>
            </SubMenu>
        </Menu>
    </>
);
Disable.storyName = '可以设置disabled属性禁用菜单';


