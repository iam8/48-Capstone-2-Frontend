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
 *  - isDataFetched (bool): true if all API data has been fetched, false otherwise
 *  - currentUser (object): data on current user; null if no current user exists
 *  - token (string): authentication token for current user
 *  - collections (array): data on all collections for current user. Null if there is no
 *      current user.
 *  - fetchErrors (array): array of errors that occurred while fetching API data.
 *
 * Renders Routes component.
 */
function App() {
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage("colors-token");
    const [collections, setCollections] = useState(null);
    const [fetchErrors, setFetchErrors] = useState([]);

    useEffect(() => {
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
                        setFetchErrors((prevErrs) => [...prevErrs, err]);
                        return null;
                    }
                }

                return null;
            }

            /** Fetch and return collections data for user with given username. */
            async function fetchCollections(username) {
                console.log("FETCHING COLLECTIONS DATA FOR", username);

                try {
                    return await ColorsApi.getCollsByUser(username);
                } catch(err) {
                    console.log(`ERROR FETCHING COLLECTIONS FOR ${username}:`, err);
                    setFetchErrors((prevErrs) => [...prevErrs, err]);
                    return null;
                }
            }

            const user = await fetchCurrentUser();
            setCurrentUser(user);

            if (user) {
                setCollections(await fetchCollections(user.username));
            }

            setIsDataFetched(true);
        }

        setIsDataFetched(false);
        fetchAllData();
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

    if (fetchErrors.length) return <div>
        ERROR in calling API(s): {fetchErrors[0]}. Please try again later.
    </div>

    if (!isDataFetched) return <div>FETCHING DATA...</div>

    return (
        <div className="App">

            {collections ? <div>Collections set!</div> : <div>Collections not set!</div>}

            <BrowserRouter>
                <UserContext.Provider value={{currentUser, setCurrentUser}}>

                    <NavBar logout={logout}/>
                    <Routes
                        login={login}
                        signup={signup}
                    />

                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}


export default App;
