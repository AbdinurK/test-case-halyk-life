<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { documentsStore } from '../store/documents'
import router from '../plugins/router'

const store = documentsStore()

const documents = computed(() => {
    return store.list
})

function goToHome() {
    router.push('/')
}

onMounted(async () => {
    await store.fetchDocuments({
        processInstanceId: "0370c1fd-3b3d-4974-a0cb-23e8ccc727cd"
    }, () => {}, () => {})
})
</script>


<template>
    <h2>Список документов</h2>

    <div>
        <button @click="goToHome">
            На главную
        </button>
        <input type="file" />
    </div>

    

    <ul class="list">
        <li class="list__item" v-for="(item, idx) in documents">
            <h4>Наименование</h4>
            <p>
                {{ `${idx + 1}. ` + item.fileTypeName }}
            </p>
            <figure>
                <img src="@/assets/file-solid.svg" />
                <figcaption>{{ item.fileName }}</figcaption>
            </figure>
        </li>
    </ul>
</template>


<style lang="scss" scoped>
.list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 20px;
    margin-top: 20px;
    &__item {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 12px;
        flex-grow: 1;
        width: 100%;
        text-align: left;
        h4 {
            margin: 0;
        }
        figure {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 0;
            img {
                width: 15px;
                height: 20px;
                object-fit: cover;
                margin-right: 10px;
            }
        }
    }
}
</style>

