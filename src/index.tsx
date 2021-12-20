import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import {Provider} from 'react-redux';
import {store} from './store/store';
import AppWithSelector from './AppWtihSelector';

ReactDOM.render(
    <Provider store={store}>
    <AppWithSelector/>
    </Provider>,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
