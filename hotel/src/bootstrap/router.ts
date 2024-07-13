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
                },
                {
                    path: 'reservations',
                    component: () => import('../views/reservations.vue')
                },
                {
                    path: 'overview',
                    component: () => import('../views/admin/overview.vue')
                },
                {
                    path: 'locks',
                    component: () => import('../views/admin/locks.vue')
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