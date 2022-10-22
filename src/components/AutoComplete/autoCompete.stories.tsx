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

const data = [
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
];

Default.args = {
    placeholder: '请输入人名拼音',
    style: {
        width: '300px',
    },
    fetchSuggestion: (query: string) => {
        return data.filter(item => {
            return item.label.includes(query);
        });
    },
};

Default.storyName = '默认AutoCompete';

export const fetchSuggestion: ComponentStory<typeof AutoCompete> = () => {
    const data = [
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

    const fetchSuggestion = (query: string) => {
        return data.filter(item => {
            return item.name?.includes(query);
        });
    };
    return <AutoCompete placeholder="请搜索中文名" fetchSuggestion={fetchSuggestion}></AutoCompete>;
};

fetchSuggestion.storyName = '支持自定义搜索过滤方式';

export const renderOption: ComponentStory<typeof AutoCompete> = () => {
    interface userName {
        name: string;
    }
    const data = [
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
    const fetchSuggestion = (query: string) => {
        return data.filter(item => {
            return item.label.includes(query);
        });
    };

    const renderOption = (data: dataStructure) => {
        const temp = data as dataStructure<userName>;
        return (
            <span>
                英文名:{temp.label} 值:{temp.value}
            </span>
        );
    };
    return (
        <AutoCompete
            placeholder="请搜索英文名"
            fetchSuggestion={fetchSuggestion}
            renderOption={renderOption}></AutoCompete>
    );
};

renderOption.storyName = '支持自定义展示模板';

export const asyncFetch: ComponentStory<typeof AutoCompete> = () => {
    const handleFetch = async (query: string) => {
        const res = await fetch(`https://api.github.com/search/users?q=${query}`);
        const formatItems = res.json().then(({items}) => {
            return items?.slice(0, 20).map((item: {login: any; id: any}) => {
                return {
                    label: item.login,
                    value: item.id,
                    ...item,
                };
            });
        });
        return formatItems;
    };

    interface GitHubUserProps {
        url: string;
    }

    const renderOption = (data: dataStructure) => {
        const temp = data as dataStructure<GitHubUserProps>
        return (
            <span>
                用户名:{temp.label} url{temp.url}
            </span>
        );
    };

    return (
        <AutoCompete
            placeholder="请搜索github用户"
            renderOption={renderOption}
            fetchSuggestion={handleFetch}></AutoCompete>
    );
};

asyncFetch.storyName = '支持异步请求过滤';
