import { combineReducers, createStore } from 'redux';
import counterReducer from './docs/counter.js';

const reducer = combineReducers({
    counter: counterReducer
})
const store = createStore(reducer);


export default store;