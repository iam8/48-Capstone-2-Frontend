import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";


/**
 * All routes for Colors website.
 *
 * Props:
 *  - login(): log in an existing user; passed by parent
 *  - signup(): register a new user; passed by parent
 *
 * Route list:
 *  - /colors/:hex
 *  - /schemes/:id
 *  - /collections/:id
 *  - /collections
 *  - /signup
 *  - /login
 *  - /profile
 *  - /
 *
 * Non-matching URLs will redirect to / (home).
 */
function Routes({login, signup}) {

    return (
        <Switch>

            <Redirect to="/" />
        </Switch>
    )
}


export default Routes;
