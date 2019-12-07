import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { myStore } from './stores/myStore'

const MyStore = new myStore()

const stores = {
    MyStore
}
ReactDOM.render(<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();


