import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { favoritesStore } from './stores/favoritesStore'
import 'bootstrap/dist/css/bootstrap.min.css'

const FavoritesStore = new favoritesStore()

const stores = {
    FavoritesStore
}
ReactDOM.render(<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();


