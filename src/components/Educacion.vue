<script setup>
import { ref, inject } from 'vue';
import useEducacion from '../composables/useEducacion.js';
import Alerta from './Alerta.vue';
import Spinner from './Spinner.vue';

const props = defineProps({
    dashboard: Boolean
})

const { eliminarEducacion, setEdicionEducacion } = useEducacion();

const educacionArray = inject('educacionArray');
const alerta = ref({});

const handleClick = id => {
    eliminarEducacion(id);
    alerta.value = { msg: 'La educacion fue eliminada' }
    setTimeout( () => {
        alerta.value = {};
    }, 3000)
};

</script>

<template>
    <Alerta v-if="alerta.msg" :alerta="alerta" />
    <Spinner v-if="educacionArray.length === 0" />
    <div v-for="i in educacionArray" class="flex justify-between p-5 rounded-lg shadow-lg w-full bg-white dark:bg-neutral-800">
        <div class="flex flex-col gap-2 w-full">
            <p class="font-semibold dark:text-neutral-300">{{ i.tipo }} en {{ i.titulo }}</p>
            <p class="dark:text-neutral-300" v-if="i.minor">Mención: {{ i.minor }}</p>
            <p class="dark:text-neutral-300">{{ i.institucion }}</p>
            <p class="dark:text-neutral-300">{{ i.startYear }} - {{ i.endYear ? i.endYear : 'Presente' }}</p>
            <p class="dark:text-neutral-300">{{ i.description }}</p>
        </div>
        <div v-if="dashboard" class="flex xl:flex-row flex-col gap-x-2 gap-y-2 xl:w-[56%] w-fit xl:justify-end justify-normal xl:pl-0 pl-3">
            <button class="btn-blue w-fit h-fit text-sm" @click="() => setEdicionEducacion(i)">Editar</button>
            <button class="btn-red w-fit h-fit text-sm" @click="() => handleClick(i.id)">Eliminar</button>
        </div>
    </div>
</template>