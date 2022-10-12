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
    ];
    return (
        <div className="App">
            <Select options={option} onSelect={(e)=>{console.log(e)}}></Select>
        </div>
    );
}

export default App;
