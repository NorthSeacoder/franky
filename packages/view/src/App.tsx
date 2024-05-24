// import {useState} from 'react';
// import {useWebviewPublicPath} from './hooks/use-webview-public-path';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import {vscode} from './utils/vscode';
import {VSCodeButton} from '@vscode/webview-ui-toolkit/react';
// import {useMount} from 'react-use';

import FrankyForm from './components/form';
import './App.css';

function App() {
    // const [count, setCount] = useState(0);

    // Webview 公共资源地址示例
    // const [reactLogoPath] = useWebviewPublicPath(reactLogo);
    // const [viteLogoPath] = useWebviewPublicPath(viteLogo);
    // const [dirpath, setDirpath] = useState('');
    // useMount(async () => {
    //     const currentPath = await vscode.invoke({command: 'getCurrentPath'});
    //     // setDirpath(currentPath);
    //     // console.log('active: ', active)
    // });
    // function handleHowdyClick() {
    //     console.log('handleHowdyClick');
    //     vscode.invoke({command: 'hello', args: ['Hey there partner! 🤠']});
    // }

    return (
        <>
            <div className='card'>
                <FrankyForm configs={[]} />
            </div>

            {/* <div className='example-block'>
                <VSCodeButton onClick={handleHowdyClick}>Howdy!</VSCodeButton>
            </div> */}
        </>
    );
}

export default App;
