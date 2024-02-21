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
    static async createCollection({title}) {
        let res = await this.request("collections/",
                                    {title},
                                    "post");

        return res.collection;
    }

    /**
     * Add new color to a collection.
     */
    static async addColor(id, {colorHex}) {
        let res = await this.request(`collections/${id}/colors`,
                                     {colorHex},
                                     "post");

        return res;
    }

    /**
     * Remove a color from a collection.
     */
    static async removeColor(id, hex) {
        let res = await this.request(`collections/${id}/colors/${hex}`,
                                     {},
                                     "delete");

        return res.deleted;
    }

    /**
     * Get info on a collection by ID.
     */
    static async getCollection(id) {
        let res = await this.request(`collections/${id}`);
        return res.collection;
    }

    /**
     * Get all collections by a user.
     */
    static async getCollsByUser(username) {
        let res = await this.request(`collections/users/${username}`);
        return res.collections;
    }

    /**
     * Rename a collection by ID.
     */
    static async renameCollection(id, {newTitle}) {
        let res = await this.request(`collections/${id}`,
                                     {newTitle},
                                     "patch");

        return res.updated;
    }

    /**
     * Delete a collection by ID.
     */
    static async deleteCollection(id) {
        let res = await this.request(`collections/${id}`,
                                     {},
                                     "delete");

        return res.deleted;
    }
}


export default ColorsApi;
