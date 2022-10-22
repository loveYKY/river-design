import React from 'react';
import Input from './input';
import Icon from '../Icon/icon';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {ComponentMeta, ComponentStory} from '@storybook/react';

const InputMeta: ComponentMeta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export default InputMeta;

const Template: ComponentStory<typeof Input> = args => <Input {...args}></Input>;

export const Default = Template.bind({});

Default.args = {
    placeholder: '默认的输入框',
    style: {
        width: '300px',
    },
};

Default.storyName = '默认输入框';

export const Disabled: ComponentStory<typeof Input> = () => (
    <>
        <Input style={{width: '300px'}} disabled placeholder="禁用输入框"></Input>
    </>
);
Disabled.storyName = '设置disabled可以禁用input输入框';

export const InputSize: ComponentStory<typeof Input> = () => (
    <>
        <Input style={{width: '300px',marginBottom:'30px'}} size="lg" placeholder="large"></Input>
        <Input style={{width: '300px',marginBottom:'30px'}} size="normal" placeholder="normal"></Input>
        <Input style={{width: '300px'}} size="sm" placeholder="small"></Input>
    </>
);
InputSize.storyName = '设置size属性可以调整输入框大小';

export const InputIcon: ComponentStory<typeof Input> = () => {
    const testIcon = () => {
        return <Icon icon={faSearch}></Icon>;
    };
    return <Input style={{width: '300px'}} placeholder="带icon的输入框" icon={testIcon()}></Input>;
};

InputIcon.storyName = '设置icon属性可以给输入框添加icon,支持ReactElement方式';

export const InputPrepend: ComponentStory<typeof Input> = () => {
    const prepend = ()=> {
        return (
            <span>https://</span>
        )
    }
    return (
        <div>
            <Input style={{width: '300px',marginBottom:'30px'}} placeholder="支持前缀字符串的输入框" prepend="https://"></Input>
            <Input style={{width: '300px'}} placeholder="支持前缀组件化的输入框" prepend={prepend()}></Input>
        </div>
    );
};

InputPrepend.storyName = '设置prepend属性可以给输入框添加前缀,支持ReactElement方式';

export const InputAppend: ComponentStory<typeof Input> = () => {
    const append = ()=> {
        return (
            <span>.com</span>
        )
    }
    return (
        <div>
            <Input style={{width: '300px',marginBottom:'30px'}} placeholder="支持后缀字符串的输入框" append=".com"></Input>
            <Input style={{width: '300px'}} placeholder="支持后缀组件化的输入框" append={append()}></Input>
        </div>
    );
};

InputAppend.storyName = '设置append属性可以给输入框添加后缀,支持ReactElement方式';
