import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Container from "../styles/Container";
import Navigation from "./navigation/Navigation";

/**
 * Handles the app routing of different pages
 */
const Routing = () => {
    return (
        <Router>
            <Navigation />
            <Container>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/:username' component={Profile}/>
                    <Route exact path='/:username/edit' component={EditProfile}/>
                </Switch>
            </Container>
        </Router>
    );
};

export default Routing;