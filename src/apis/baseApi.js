import axios from "axios";

const env = 2
const PRODUCT_DOMAIN = env === 1 ? 'https://sw-service-production.up.railway.app' : 'http://localhost:8080'
export const callApi = async (options) => {
    options = {
        ...options,
        url: PRODUCT_DOMAIN + options.url
    }
    try {
        return await axios(options);
    } catch (error) {
        if (error.response) {
            return error.response;
        }
        return error;
    }
};
