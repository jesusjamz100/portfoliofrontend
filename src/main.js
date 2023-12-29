import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './style.css';

import App from './App.vue';
import Inicio from './pages/Inicio.vue'
import Docs from './pages/Docs.vue';
import LogIn from './pages/LogIn.vue';
import Dashboard from './pages/Dashboard.vue';
import EducacionPage from './pages/EducacionPage.vue';
import ExperienciaPage from './pages/ExperienciaPage.vue';
import HabilidadesPage from './pages/HabilidadesPage.vue';
import IdiomasPage from './pages/IdiomasPage.vue';
import ProyectosPage from './pages/ProyectosPage.vue';

import useAuth from './composables/useAuth.js';
import axios from 'axios';

const { checkAuth } = useAuth();

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Inicio },
        { path: '/docs', component: Docs },
        {
            path: '/login',
            name: 'login',
            component: LogIn,
            meta: {
                guest: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'educacion',
                    component: EducacionPage
                },
                {
                    path: 'experiencia',
                    component: ExperienciaPage
                },
                {
                    path: 'habilidades',
                    component: HabilidadesPage
                },
                {
                    path: 'idiomas',
                    component: IdiomasPage
                },
                {
                    path: 'proyectos',
                    component: ProyectosPage
                }
            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 50
            }
        }

        return { top: 0 };
    }
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        if (!(await checkAuth())) {
            return next({name: 'login'});
        }
    } else if(to.meta.guest) {
        if (await checkAuth()){
            return next({name: 'dashboard'});
        }
    }
    next();
})

export const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')