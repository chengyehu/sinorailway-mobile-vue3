import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: ()=> import('@/views/frame/frame.vue'),
        children: [
            {
                path: '/device',
                component: ()=> import('@/views/device/device.vue'),
            },
            {
                path: '/fence',
                component: ()=> import('@/views/fence/fence.vue'),
            },
            {
                path: '/warning',
                component: ()=> import('@/views/warning/warning.vue'),
            },
            {
                path: '/center',
                component: ()=> import('@/views/center/center.vue'),
            },
        ]
    },
    {
        path: '',
        redirect: '/device'
    },
    {
        path: '/device/detail',
        component: ()=> import('@/views/device/device-detail.vue'),
    },
    {
        path: '/device/add',
        component: ()=> import('@/views/device/device-add.vue'),
    },
    {
        path: '/device/update',
        component: ()=> import('@/views/device/device-update.vue'),
    },
    {
        path: '/fence/detail',
        component: ()=> import('@/views/fence/fence-detail.vue'),
    },
    {
        path: '/fence/add',
        component: ()=> import('@/views/fence/fence-add.vue'),
    },
    {
        path: '/fence/update',
        component: ()=> import('@/views/fence/fence-update.vue'),
    },
    {
        path: '/login',
        component: ()=> import('@/views/login/login.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;