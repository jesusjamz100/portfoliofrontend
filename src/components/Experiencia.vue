<script setup>
import { ref, inject } from 'vue';
import useExperiencia from '../composables/useExperiencia.js';
import Alerta from './Alerta.vue';
import Spinner from './Spinner.vue';

const { eliminarExperiencia, setEdicionExperiencia } = useExperiencia();

const experiencias = inject('experiencias');
const alerta = ref({});

const handleClick = id => {
    eliminarExperiencia(id);
    alerta.value = { msg: 'Se ha eliminado correctamente' };
    setTimeout(() => {
        alerta.value = {};
    }, 3000);
};

</script>

<template>
    <Alerta v-if="alerta.msg" :alerta="alerta" />
    <Spinner v-if="experiencias.length === 0" />
    <div v-for="i in experiencias" class="flex justify-between p-5 rounded-lg shadow-lg w-full bg-white dark:bg-neutral-800">
        <div class="flex flex-col gap-2 w-full">
            <p class="font-semibold dark:text-neutral-300">{{ i.cargo }}</p>
            <p class="dark:text-neutral-300">{{ i.empresa }}</p>
            <p class="dark:text-neutral-300">{{ i.startYear }} - {{ i.endYear ? i.endYear : 'Presente' }}</p>
            <p class="dark:text-neutral-300">{{ i.descripcion }}</p>
        </div>
        <div class="flex xl:flex-row flex-col gap-x-2 gap-y-2 xl:w-[56%] w-fit xl:justify-end justify-normal xl:pl-0 pl-3">
            <button class="btn-blue w-fit h-fit text-sm" @click="() => setEdicionExperiencia(i)">Editar</button>
            <button class="btn-red w-fit h-fit text-sm" @click="() => handleClick(i.id)">Eliminar</button>
        </div>
    </div>
</template>