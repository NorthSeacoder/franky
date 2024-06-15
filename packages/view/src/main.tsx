import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ConfigProvider, theme} from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#262626'
                }
            }}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
