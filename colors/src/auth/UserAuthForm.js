import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";


/**
 * User authentication form template. Used to create a form for user authentication (e.g. login
 * form, signup form).
 *
 * Props:
 *  - `title` (string): title of the form, to be displayed above form.
 *  - `fieldInfo` (list): list of objects, each one containing info about one form field. See
 *      example below for required object fields.
 *  - `action` (function): performs the main action of the form upon submission (e.g. logging in)
 *
 * Example `fieldInfo` prop:
 *
 * `[
 *   {
 *     id: "username",
 *     initVal: "",
 *     labelText: "Username",
 *     inputType: "text"
 *   },
 *   {
 *     id: "password",
 *     initVal: "",
 *     labelText: "Password",
 *     inputType: "password"
 *   }
 * ]`
*/
function UserAuthForm({title, fieldInfo, action}) {

    // Create object of init form values
    const INIT_FORM = {};
    for (let field of fieldInfo) {
        INIT_FORM[field.id] = field.initVal;
    };

    const [formData, setFormData] = useState(INIT_FORM);
    const [formErrors, setFormErrors] = useState([]);
    const history = useHistory();

    /** Handle changes to inputs */
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormErrors([]);
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));
    }

    /** Form submission - perform main action and redirect to homepage on success */
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const result = await action(formData);

        if (result.success) {
            history.push("/")  // Redirect to homepage
        } else {
            setFormErrors(result.err);
        }
    }

    /** Show alert message on submission failure */
    const renderAlert = () => {
        if (formErrors.length) {
            return (
                <Alert color="danger">
                    Error - {formErrors}
                </Alert>
            );
        }
    }

    /** Render all form inputs */
    const renderFormInputs = () => {
        return fieldInfo.map((field) => (
            <FormGroup key={field.id}>
                <Label htmlFor={field.id}>{field.labelText}</Label>
                <Input
                    id={field.id}
                    name={field.id}
                    type={field.inputType}
                    value={formData[field.id]}
                    onChange={handleChange}
                />
            </FormGroup>
        ));
    }

    return (
        <div className="UserAuthForm">
            <h2>{title}</h2>

            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        {renderFormInputs()}
                        {renderAlert()}

                        <Button color="primary" block>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}


export default UserAuthForm;
