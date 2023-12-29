<script setup>
import Educacion from '../components/Educacion.vue';
import EducacionForm from '../components/dashboard/EducacionForm.vue';
import useEducacion from '../composables/useEducacion.js';
import { provide } from 'vue';

const { educacionArray, educacion } = useEducacion();

provide('educacionArray', educacionArray);
provide('educacion', educacion);

</script>

<template>
    <div class="px-10 pt-10 flex flex-col">
        <div class="flex flex-col gap-2">
            <p class="title-db">Educación</p>
            <div class="title-underline w-9"></div>
        </div>
        <div class="flex gap-10">
            <div class="w-full">
                <EducacionForm />
            </div>
            <div class="w-full flex flex-col gap-5">
                <Educacion :dashboard="true" />
            </div>
        </div>
    </div>
</template>