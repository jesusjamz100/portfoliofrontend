<script setup>
import Proyectos from '../../components/Proyectos.vue';
import ProyectosForm from '../../components/dashboard/ProyectosForm.vue';
</script>

<template>
    <div class="px-10 pt-10 flex flex-col">
        <div class="flex flex-col gap-2">
            <p class="title-db">Proyectos</p>
            <div class="title-underline w-9"></div>
        </div>
        <div class="flex gap-10">
            <div class="w-full">
                <ProyectosForm />
            </div>
            <div class="w-full flex flex-col gap-5">
                <Proyectos :all="true" :dashboard="true" />
            </div>
        </div>
    </div>
</template>