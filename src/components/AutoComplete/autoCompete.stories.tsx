import React from 'react';
import AutoCompete from './autoComplete';
import {dataStructure} from './autoComplete';
import {ComponentMeta, ComponentStory} from '@storybook/react';

const AutoCompeteMeta: ComponentMeta<typeof AutoCompete> = {
    title: 'AutoCompete',
    component: AutoCompete,
};

export default AutoCompeteMeta;

const Template: ComponentStory<typeof AutoCompete> = args => <AutoCompete {...args}></AutoCompete>;

export const Default = Template.bind({});

Default.args = {
    data: [
        {
            label: '何江浩',
            value: 1,
        },
        {
            label: '王晓涵',
            value: 2,
        },
        {
            label: '杨可盈',
            value: 3,
        },
    ],
    fetchSuggestion: (query: string, data: Array<dataStructure>) => {
        return data.filter(item => {
            return item.label.includes(query);
        });
    },
};

Default.storyName = '默认AutoCompete';

// export const AutoCompeteType: ComponentStory<typeof AutoCompete> = () => (
//     <>
//         <AutoCompete type="default" title="默认类型的AutoCompete"></AutoCompete>
//         <AutoCompete type="success" title="成功类型的AutoCompete"></AutoCompete>
//         <AutoCompete type="danger" title="危险类型的AutoCompete"></AutoCompete>
//         <AutoCompete type="warning" title="警告类型的AutoCompete"></AutoCompete>

//         <style>
//             {`
//                 .river-AutoCompete{
//                     margin-bottom:30px
//                 }
//             `}
//         </style>
//     </>
// );

// AutoCompeteType.storyName = '不同类型的AutoCompete';
