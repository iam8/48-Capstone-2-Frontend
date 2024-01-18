import React from 'react';
import {Link} from "react-router-dom";

import Routes from './routes/Routes';
import './App.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                Colors App.
                Whee, look at all the colors here that don't exist yet!
            </header>

            <Routes />
        </div>
    );
}

export default App;
