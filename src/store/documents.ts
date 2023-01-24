import { defineStore } from 'pinia'


interface UploadFormData {
    processInstanceId: string
}
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
    list: Item[]
    isLoading: boolean
};
export const documentsStore = defineStore('documents', {
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
        async fetchDocuments(data: UploadFormData, success: () => void, error: (error: any) => void) {
            this.isLoading = true
            try {
                const res = await fetch(`${import.meta.env.VITE_HALYK_LIFE_TEST_ENDPOINT}/insis/arm/api/File/List`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                })
                const response = await res.json()
                if (res.ok) {
                    this.list = response
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