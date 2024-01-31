import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { Link } from 'react-router-dom';

import ColorsApi from './api';
import Routes from './routes/Routes';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

// Temp storage: token for 'example1':
const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUxIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzA2MDU4Mzc3fQ.e0xc3kYuE5FhO2Eigppt05PPHLb-Z_-SplFCF0eiQ6o";

// Temp storage: token for 'example2':
const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcwNjA1ODQwMn0.p6M7oXf4ZFklieowbVxnlC_xaiy3MKVMQhex58oHV2o";


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
    // const [token, setToken] = useState(null);


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
                    <header className="App-header">
                        Colors App.
                        Whee, look at all the colors here that don't exist yet!
                        Current user and token:
                        {currentUser ? currentUser.username : "null"}, {token}
                    </header>

                    <Routes login={login} signup={signup}/>

                    <Link to="/login" onClick={logout}>Logout (temporary)</Link>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}


export default App;
