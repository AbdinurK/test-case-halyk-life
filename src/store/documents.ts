import { defineStore } from 'pinia'
import axios from '../plugins/axios'


type Item = {
    certificateDate: string
    fileId: string
    fileName: string
    fileTypeCode: string
    fileTypeId: string
    fileTypeName: string
    id: string
    iin: string
    page: number
    processInstanceId: string
    sharedId: string
    signId: string
    signed: string
}
type RootState = {
    list: Item[],
    isLoading: boolean
};
export const useDocumentsStore = defineStore('documents', {
    state: () => {
        return {
            list: [],
            isLoading: false
        } as RootState
    },
    getters: {
        documents(state) {
            return state.list
        },
    },
    actions: {
        async fetchDocuments(data: {
            processInstanceId: string
        }, success: () => void, error: (error: any) => void) {
            this.isLoading = true
            try {
                const res = await axios.post('/insis/arm/api/File/List', data)
                if (res.data) {
                    this.list = res.data
                    success()
                } else {
                    error('Возникла ошибка!')
                }
            } catch (err) {
                error(err)
            }
            this.isLoading = false
        },
        async upload(data: FormData, success: () => void, error: (error: any) => void) {
            try {
                const res = await axios.post('/insis/arm/api/File/UploadFiles', data)
                if (res.data) {
                    await this.fetchDocuments({
                        processInstanceId: "0370c1fd-3b3d-4974-a0cb-23e8ccc727cd"
                    }, success, error)
                } else {
                    error(res.data)
                }
            } catch (err) {
                error(err)
            }
        }
    }
})
