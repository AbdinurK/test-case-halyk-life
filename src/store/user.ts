import { defineStore } from 'pinia'
import axios from '../plugins/axios'


interface LoginFormData {
    login: string
    password: string
}
export const userStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: !!localStorage.getItem('accessToken'),
        }
    },
    getters: {
        loggedIn(state) {
            return state.isLoggedIn
        },
    },
    actions: {
        async login(data: LoginFormData, success: () => void, error: (error: any) => void) {
            try {
                const res = await axios.post('/insis/identity/api/Account/login', data)
                if (res.data) {
                    localStorage.setItem('accessToken', res.data.accessToken)
                    localStorage.setItem('refreshToken', res.data.refreshToken)
                    success()
                } else {
                    error(res.data)
                }
            } catch (err) {
                error(err)
            }
        }
    }
})
