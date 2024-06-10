// import {useState} from 'react';
// import {useWebviewPublicPath} from './hooks/use-webview-public-path';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import {vscode} from './utils/vscode';
import {useMount} from 'react-use';

import FrankyForm from './components/form';
import './App.css';

function App() {
    // const [count, setCount] = useState(0);

    // Webview 公共资源地址示例
    // const [reactLogoPath] = useWebviewPublicPath(reactLogo);
    // const [viteLogoPath] = useWebviewPublicPath(viteLogo);
    // const [dirpath, setDirpath] = useState('');
    useMount(async () => {
        const getTemplateOptions = await vscode.invoke({command: 'getTemplateOptions'});
        console.log('active: ', getTemplateOptions)
    });
    // function handleHowdyClick() {
    //     console.log('handleHowdyClick');
    //     vscode.invoke({command: 'hello', args: ['Hey there partner! 🤠']});
    // }

    return (
        <>
            <div className='card'>
                <FrankyForm />
            </div>

        </>
    );
}

export default App;
