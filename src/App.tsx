import AutoCompete from './components/AutoComplete/autoComplete';
import {dataStructure} from './components/AutoComplete/autoComplete';
function App() {
    const data: Array<dataStructure> = [
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
    ];

    const fetchSuggestion = (query: string, data: Array<dataStructure>) => {
        return data.filter(item => {
            return item.label.includes(query);
        });
    };
    return (
        <div className="App">
            <AutoCompete data={data} fetchSuggestion={fetchSuggestion} onSelect={(item)=>{console.log(item)}}></AutoCompete>
        </div>
    );
}

export default App;
