import Input from './components/Input/input';
import Select from './components/Select/select';
function App() {
    let option = [
        {
            label: '123',
            value: 0,
        },
        {
            label: '456',
            value: 1,
            disabled: true,
        },
        {
            label: '789',
            value: 2,
        },
        {
            label: '111',
            value: 3,
        },
        {
            label: '111',
            value: 4,
        },
        {
            label: '111',
            value: 5,
        },
        {
            label: '111',
            value: 6,
        },
    ];
    return (
        <div className="App">
            <Select
                multipleHidden={false}
                Search
                options={option}
                mode={'Multiple'}
                onSelect={(a,b) => {
                    console.log(a,b);
                }}
                onVisibleChange={e => {
                    console.log(e);
                }}></Select>
        </div>
    );
}

export default App;
