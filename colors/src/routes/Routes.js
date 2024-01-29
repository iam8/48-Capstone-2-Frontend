import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";


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
 *  - /profile
 *  - /signup
 *  - /login
 *  - /
 *
 * Non-matching URLs will redirect to / (home).
 */
function Routes({login, signup}) {

    return (
        <Switch>
            <Route path="/colors/:hex">
                <div>Colors page (by hex)</div>
            </Route>

            <Route path="/schemes/:id">
                <div>
                    Schemes page (by ID)
                </div>
            </Route>

            <Route path="/collections/:id">
                <ProtectedRoute>
                    <div>Collections page (by ID)</div>
                </ProtectedRoute>
            </Route>

            <Route path="/collections">
                <ProtectedRoute>
                    <div>All collections page</div>
                </ProtectedRoute>
            </Route>

            <Route path="/profile">
                <ProtectedRoute>
                    <div>Profile edit page</div>
                </ProtectedRoute>
            </Route>

            <Route path="/signup">
                <SignupForm signup={signup}/>
            </Route>

            <Route path="/login">
                <LoginForm login={login}/>
            </Route>

            <Route path="/">
                <div>Homepage</div>
            </Route>

            <Redirect to="/" />
        </Switch>
    )
}


export default Routes;
