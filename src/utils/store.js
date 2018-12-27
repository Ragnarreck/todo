import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from './reducers';

export const store = createStore(combineReducers(rootReducer), composeWithDevTools(applyMiddleware(thunk)));