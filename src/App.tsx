import {useState} from 'react';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
function App() {
    const [activeNumber, setActive] = useState('1');

    return (
        <div className="App">
            <Alert title='hello' description="!23123123"></Alert>
        </div>
    );
}

export default App;
