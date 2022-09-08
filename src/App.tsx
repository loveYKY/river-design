import Alert from './components/Alert/alert';

const child = () => {
    return (
        <span>
            我是描述一段信息我是描述一段信息我是描述一段信息我是描述一段信息我是描述一段信息我是描述一段信息我是描述一段信息我是描述一段信息我是描述一段信息我是描述一段信息我是描述一段信息
        </span>
    );
};
function App() {
    return (
        <div className="App">
            <Alert
                title="hello world"
                onClose={() => {
                    console.log(1);
                }}></Alert>
            <Alert title="hello world" type="success" description={child()}></Alert>
            <Alert title='我很危险' type='danger'></Alert>
        </div>
    );
}

export default App;
