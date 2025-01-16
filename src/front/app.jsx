import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Private from './Private';

function app() {
    return (
        <Router>
            <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/private" component={Private} />
                <Route path="/" component={Login} />
            </Switch>
        </Router>
    );
}

export default app;