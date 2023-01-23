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
                    class="login-page__form-submit"
                />
            </fieldset>
        </form>
    </main>
</template>


<script lang="ts">
export default {
    name: 'LoginForm',
    data() {
        return {
            login: '',
            password: '',
        }
    },
    methods: {
        async submit() {
            
        },
    }
}
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
        }
    }
</style>