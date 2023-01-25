import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const LoginForm = () => import('../pages/auth.vue')
const Documents = () => import('../pages/documents.vue')
const NotFound = () => import('../pages/index.vue')
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
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})


export default router