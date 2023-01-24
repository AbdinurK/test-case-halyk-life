import { defineStore } from 'pinia'


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
                const res  = await fetch(`${import.meta.env.VITE_HALYK_LIFE_TEST_ENDPOINT}/insis/identity/api/Account/login`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                const response = await res.json()
                if (res.ok) {
                    localStorage.setItem('accessToken', response.accessToken)
                    localStorage.setItem('refreshToken', response.refreshToken)
                    success()
                } else {
                    error(response)
                }
            } catch (err) {
                error(err)
            }
        }
    }
})
