import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import UserAuthForm from "../auth/UserAuthForm";
import { SIGNUP_FIELDS, LOGIN_FIELDS } from "../auth/formFieldsInfo";
import useQuery from "../hooks/useQuery";


/**
 * All routes for Colors website.
 *
 * Props:
 *  - login(): log in an existing user; passed by parent
 *  - signup(): register a new user; passed by parent
 *
 * Route list:
 *  - /collections/:id
 *  - /collections
 *  - /colors
 *  - /schemes
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

            <Route exact path="/colors/?hex=ffffff&rgb=255,255,255">
                <div>Search for a color here!</div>
            </Route>

            <Route path="/schemes/?param1=111&param2=222&param3=333">
                <div>Search for a scheme here!</div>
            </Route>

            <Route path="/profile">
                <ProtectedRoute>
                    <div>Profile edit page</div>
                </ProtectedRoute>
            </Route>

            <Route path="/signup">
                <UserAuthForm title={"Sign In"} fieldInfo={SIGNUP_FIELDS} action={signup}/>
            </Route>

            <Route path="/login">
                <UserAuthForm title={"Log In"} fieldInfo={LOGIN_FIELDS} action={login}/>
            </Route>

            <Route path="/">
                <div>Homepage</div>
            </Route>

            <Redirect to="/" />
        </Switch>
    )
}


export default Routes;
