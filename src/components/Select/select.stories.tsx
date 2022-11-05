import React from 'react';
import Select from './select';
import {ComponentMeta, ComponentStory} from '@storybook/react';

const SelectMeta: ComponentMeta<typeof Select> = {
    title: 'Select',
    component: Select,
};
export default SelectMeta;
const Template: ComponentStory<typeof Select> = args => <Select {...args}></Select>;

export const Default = Template.bind({});

Default.args = {
    style: {
        width: '240px',
    },
};

Default.storyName = '默认的select';

export const optionsList: ComponentStory<typeof Select> = () => {
    const options = [
        {
            label: 'hejianghao',
            value: 1,
        },
        {
            label: 'zhangsan',
            value: 2,
        },
        {
            label: 'lisi',
            value: 3,
        },
        {
            label: 'xixi',
            value: 4,
        },
    ];

    return <Select options={options}></Select>;
};

optionsList.storyName = '通过设置options给select绑定数据';

export const SelectMode: ComponentStory<typeof Select> = () => {
    const options = [
        {
            label: 'hejianghao',
            value: 1,
        },
        {
            label: 'zhangsan',
            value: 2,
        },
        {
            label: 'lisi',
            value: 3,
        },
        {
            label: 'xixi',
            value: 4,
        },
    ];
    let defaultSelect = [
        {
            label: 'hejianghao',
            value: 1,
        },
        {
            label: 'xixi',
            value: 4,
        },
    ];

    return <Select defaultSelect={defaultSelect} options={options} mode={'Multiple'}></Select>;
};

SelectMode.storyName = '支持多选模式';

export const multipleHidden: ComponentStory<typeof Select> = () => {
    const options = [
        {
            label: 'hejianghao',
            value: 1,
        },
        {
            label: 'zhangsan',
            value: 2,
        },
        {
            label: 'lisi',
            value: 3,
        },
        {
            label: 'xixi',
            value: 4,
        },
    ];

    let defaultSelect = [
        {
            label: 'hejianghao',
            value: 1,
        },
        {
            label: 'zhangsan',
            value: 2,
        },
    ];

    return <Select defaultSelect={defaultSelect} options={options} multipleHidden mode={'Multiple'}></Select>;
};

multipleHidden.storyName = '设置multipleHidden隐藏多选的选项';

export const optionLabelProp: ComponentStory<typeof Select> = () => {
    const options = [
        {
            name: '何江浩',
            label: 'hejianghao',
            value: 1,
        },
        {
            name: '张三',
            label: 'zhangsan',
            value: 2,
        },
        {
            name: '李四',
            label: 'lisi',
            value: 3,
        },
    ];

    let defaultSelect = [
        {
            name: '何江浩',
            label: 'hejianghao',
            value: 1,
        },
    ];

    return <Select optionLabelProp="name" defaultSelect={defaultSelect} options={options}></Select>;
};

optionLabelProp.storyName = '设置optionLabelProp可以选择输入框中展示的属性';

export const onSelect: ComponentStory<typeof Select> = () => {
    const options = [
        {
            name: '何江浩',
            label: 'hejianghao',
            value: 1,
        },
        {
            name: '张三',
            label: 'zhangsan',
            value: 2,
        },
        {
            name: '李四',
            label: 'lisi',
            value: 3,
        },
    ];

    return (
        <Select
            options={options}
            onSelect={(a, b) => {
                console.log(a,b)
            }}></Select>
    );
};

onSelect.storyName = '当选择的数据发生变化时，会触发onSelect事件';

export const onVisibleChange: ComponentStory<typeof Select> = () => {
    const options = [
        {
            name: '何江浩',
            label: 'hejianghao',
            value: 1,
        },
        {
            name: '张三',
            label: 'zhangsan',
            value: 2,
        },
        {
            name: '李四',
            label: 'lisi',
            value: 3,
        },
    ];

    return (
        <Select
            options={options}
            onVisibleChange={a => {
                alert(a);
            }}></Select>
    );
};

onVisibleChange.storyName = '当下拉框状态消失或出现时，会触发onVisibleChange事件';

export const Search: ComponentStory<typeof Select> = () => {
    const options = [
        {
            name: '何江浩',
            label: 'hejianghao',
            value: 1,
        },
        {
            name: '张三',
            label: 'zhangsan',
            value: 2,
        },
        {
            name: '李四',
            label: 'lisi',
            value: 3,
        },
        {
            name: '赵六',
            label: 'zhaoliu',
            value: 4,
        },
        {
            name: '刘七',
            label: 'liuqi',
            value: 5,
        },
    ];

    return (
        <div>
            <Select options={options} Search mode="Multiple"></Select>
        </div>
    );
};

Search.storyName = 'select支持搜索功能';

export const disabled: ComponentStory<typeof Select> = () => {

    return (
        <div>
            <Select disabled></Select>
        </div>
    );
};

disabled.storyName = '禁用select';