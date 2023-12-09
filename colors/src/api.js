import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


/**
 * Colors API class.
 *
 * Static class containing methods used to get/send to the Colors project backend API.
 */
class ColorsApi {
    static token;

    /**
     * Send request to endpoint via Axios with (optional) data and method.
     */
    static async request(endpoint, data={}, method="get") {

        // Pass authorization token via request header.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${ColorsApi.token}`};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, headers, params})).data;
        } catch(err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes ----------------------------------------------------------------------

    /**
     * Register a new user and return their generated auth token.
     */
    static async signup({username, password, firstName, lastName}) {
        let res = await this.request("auth/register",
                                     {username, password, firstName, lastName},
                                     "post");

        return res.token;
    }

    /**
     * Log in a user and return their auth token.
     */
    static async login({username, password}) {
        let res = await this.request("auth/token",
                                     {username, password},
                                     "post");

        return res.token;
    }
}


export default ColorsApi;
