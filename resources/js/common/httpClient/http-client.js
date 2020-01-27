import axios from 'axios'
import { createHttpError } from './utils'


class HttpClient {
    constructor(config) {
        this.config = config;
        this.axiosInstance = axios.create(config)
    }

    getConfig() {
        return this.config
    }

    createFetch({ url, ...rest }) {
        return (params = {}) => {
            const requestSettings = Object.assign({ method: 'GET' }, rest, params)
            return this.axiosInstance(url, requestSettings).then(
                response => response.data,
                error => {
                    throw createHttpError(error)
                },
            )
        }
    }

    getEmployees = () => {
        const endpoint = this.createFetch({
            url: `/employees/`,
            method: 'GET',
        })

        return endpoint()
    }

    getExpenses = (queryString = '') => {
        const endpoint = this.createFetch({
            url: `/expenses/?${queryString}`,
            method: 'GET',
        });

        return endpoint()
    }


    updateExpense = (id, status) => {
        const endpoint = this.createFetch({
            url: `/expenses/${id}`,
            method: 'PUT',
            data: {status},
        })

        return endpoint()
    }

}

export { HttpClient }
