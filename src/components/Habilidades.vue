<script setup>
import { ref, inject } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import useHabilidades from '../composables/useHabilidades.js';
import Alerta from './Alerta.vue';
import Spinner from './Spinner.vue';

library.add(faPencil, faTrash);

const props = defineProps({
    all: Boolean,
    dashboard: Boolean
})

const { setEdicionHabilidad, eliminarHabilidad } = useHabilidades();
const alerta = ref({});

const todos = ref(props.all);
const habilidadesArray = inject('habilidades');

const handleClickDelete = async id => {
    await eliminarHabilidad(id);
    alerta.value = { msg: 'Habilidad eliminada correctamente' };
    setTimeout( () => alerta.value = {}, 3000);
}

const handleClick = () => {
    todos.value = !todos.value;
};

</script>

<template>
    <Alerta v-if="dashboard && alerta.msg" :alerta="alerta" />
    <Spinner v-if="habilidadesArray.length === 0" />
    <p v-if="todos || all" v-for="i in habilidadesArray" class="habilidad h-fit">
        {{ i.habilidad }} 
        <font-awesome-icon v-if="dashboard"
            :icon="['fas', 'pencil']"
            class="hover:cursor-pointer hover:text-blue-600" @click="() => setEdicionHabilidad(i)" /> <span> </span>
        <font-awesome-icon v-if="dashboard"
            :icon="['fas', 'trash']"
            class="hover:cursor-pointer hover:text-red-600" @click="async () => await handleClickDelete(i.id)" />
    </p>

    <p v-else v-for="i in habilidadesArray.slice(0, 5)" class="habilidad">
        {{ i.habilidad }} <font-awesome-icon :icon="['fas', 'pencil']" /></p>

    <p v-if="!todos && !props.all" class="place-self-center hover:cursor-pointer hover:text-green-500" @click="handleClick">Ver Más</p>
    <p v-else-if="todos && !props.all" class="place-self-center hover:cursor-pointer hover:text-green-500" @click="handleClick">Ver Menos</p>
</template>