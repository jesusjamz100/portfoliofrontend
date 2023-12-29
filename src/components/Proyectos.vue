<script setup>
import { ref, inject } from 'vue';
import useProyectos from '../composables/useProyectos.js';
import Alerta from './Alerta.vue';
import Spinner from './Spinner.vue';

const props = defineProps({
    all: Boolean,
    dashboard: Boolean
})

const { eliminarProyecto, setEdicionProyecto } = useProyectos();

const proyectosArray = inject('proyectos');
const todos = ref(props.all);
const alerta = ref({});

const handleClick = () => {
    todos.value = !todos.value;
};

const handleEliminar = id => {
    eliminarProyecto(id);
    alerta.value = { msg: 'Proyecto eliminado correctamente' };
    setTimeout( () => alerta.value = {});
};

</script>

<template>
    <Alerta v-if="alerta.msg" :alerta="alerta" />
    <Spinner v-if="proyectosArray.length === 0" />
    <div v-for="i in proyectosArray.slice(0, todos ? proyectosArray.length : 3)" class="flex flex-col lg:flex-row gap-10 items-center w-full" :class="dashboard ? 'bg-white p-5 rounded-lg shadow-lg dark:bg-neutral-800' : ''">
        <div v-if="!dashboard" class="max-w-fit">
            <img src="/sampleImage2.avif" :alt="`project-${i.id}`" class="project-img border-[1px] border-gray-300 rounded-lg">
        </div>
        <div :class="`${dashboard ? 'gap-3' : 'gap-5'} flex w-full`">
            <div :class="`${dashboard ? 'gap-3' : 'gap-5 text-center lg:text-left'} flex flex-col w-full`">
                <p class="font-semibold dark:text-neutral-300" :class="dashboard ? 'text-base' : 'text-xl'">{{ i.titulo }}</p>
                <p class="dark:text-neutral-300" :class="dashboard ? 'text-base' : 'text-lg'">{{ i.descripcion }}</p>
                <div v-if="i.tecnologias.length >= 1" class="flex flex-wrap gap-5 w-full h-fit" :class="!dashboard ? 'justify-center lg:justify-normal' : ''">
                    <p v-for="tecnologia in i.tecnologias" :class="`${dashboard ? 'text-xs' : ''} habilidad`">{{ tecnologia }}</p>
                </div>
            </div>
            <div v-if="dashboard" class="flex xl:flex-row flex-col gap-x-2 gap-y-2 xl:w-[56%] w-fit xl:justify-end justify-normal xl:pl-0 pl-3">
                <button class="btn-red text-sm h-fit" @click="() => handleEliminar(i.id)">Eliminar</button>
                <button class="btn-blue text-sm h-fit" @click="() => setEdicionProyecto(i)">Editar</button>
            </div>
        </div>
    </div>
    <button v-if="!todos && proyectosArray.length > 3 && !dashboard" class="place-self-center btn-green" @click="handleClick">Ver Más</button>
    <button v-else-if="todos && proyectosArray.length > 3 && !dashboard" class="place-self-center btn-green" @click="handleClick">Ver Menos</button>
</template>