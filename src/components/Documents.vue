<script setup lang="ts">
import { onMounted } from 'vue'
import { userStore } from '../store/user'
import router from '../plugins/router'

const user = userStore()

onMounted(() => {
    if (!user.isLoggedIn) {
        router.push('/auth')
    }
})
</script>


<template>
    Documents
</template>
