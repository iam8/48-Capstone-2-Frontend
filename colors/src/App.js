import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";

import ColorsApi from './api';
import Routes from './routes/Routes';
import {UserContext} from './auth/UserContext';
import './App.css';


/**
 * Colors application.
 *
 * Renders Routes component.
 */
function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState("colors-token");

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
                <header className="App-header">
                    Colors App.
                    Whee, look at all the colors here that don't exist yet!
                </header>

                <Routes login={login}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
