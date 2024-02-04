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
function EditProfileForm() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const INIT_FORM = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName
    };

    const [formData, setFormData] = useState(INIT_FORM);

    /** Handle changes to inputs */

    /**
     * Call API to save updated user profile data. Return saved data if successful or undefined
     * if unsuccessful.
     */

    /** Form submission - attempt to update user profile data and reset form inputs */

    /** Show an alert message on success or failure to update user profile */

    return (
        <div className="EditProfileForm">
            <h2>Edit Profile</h2>
        </div>
    )
}


export default EditProfileForm;
