import {createBrowserHistory} from "history";
import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from "connected-react-router";
import createRootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga';
import {saga} from "../saga";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [routerMiddleware(history), sagaMiddleware];

export default function configureStore(preloadedState?: any) {
    const composeEnhancer: typeof compose =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancer(applyMiddleware(...middleware))
    );

    sagaMiddleware.run(saga);

    return store;

}
