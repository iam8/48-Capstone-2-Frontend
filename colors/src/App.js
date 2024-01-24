import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import jwtDecode from "jwt-decode";

import ColorsApi from './api';
import Routes from './routes/Routes';
import {UserContext} from './auth/UserContext';
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

    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(token1);

    useEffect(() => {

        /** Fetch user data from API. */
        async function fetchCurrentUser() {
            try {
                const {username} = jwtDecode(token);
                // ColorsApi.token = token;
                const user = await ColorsApi.getUser(username);
                setCurrentUser(user);

            } catch(err) {
                console.log("ERROR FETCHING CURRENT USER:", err);
                setCurrentUser(null);
            }
        }

        fetchCurrentUser();
    }, [token]);

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

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{currentUser, setCurrentUser}}>
                    <header className="App-header">
                        Colors App.
                        Whee, look at all the colors here that don't exist yet!
                        Current user and token: {currentUser}, {token}
                    </header>

                    <Routes login={login}/>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
