import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";


/**
 * Route: /signup
 *
 * Form used to sign up for Colors website.
 *
 * Manages state updates on changes to the form inputs.
 *
 * On successful signup, calles signup (function prop), logs in user, and redirects to homepage.
 *
 * On signup failure, displays alert and error message.
 */
function SignupForm({signup}) {
    const INIT_FORM = {
        username: "",
        password: "",
        firstName: "",
        lastName: ""
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

    /** Form submission - register user, log them in, and redirect to homepage on success */
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const result = await signup(formData);

        if (result.success) {
            history.push("/")  // Redirect to homepage
        } else {
            setFormErrors(result.err);
        }
    }

    /** Show alert message on failure to sign up */
    const renderAlert = () => {
        if (formErrors.length) {
            return (
                <Alert color="danger">
                    Signup failed - {formErrors}
                </Alert>
            );
        }
    }

    return (
        <div className="SignupForm">
            <h2>Sign Up</h2>

            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        {renderAlert()}

                        <Button color="primary" block>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}


export default SignupForm;
