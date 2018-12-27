import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Board } from '../Board';
import { Login } from '../Login';
import { store } from '../../utils/store';


export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/board" component={Board} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    </Provider>
);