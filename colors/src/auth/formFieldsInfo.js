/** Data structures containing required info for auth form fields. */

const SIGNUP_FIELDS = [
    {
        id: "username",
        initVal: "",
        labelText: "Username",
        inputType: "text"
    },
    {
        id: "password",
        initVal: "",
        labelText: "Password",
        inputType: "password"
    },
    {
        id: "firstName",
        initVal: "",
        labelText: "First name",
        inputType: "text"
    },
    {
        id: "lastName",
        initVal: "",
        labelText: "Last name",
        inputType: "text"
    }
];

const LOGIN_FIELDS = [
    {
        id: "username",
        initVal: "",
        labelText: "Username",
        inputType: "text"
    },
    {
        id: "password",
        initVal: "",
        labelText: "Password",
        inputType: "password"
    }
];


export {SIGNUP_FIELDS, LOGIN_FIELDS};
