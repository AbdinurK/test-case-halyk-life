<template>
    <main>
        <h2>Halyk Life</h2>
        <button @click="goToDocuments">
            Документы
        </button>
        <button @click="logout">
            Выйти
        </button>
    </main>
</template>


<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { userStore } from '../store/user'
import router from '../plugins/router'
export default defineComponent({
    setup() {
        const user = userStore()

        function goToDocuments() {
            router.push('/documents')
        }

        function logout() {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }

        onMounted(() => {
            if (!user.isLoggedIn) {
                router.push('/auth')
            }
        })


        return {
            goToDocuments,
            logout
        }
    }
})
</script>








