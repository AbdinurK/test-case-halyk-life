<template>
    <main class="login-page">
        <a href="https://www.halyklife.kz/" class="login-page__logo" target="_blank">
            <img src="@/assets/logo.svg" alt="logo" />
        </a>
        <form class="login-page__form" @submit.prevent="submit">
            <fieldset>
                <input 
                    v-model="login"
                    type="text"
                    class="login-page__form-input" 
                    placeholder="Логин"
                />
                <input 
                    v-model="password"
                    type="password"
                    class="login-page__form-input"
                    placeholder="Пароль"
                />

                <input 
                    type="submit"
                    value="Вход в систему"
                    class="login-page__form-submit"
                />
            </fieldset>
        </form>
    </main>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import { userStore } from '../store/user'
import { useToast } from 'vue-toast-notification'
export default defineComponent({
    setup() {
        const user = userStore()
        const $toast = useToast()
        const login = ref('')
        const password = ref('')

        async function submit() {
            if (!login.value || !password.value) {
                return $toast.error('Заполните поля!', {
                    position: 'top'
                })
            }
            await user.login({
                login: login.value,
                password: password.value
            }, () => {
                this.$router.push('/documents');
            }, (err) => {
                $toast.error(err, {
                    position: 'top'
                })
            })
        }

        return {
            login,
            password,
            submit,
            user,
        }
    }
})
</script>


<style lang="scss" scoped>
    .login-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 200px;
        background-color: #f8f8f8;
        padding: 3rem;

        fieldset {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
            border: none;
            width: 300px;
        }

        &__logo {
            width: 130px;
            height: 46px;
            margin-bottom: 50px;
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        &__form {
            display: flex;
            flex-direction: column;
            &-input {
                padding: 10px;
                border-top: none;
                border-right: none;
                border-left: none;
                margin-bottom: 20px;
                border-bottom-width: 1px;
                border-bottom-color: #ccc;
                outline: none;
                &:hover {
                    border-color: green;
                }
                &::placeholder {
                    color: #ccc;
                }
            }
            &-submit {
                padding: 5px 12px;
                background-color: green;
                border: none;
                color: #fff;
                cursor: pointer;
                font-weight: bold;
            }
        }
    }
</style>