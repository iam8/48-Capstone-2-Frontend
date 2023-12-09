import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


/**
 * Colors API class.
 *
 * Static class containing methods used to get/send to the Colors project backend API.
 */
class ColorsApi {
    static token;

    /** Send request to endpoint via Axios with (optional) data and method. */
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
}


export default ColorsApi;
