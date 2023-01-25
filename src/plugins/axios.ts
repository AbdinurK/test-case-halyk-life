import axios from 'axios'
import router from './router'


axios.defaults.baseURL = import.meta.env.VITE_HALYK_LIFE_TEST_ENDPOINT
axios.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
            request.headers.set('Accept', 'application/json')
        } else {
            router.push('/auth')
        }
        return request
    }, 
    error => {
        return Promise.reject(error)
    }
)


axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios