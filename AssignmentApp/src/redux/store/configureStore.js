import { createStore, applyMiddleware } from './node_modules/redux';
import app from '../reducers';
import thunk from './node_modules/redux-thunk';

export default function configureStore() {
    let store = createStore(app, applyMiddleware(thunk))
    return store
}