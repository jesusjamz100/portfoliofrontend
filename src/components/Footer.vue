<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faInstagram, faLinkedin, faDev } from '@fortawesome/free-brands-svg-icons';

const year = new Date().getFullYear();

library.add(faGithub, faInstagram, faLinkedin, faDev);

const rrss = [
    ["https://github.com/jesusjamz100/", ['fab', 'github']],
    ["https://www.instagram.com/jesusjamz100/", ['fab', 'instagram']],
    ["https://www.linkedin.com/in/jesusjamz100/", ['fab', 'linkedin']],
    ['https://dev.to/jesusjamz100/', ['fab', 'dev']]
];

</script>

<template>
    <footer class="bg-green-800 px-8 sm:px-16 md:px-32 flex flex-col justify-items-center gap-10 w-full dark:bg-transparent">
        <div class="flex justify-between pt-24 mb-12">
            <div class="flex flex-col gap-1 w-[40%]">
                <h2 class="text-xl uppercase text-white font-black">Jesus Mendez</h2>
                <p class="text-white text-sm">Me especializo en el desarollo full stack de aplicaciones web en Python y JavaScript</p>
            </div>
            <div class="flex flex-col gap-3 max-w-[50%] sm:w-fit">
                <h2 class="text-lg uppercase text-white font-black">Redes Sociales</h2>
                <div class="flex gap-7 flex-wrap">
                    <a v-for="(i, index) in rrss" :key="index" :href="i[0]" target="_blank">
                        <font-awesome-icon :icon="i[1]" size="2x" class="text-white" />
                    </a>
                </div>
            </div>
        </div>
        <div class="self-center w-full h-[1px] bg-white" />
        <p class="text-center text-sm mb-10 text-white">© Copyright {{ year }}. Creado por Jesus Mendez.</p>
    </footer>
</template>