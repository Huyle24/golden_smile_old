import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from '../reducers';
import rootEpic from '../epics';
import { composeWithDevTools } from 'redux-devtools-extension';
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();
const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(epicMiddleware))
);
epicMiddleware.run(rootEpic);
export default store;
