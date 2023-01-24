import { defineStore } from 'pinia'

interface LoginFromData {
    login: string
    password: string
}
export const userStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: !!localStorage.getItem('accessToken'),
            isLoading: false,
        }
    },
    getters: {
        loggedIn(state) {
            return state.isLoggedIn
        }
    },
    actions: {
        async login(data: LoginFromData, success: () => void, error: (error: any) => void) {
            this.isLoading = true
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
            this.isLoading = false
        }
    }
})
