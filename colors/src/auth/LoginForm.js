import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";


/**
 * Route: /login
 *
 * Form used to log in to Colors site.
 *
 * Manages state updates on changes to the form inputs.
 *
 * On successful login, calls login (function prop) and redirects to homepage.
 *
 * On login failure, displays alert and error message.
 */
function LoginForm({login}) {

    return (
        <div className="LoginForm">
            <h2>Log In</h2>
        </div>
    )
}


export default LoginForm;
