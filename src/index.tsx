import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import configureStore, {history} from "./infra/store/configureStore";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
  document.getElementById('root')
);
