import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
function App() {
    return (
        <div className="App">
            <Menu
                onSelect={e => {
                    console.log(e);
                }}
                mode="vertical"
                defaultIndex="1"
                defaultOpenSubMenus={['4']}
                >
                <SubMenu title="dropdown" index="4">
                    <MenuItem index="5">我是子列表</MenuItem>
                    <MenuItem index="6">我是子列表</MenuItem>
                </SubMenu>
                <MenuItem index="1">我是第一条</MenuItem>
                <MenuItem index="2">我是第二条</MenuItem>
                <MenuItem index="3" disabled>
                    我是第三条
                </MenuItem>
            </Menu>
        </div>
    );
}

export default App;
