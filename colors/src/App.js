import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import ColorsApi from './api';
import Routes from './routes/Routes';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import NavBar from './navbar/NavBar';


/**
 * Colors application.
 *
 * State:
 *  - isUserLoaded (bool): true if user data has been fetched via API, false otherwise
 *  - currentUser (object): data on current user; null if no current user exists
 *  - token (string): authentication token for current user
 *
 * Renders Routes component.
 */
function App() {
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage("colors-token");

    useEffect(() => {

        /** Fetch user data from API. */
        async function fetchCurrentUser() {
            if (token) {
                try {
                    const {username} = jwtDecode(token);
                    ColorsApi.token = token;
                    const user = await ColorsApi.getUser(username);
                    setCurrentUser(user);

                } catch(err) {
                    console.log("ERROR FETCHING CURRENT USER:", err);
                    setCurrentUser(null);
                }
            }

            setIsUserLoaded(true);
        }

        console.log("FETCHING CURRENT USER...");
        setIsUserLoaded(false);
        fetchCurrentUser();

    }, [token]);

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

    if (!isUserLoaded) return <div>LOADING...</div>

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{currentUser}}>

                    <NavBar logout={logout}/>
                    <Routes login={login} signup={signup}/>

                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}


export default App;
