import React, {useState, useContext} from "react";
import { Alert, Button, Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";

import ColorsApi from "../api";
import UserContext from "../auth/UserContext";


/**
 * Route: /profile
 *
 * Form used to edit user profile. Initially fills inputs with the current user profile data.
 *
 * Manages state updates on changes to the form inputs.
 *
 * On form submission, attempts to update user profile with new data and displays a success or
 * failure notification.
 */