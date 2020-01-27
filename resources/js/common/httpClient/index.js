import {HttpClient} from "./http-client";

const HttpCore = {
    configure(options = {}) {
        const config = {
            baseURL: window.api_url,
            timeout: 300000,
        }
        return new HttpClient(config)
    },
};

const httpCore = HttpCore.configure()
export { httpCore }
