import React, {useState} from 'react';
import Tabs from './tabs';

import {ComponentMeta, ComponentStory} from '@storybook/react';
import TabItem from './tabItem';
import Button from '../Button/button';

const MenuMeta: ComponentMeta<typeof Tabs> = {
    title: 'Tabs',
    component: Tabs,
    subcomponents: {TabItem: TabItem},
};

export default MenuMeta;

const DefaultTab = (props: any) => {
    return (
        <Tabs {...props}>
            <TabItem index="1" label="选项一">
                内容一
            </TabItem>
            <TabItem index="2" label="选项二">
                内容二
            </TabItem>
            <TabItem index="3" label="选项三">
                内容三
            </TabItem>
        </Tabs>
    );
};

const Template: ComponentStory<typeof Tabs> = args => <DefaultTab {...args}></DefaultTab>;

export const Default = Template.bind({});

Default.storyName = '默认Tabs';

export const DefaultIndex: ComponentStory<typeof Tabs> = () => (
    <>
        <Tabs activeKey="1">
            <TabItem index="1" label="选项一">
                内容一
            </TabItem>
            <TabItem index="2" label="选项二">
                内容二
            </TabItem>
            <TabItem index="3" label="选项三">
                内容三
            </TabItem>
        </Tabs>
    </>
);
DefaultIndex.storyName = '通过设置activeKey实现tab默认选中';

export const Disabled: ComponentStory<typeof Tabs> = () => (
    <>
        <Tabs activeKey="1">
            <TabItem index="1" label="选项一">
                内容一
            </TabItem>
            <TabItem index="2" label="选项二" disabled>
                内容二
            </TabItem>
            <TabItem index="3" label="选项三">
                内容三
            </TabItem>
        </Tabs>
    </>
);
Disabled.storyName = '通过设置disabled实现tab禁用';

export const Type: ComponentStory<typeof Tabs> = () => {
    return (
        <div>
            <Tabs type="card" activeKey='1'>
                <TabItem index="1" label="选项一">
                    内容一
                </TabItem>
                <TabItem index="2" label="选项二">
                    内容二
                </TabItem>
                <TabItem index="3" label="选项三">
                    内容三
                </TabItem>
            </Tabs>
        </div>
    );
};
Type.storyName = '支持卡片模式的tab';

export const changeFn: ComponentStory<typeof Tabs> = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState('1');

    const onChange = (index: string) => {
        setActive(index);
    };

    return (
        <div>
            <Button
                onClick={() => {
                    setActive('3');
                }}>
                点击选中选项三
            </Button>
            <Tabs activeKey={active} onChange={onChange}>
                <TabItem index="1" label="选项一">
                    内容一
                </TabItem>
                <TabItem index="2" label="选项二">
                    内容二
                </TabItem>
                <TabItem index="3" label="选项三">
                    内容三
                </TabItem>
            </Tabs>
        </div>
    );
};
changeFn.storyName = 'activekey的值改变会触发onChange事件';

export const selectFn: ComponentStory<typeof Tabs> = () => {
    return (
        <div>
            <Tabs
                onSelect={e => {
                    console.log(e);
                }}>
                <TabItem index="1" label="选项一">
                    内容一
                </TabItem>
                <TabItem index="2" label="选项二">
                    内容二
                </TabItem>
                <TabItem index="3" label="选项三">
                    内容三
                </TabItem>
            </Tabs>
        </div>
    );
};
selectFn.storyName = '点击选中tab触发的onSelect回调';
