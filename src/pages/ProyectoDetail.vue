<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import useProyectos from '../composables/useProyectos';
import Spinner from '../components/Spinner.vue';
import formatDate from '../helpers/formatDate.js';

const route = useRoute();
const { obtenerProyecto } = useProyectos();

const proyectoId = ref(route.params.id);
const proyecto = ref({});

const handleLoad = async () => {
    proyecto.value = await obtenerProyecto(proyectoId.value);
}

handleLoad();

</script>

<template>
    <Header />
    <div class="min-h-screen flex flex-col gap-8 items-center justify-center pt-28 pb-12 px-3">
        <Spinner v-if="!proyecto" />
        <div v-else class="flex flex-col text-center w-full justify-center">
            <img :src="`${!proyecto.imgUrl ? '/noimage.avif' : proyecto.imgUrl}`" :alt="`proyecto-${proyecto.id}`" class="border-[1px] border-gray-300 rounded-lg project-img self-center mb-5">
            <p class="text-xl font-bold">{{ proyecto.titulo }}</p>
            <p class="text-lg text-gray-500 mb-4">{{ formatDate(proyecto.startDate) }} - {{ formatDate(proyecto.endDate) }}</p>
            <p class="text-xl mb-5">{{ proyecto.descripcion }}</p>
            <div v-if="proyecto.tecnologias.length >= 1" class="flex flex-wrap gap-5 w-full h-fit justify-center mb-8">
                <p v-for="tecnologia in proyecto.tecnologias" class="habilidad">{{ tecnologia }}</p>
            </div>
            <div class="flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 ">
                <div v-if="proyecto.deployLinks.length > 0" class="flex flex-col gap-3">
                    <p class="text-lg font-semibold">Producción</p>
                    <a :href="item" v-for="(item, index) in proyecto.deployLinks" :key="index" class="text-sm md:text-base" target="_blank">{{ item }}</a>
                </div>
                <div v-if="proyecto.githubLinks.length > 0" class="flex flex-col gap-3">
                    <p class="text-lg font-semibold">Repositorios</p>
                    <a :href="item" v-for="(item, index) in proyecto.githubLinks" :key="index" class="text-sm md:text-base" target="_blank">{{ item }}</a>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>