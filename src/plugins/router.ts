import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const LoginForm = () => import('../pages/auth.vue')
const Documents = () => import('../pages/documents.vue')
const Home = () => import('../pages/index.vue')


const routes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        name: 'LoginForm',
        component: LoginForm,
    },
    {
        path: '/documents',
        name: 'Documents',
        component: Documents,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})


export default router