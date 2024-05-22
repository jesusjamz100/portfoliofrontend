<script setup>
import Idiomas from '../../components/Idiomas.vue';
import IdiomasForm from '../../components/dashboard/IdiomasForm.vue';

</script>

<template>
    <div class="px-10 pt-10 flex flex-col">
        <div class="flex flex-col gap-2">
            <p class="title-db">Idiomas</p>
            <div class="title-underline w-12"></div>
        </div>
        <div class="flex gap-10">
            <div class="w-full">
                <IdiomasForm />
            </div>
            <div class="w-full flex flex-wrap gap-5 h-fit">
                <Idiomas :all="true" :dashboard="true" />
            </div>
        </div>
    </div>
</template>