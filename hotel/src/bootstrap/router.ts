import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../components/header.vue'),
            children:[
                {
                    path: '',
                    component: () => import('../views/home.vue')
                }
            ]

        },
        {
            path: '/auth',
            children: [
                {
                    path: 'register',
                    component: () => import('../views/auth/register.vue')
                },
                {
                    path: 'login',
                    component: () => import('../views/auth/login.vue')
                }
            ]
        }
    ]
})

export default router;