<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import Habilidades from '../components/Habilidades.vue';
import Idiomas from '../components/Idiomas.vue';
import Proyectos from '../components/Proyectos.vue';
import Contacto from '../components/Contacto.vue';
</script>

<template>
    <Header />
    <section id="home" class="main">
        <div class="flex flex-col gap-7 items-center px-20 md:px-2 lg:px-4 w-full">
            <p class="text-xl md:text-2xl text-center dark:text-neutral-300">Hola, mi nombre es Jesus Mendez</p>
            <h1 class="text-center text-4xl md:text-5xl lg:text-6xl font-bold dark:text-neutral-300">Desarrollador Web Full Stack</h1>
            <p class="text-lg md:text-xl text-center max-w-[80%] xl:max-w-[60%] dark:text-neutral-300">Me especializo en el desarollo full stack de aplicaciones web en Python y JavaScript</p>
            <a class="btn-green" href="#projects">
                Proyectos
            </a>
        </div>
    </section>
    <section id="about" class="bg-white py-16 shadow-md w-full dark:bg-neutral-800">
        <div class="w-fit flex flex-col mx-auto">
            <p class="title">Sobre mí</p>
            <div class="title-underline"></div>
        </div>
        <div class="flex gap-20 mx-12 md:mx-24 lg:mx-40 w-fit">
            <div class="w-full md:flex flex-col gap-5 hidden">
                <p class="text-2xl font-semibold text-center dark:text-neutral-300">Conóceme</p>
                <p class="text-justify mb-4 dark:text-neutral-300">Con 22 años, soy un profesional joven con una licenciatura en comercio Internacional y actualmente estoy inmerso en mis estudios para obtener un Técnico Superior Universitario en Análisis de Sistemas. Mi destreza se centra en el desarrollo de software, con habilidades destacadas en Python y Javascript. Soy una persona responsable y entusiasta.</p>
                <div class="flex gap-5 justify-center w-full">
                    <a href="/JesusMendezCV_ES.pdf" class="btn-green text-xs lg:text-sm text-center" target="_blank">CV en Español</a>
                    <a href="/JesusMendezCV_EN.pdf" class="btn-green text-xs lg:text-sm text-center" target="_blank">CV en Inglés</a>
                </div>
            </div>
            <div class="w-full flex flex-col gap-5">
                <div class="md:hidden flex gap-5 justify-center mb-3 w-full">
                    <a href="/JesusMendezCV_ES.pdf" class="btn-green text-xs font-semibold" target="_blank">CV en Español</a>
                    <a href="/JesusMendezCV_EN.pdf" class="btn-green text-xs font-semibold" target="_blank">CV en Inglés</a>
                </div>
                <p class="text-2xl font-semibold text-center dark:text-neutral-300">Habilidades</p>
                <div class="flex flex-wrap gap-5 mb-5 justify-center lg:justify-normal w-full">
                    <Habilidades :all="true" />
                </div>
                <p class="text-2xl font-semibold text-center dark:text-neutral-300">Idiomas</p>
                <div class="flex flex-wrap gap-5 justify-center lg:justify-normal w-full">
                    <Idiomas :all="true" />
                </div>
            </div>
        </div>
    </section>
    <section id="projects" class="py-16 flex flex-col w-full">
        <div class="w-fit flex flex-col mx-auto">
            <p class="title">Proyectos</p>
            <div class="title-underline"></div>
        </div>
        <div class="flex flex-col gap-20 justify-center items-center w-[90%] lg:w-[70%] self-center">
            <Proyectos :all="false" :dashboard="false" />
        </div>
    </section>
    <section id="contacto" class="bg-white py-16 shadow-md flex flex-col w-full dark:bg-neutral-800">
        <div class="w-fit flex flex-col mx-auto">
            <p class="title">Contacto</p>
            <div class="title-underline"></div>
        </div>
        <div class="w-[90%] 2xl:w-[50%] xl:w-[60%] md:w-[70%] sm:w-[80%] self-center p-10 card-gray">
            <Contacto />
        </div>
    </section>
    <Footer />
</template>