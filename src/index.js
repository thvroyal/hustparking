import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import store from './store/index'

import './assets/scss/sb-admin-2.scss'
import './assets/fonts/awesome/css/awesomefont.min.css'

require('dotenv').config();

ReactDOM.render(
    <Provider store = {store} >
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
