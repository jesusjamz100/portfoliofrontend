<script setup>
import Habilidades from '../../components/Habilidades.vue';
import HabilidadesForm from '../../components/dashboard/HabilidadesForm.vue';

</script>

<template>
    <div class="px-10 pt-10 flex flex-col">
        <div class="flex flex-col gap-2">
            <p class="title-db">Habilidades</p>
            <div class="title-underline w-12"></div>
        </div>
        <div class="flex gap-10">
            <div class="w-full">
                <HabilidadesForm />
            </div>
            <div class="w-full flex flex-wrap gap-5 h-fit">
                <Habilidades :all="true" :dashboard="true" />
            </div>
        </div>
    </div>
</template>