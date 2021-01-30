import React from "react";
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';

import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' component={Home} />
                <Route path='/profile/edit' component={EditProfile}/>
                <Route path='/:username' component={Profile}/>
            </Switch>
        </Router>
    );
};

export default Routing;