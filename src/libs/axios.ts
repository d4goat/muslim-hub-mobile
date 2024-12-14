import Axios from "axios"
import type { AxiosInstance } from "axios"

const axios: AxiosInstance = Axios.create({
    timeout: 100000,
    headers: {
        "Content-Type" : "application/json"
    }
})

export default axios