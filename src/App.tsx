import {useState} from 'react';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';

function App() {
    const [activeNumber, setActive] = useState('1');

    const test = () => {
        return <div>自定义样式</div>;
    };

    return (
        <div className="App">
            <button
                onClick={() => {
                    setActive('1');
                }}>
                click me
            </button>
            <button
                onClick={() => {
                    setActive('2');
                }}>
                click me
            </button>
            <button
                onClick={() => {
                    setActive('3');
                }}>
                click me
            </button>
            <Tabs
                activeKey={activeNumber}
                onChange={index => {
                    setActive(index)
                }}
                onSelect={index => {
                    setActive(index)
                }}
                type="card">
                <TabItem index="1" label={test()}>
                    我是tab1
                </TabItem>
                <TabItem index="2" label="tab2">
                    我是tab2
                </TabItem>
                <TabItem index="3" label="tab3">
                    我是tab3
                </TabItem>
            </Tabs>
        </div>
    );
}

export default App;
