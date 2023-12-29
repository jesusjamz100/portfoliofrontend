<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import DarkButton from './DarkButton.vue';

library.add(faBars);

const showNav = ref(false);

const navItems = [
    ['Inicio', '/#home'],
    ['Sobre mí', '/#about'],
    ['Proyectos', '/#projects'],
    ['Contacto', '/#contacto'],
    ['Docs', '/docs'],
    ['Me', '/dashboard']
];

const handleClick = () => {
    showNav.value = !showNav.value
};

</script>


<template>
    <header class="w-full">
        <nav class="fixed top-0 w-full flex md:flex-row flex-col justify-between items-center p-5 bg-white shadow-md dark:bg-neutral-800">
            <div class="flex gap-4 justify-between md:w-fit w-full">
                <div class="ml-3 flex gap-4">
                    <img src="/icon.ico" alt="" class="rounded-full h-7">
                    <router-link class="font-bold text-xl dark:text-neutral-300 select-none" to="/">Jesus Mendez</router-link>
                    <DarkButton />
                </div>
                <div class="md:hidden ">
                    <font-awesome-icon :icon="['fas', 'bars']" size="xl" class="select-none hover:cursor-pointer dark:text-neutral-300" @click="handleClick" />
                </div>
            </div>
            <div class="mr-3 md:flex hidden gap-6 w-fit">
                <router-link v-for="i in navItems" :to="i[1]" class="text-sm font-semibold uppercase hover:text-green-500 dark:text-neutral-300">{{ i[0] }}</router-link>
            </div>
            <div v-show="showNav"
                class="md:hidden flex flex-col gap-6 w-full pr-8 bg-white pt-5 dark:bg-neutral-800">
                <router-link v-for="i in navItems" :to="i[1]" class="text-sm font-semibold uppercase hover:text-green-500 self-end dark:text-neutral-300" @click="showNav = false">{{ i[0] }}</router-link>
            </div>
        </nav>
    </header>
</template>