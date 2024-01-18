import React from 'react';
import {Link} from "react-router-dom";

import './App.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                Colors App.
                Whee, look at all the colors here that don't exist yet!

                Here are some react-router-dom links (temporary) to the auth pages. The links do
                not work yet.
                {/* <Link to="/login">Token</Link> */}
                {/* <Link to="/signup">Sign up</Link> */}
                <a href="/login">Token/login</a>
                <a href="/signup">Sign up</a>
            </header>
        </div>
    );
}

export default App;
