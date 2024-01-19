import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";

import ColorsApi from './api';
import Routes from './routes/Routes';
import {UserContext} from './auth/UserContext';
import './App.css';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <header className="App-header">
                    Colors App.
                    Whee, look at all the colors here that don't exist yet!
                </header>

                <Routes />
            </BrowserRouter>
        </div>
    );
}

export default App;
