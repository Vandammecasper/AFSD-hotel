import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../views/home.vue')

        },
        {
            path: '/user',
            component: () => import('../components/header.vue'),
            children: [
                {
                    path: 'reservations',
                    component: () => import('../views/reservations.vue')
                }
            ]
        },
        {
            path: '/admin',
            component: () => import('../components/header.vue'),
            children: [
                {
                    path: 'locks',
                    component: () => import('../views/admin/locks.vue')
                },
                {
                    path: 'locks/:id',
                    name: 'lock',
                    component: () => import('../views/admin/lock.vue')
                },
                {
                    path: 'overview',
                    component: () => import('../views/admin/overview.vue')
                },
                {
                    path: 'selection',
                    component: () => import('../views/admin/selection.vue')
                },
                {
                    path: 'selection/:roomNumber',
                    component: () => import('../views/admin/detail.vue')
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