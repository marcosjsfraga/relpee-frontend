import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Comments from './pages/Comments';
import Event from './pages/Event';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import Profile from './pages/Profile';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/comments" component={Comments} />
                <Route path="/event" component={Event} />
                <Route path="/" exact component={Login} />
                <Route path="/main" component={Main} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    );
}