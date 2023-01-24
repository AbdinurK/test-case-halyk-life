<template>
    Documents
</template>


<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { userStore } from '../store/user'
import router from '../plugins/router'
export default defineComponent({
    setup() {
        const user = userStore()

        onMounted(() => {
            if (!user.isLoggedIn) {
                router.push('/auth')
            }
        })
    }
})
</script>
