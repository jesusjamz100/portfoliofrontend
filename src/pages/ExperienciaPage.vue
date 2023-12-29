<script setup>
import useExperiencia from '../composables/useExperiencia.js';
import { provide } from 'vue';

import Experiencia from '../components/Experiencia.vue';
import ExperienciaForm from '../components/dashboard/ExperienciaForm.vue';

const { experiencia, experiencias } = useExperiencia();

provide('experiencia', experiencia);
provide('experiencias', experiencias);

</script>

<template>
    <div class="px-10 pt-10 flex flex-col">
        <div class="flex flex-col gap-2">
            <p class="title-db">Experiencia Laboral</p>
            <div class="title-underline w-16"></div>
        </div>
        <div class="flex gap-10">
            <div class="w-full">
                <ExperienciaForm />
            </div>
            <div class="w-full flex flex-col gap-5">
                <Experiencia />
            </div>
        </div>
    </div>
</template>