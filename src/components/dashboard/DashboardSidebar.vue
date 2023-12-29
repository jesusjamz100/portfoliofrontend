<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import useAuth from '../../composables/useAuth.js';
import { router } from '../../main.js';

import { faSchool, faArrowRightFromBracket, faBriefcase, faBolt, faLanguage, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
library.add(faSchool, faArrowRightFromBracket, faBriefcase, faBolt, faLanguage, faBarsProgress);

const { logOut } = useAuth();

const links = [
    ['Educación', '/dashboard/educacion', ['fas', 'school']],
    ['Experiencia', '/dashboard/experiencia', ['fas', 'briefcase']],
    ['Habilidades', '/dashboard/habilidades', ['fas', 'bolt']],
    ['Idiomas', '/dashboard/idiomas', ['fas', 'language']],
    ['Proyectos', '/dashboard/proyectos', ['fas', 'bars-progress']]
];

const handleClick = () => {
    logOut();
    router.push('/');
};
</script>

<template>
    <aside class="min-w-fit max-w-xs w-fit flex flex-col bg-white h-screen px-6 lg:px-10 py-5 shadow-lg dark:bg-neutral-800">
        <div class="flex flex-col gap-2">
            <router-link to="/dashboard" class="text-center text-3xl font-black cursor-pointer hidden lg:block dark:text-neutral-300">Dashboard</router-link>
            <div class="title-underline hidden lg:block"></div>
        </div>
        <div class="flex flex-col justify-between h-full">
            <ul class="decoration-none flex flex-col gap-5">
                <li v-for="i in links" class="aside-link">
                    <router-link :to="i[1]" activeClass="aside-link-active">
                        <font-awesome-icon :icon="i[2]" /><span class="hidden lg:inline">{{ ' ' + i[0] }}</span></router-link></li>
            </ul>
            <button class="text-red-400 font-bold" @click="handleClick">
                <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /><span class="hidden lg:inline">{{ ' Cerrar sesión' }}</span></button>
        </div>
    </aside>
</template>