import { createRouter, createWebHistory } from "vue-router";

import MainView from "@/views/MainView.vue";
import ApiInteractionsView from "@/views/ApiInteractionsView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainView,
        },
        {
            path: '/add',
            name: 'add',
            component: ApiInteractionsView,
        },
        {
            path: '/edit',
            name: 'edit',
            component: ApiInteractionsView,
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: ApiInteractionsView,
        },
    ]
});

export default router;