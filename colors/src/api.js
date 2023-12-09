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

    /**
     * Get a user by username.
     */
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /**
     * Save edited user profile info.
     */
    static async saveUserData({username, firstName, lastName, password, isAdmin}) {
        let res = await this.request(`users/${username}`,
                                     {firstName, lastName, password, isAdmin},
                                     "patch");
        return res.user;
    }

    /**
     * Delete a user by username.
     */
    static async deleteUser(username) {
        let res = await this.request(`users/${username}`,
                                     {},
                                     "delete");

        return res.deleted;
    }

    /**
     * Create new collection for current user.
     */

    /**
     * Add new color to a collection.
     */

    /**
     * Remove a color from a collection.
     */

    /**
     * Get info on a collection by ID.
     */

    /**
     * Get all collections by a user.
     */

    /**
     * Rename a collection by ID.
     */

    /**
     * Delete a collection by ID.
     */

}


export default ColorsApi;
