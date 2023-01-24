<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useDocumentsStore } from '../store/documents'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const store = useDocumentsStore()
const docs = ref(null) 
const documents = computed(() => {
    return store.list
})

const loading = computed(() => {
    return store.isLoading
})

async function onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        docs.value = target.files[0]
    }
}

async function uploadFile() {
    if (!docs.value) {
        return $toast.error('Выберите файл!', {
            position: 'top'
        })
    }
    const formData = new FormData()
    const document = {
        processInstanceId: "084d012d-4350-4513-9985-2bfe260aca6b",
        fileTypeCode: "7",
        page: 3,
        fileName: docs.value.name
    }
    const documents = [document]

    formData.append('file', docs.value)
    formData.append('fileData', JSON.stringify(documents))
    
    store.upload(formData, () => {
        $toast.success('Успешно загружено!', {
            position: 'top'
        })
    }, (res) => {
        $toast.error(res, {
            position: 'top'
        })
    })
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
        <input
            type="file"
            @change="onFileChanged($event)"
        />
        <button @click="uploadFile">
            Загрузить
        </button>
    </div>

    

    <ul class="list">
        <p v-if="loading">Загрузка...</p>
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

