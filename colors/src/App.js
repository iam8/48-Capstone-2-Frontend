import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import ColorsApi from './api';
import Routes from './routes/Routes';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import NavBar from './navbar/NavBar';
import CollectionsContext from "./collections/CollectionsContext";


/**
 * Colors application.
 *
 * State:
 *  - isDataFetched (bool): true if user data has been fetched, false otherwise
 *  - currentUser (object): data on current user; null if no current user exists
 *  - token (string): authentication token for current user
 *  - collections (array): data on all collections for current user. Null if there is no
 *      current user.
 *  - errors (array): array of errors that occurred during API calls
 *
 * Renders Routes component.
 */
function App() {
    console.log("RENDERING App...");

    const [isDataFetched, setIsDataFetched] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage("colors-token");
    const [collections, setCollections] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        console.log("In App useEffect()");

        async function fetchAllData() {

            /** Fetch and return user data from API. Return null if there is no current user. */
            async function fetchCurrentUser() {
                console.log("FETCHING CURRENT USER...");

                if (token) {
                    try {
                        const {username} = jwtDecode(token);
                        ColorsApi.token = token;
                        return await ColorsApi.getUser(username);
                    } catch(err) {
                        console.log("ERROR FETCHING CURRENT USER:", err);
                        setErrors(err);
                    }
                }

                return null;
            }

            // Fetch and set current user and their collections, if current user is found
            const user = await fetchCurrentUser();
            setCurrentUser(user);

            if (user) {
                setCollections(user.collections);

                // TODO: for each collection, fetch Color data using API and load into state
                // TODO: Write a function for this (async in useEffect, like before)
            }

            setIsDataFetched(true);
        }

        setIsDataFetched(false);
        fetchAllData();
    }, [token]);

    // AUTH FUNCTIONALITY -------------------------------------------------------------------------

    /**
     * Sign up user with given user data: {username, password, firstName, lastName}.
     *
     * Return (success: true) on success and {success: false, err} on failure.
     */
    async function signup(userData) {
        try {
            const token = await ColorsApi.signup(userData);
            setToken(token);
            return {success: true};
        } catch(err) {
            console.log("ERROR SIGNING UP:", err);
            return {success: false, err};
        }
    }

    /**
     * Log in user with given user data: {username, password}.
     *
     * Return {success: true} on success and {success: false, err} on failure.
     */
    async function login(userData) {
        try {
            const token = await ColorsApi.login(userData);
            setToken(token);
            return {success: true};
        } catch(err) {
            console.log("ERROR LOGGING IN:", err);
            return {success: false, err};
        }
    }

    /**
     * Log current user out.
     */
    async function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    //---------------------------------------------------------------------------------------------

    // COLLECTIONS FUNCTIONALITY ------------------------------------------------------------------

    /** Add a color (hex) to the collection with the given ID. */
    async function addColor(hex, id) {
        console.log("IN addColor(). Collections before adding:", collections);
        try {
            await ColorsApi.addColor(id, {colorHex: hex});
            // Update collections in state here

            console.log(`Successfully added color ${hex} to collection ${id}`);
        } catch(err) {
            console.log("ERROR ADDING COLOR TO COLLECTION:", err);
        }
    }

    //---------------------------------------------------------------------------------------------

    // RENDER -------------------------------------------------------------------------------------

    if (errors) return <div>
        ERROR in calling API(s): {errors}.
    </div>

    if (!isDataFetched) return <div>FETCHING DATA...</div>

    return (
        <div className="App">

            <BrowserRouter>
                <UserContext.Provider value={{currentUser, setCurrentUser}}>
                    <CollectionsContext.Provider value={{collections, addColor}}>

                        <NavBar logout={logout}/>
                        <Routes
                            login={login}
                            signup={signup}
                        />

                    </CollectionsContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}


export default App;
