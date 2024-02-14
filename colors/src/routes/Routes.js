import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import UserAuthForm from "../auth/UserAuthForm";
import EditProfileForm from "../profile/EditProfileForm";
import { SIGNUP_FIELDS, LOGIN_FIELDS } from "../auth/formFieldsInfo";
import useQuery from "../hooks/useQuery";
import SearchBar from "../shared/SearchBar";


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
function Routes({login, signup, searchColor}) {
    const query = useQuery();

    return (
        <Switch>
            <Route path="/collections/:id">
                <ProtectedRoute>
                    <h1>Collections page (by ID)</h1>
                </ProtectedRoute>
            </Route>

            <Route path="/collections">
                <ProtectedRoute>
                    <h1>All collections page</h1>
                </ProtectedRoute>
            </Route>

            <Route path="/colors">
                <br></br>
                <h1>Search for a color here!</h1>
                <br></br>
                {query.size ?
                    <div>Rendering the color info for: {query.toString()}</div> :
                    <SearchBar searchFor={searchColor}/>}
                <br></br>
            </Route>

            <Route path="/schemes">
                <br></br>
                <h1>Search for a scheme here!</h1>
                <br></br>
                <div>Is there a query string? {query.size ? "yes" : "no"}</div>
                {query.size ?
                    "Since there is a query string, render the scheme info!" :
                    "Since there is no query string, render only the search bar!"}
                <div>Query string result, from useQuery(): {query.toString()}</div>
                <br></br>
            </Route>

            <Route path="/profile">
                <ProtectedRoute>
                    <EditProfileForm />
                </ProtectedRoute>
            </Route>

            <Route path="/signup">
                <UserAuthForm title={"Sign Up"} fieldInfo={SIGNUP_FIELDS} action={signup}/>
            </Route>

            <Route path="/login">
                <UserAuthForm title={"Log In"} fieldInfo={LOGIN_FIELDS} action={login}/>
            </Route>

            <Route path="/">
                <h1>Homepage</h1>
            </Route>

            <Redirect to="/" />
        </Switch>
    )
}


export default Routes;
