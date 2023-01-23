import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const LoginForm = () => import('../components/LoginForm.vue')


const routes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        name: 'LoginForm',
        component: LoginForm,
    },
    {
        path: '/documents',
        name: 'Documents',
        component: LoginForm,
    }
]

