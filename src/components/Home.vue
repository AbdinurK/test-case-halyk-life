<script setup lang="ts">
import { onMounted } from 'vue'
import { userStore } from '../store/user'
import router from '../plugins/router'

const user = userStore()

function goToDocuments() {
    router.push('/documents')
}

function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

onMounted(() => {
    if (!user.loggedIn) {
        return router.push('/auth')
    }
})

</script>


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


