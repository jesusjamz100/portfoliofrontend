<script setup>
import { ref, inject } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import useIdiomas from '../composables/useIdiomas.js';
import Alerta from './Alerta.vue';
import Spinner from './Spinner.vue';

library.add(faPencil, faTrash);

const props = defineProps({
    all: Boolean,
    dashboard: Boolean
})

const { setEdicionIdioma, eliminarIdioma } = useIdiomas();

const todos = ref(props.all);
const idiomasArray = inject('idiomas');
const alerta = ref({});

const handleClickDelete = async id => {
    await eliminarIdioma(id);
    alerta.value = { msg: 'Idioma eliminado correctamente' };
    setTimeout( () => alerta.value = {}, 3000);
}

const handleClick = () => {
    todos.value = !todos.value;
};

</script>

<template>
    <Alerta v-if="dashboard && alerta.msg" :alerta="alerta" />
    <Spinner v-if="idiomasArray.length === 0" />
    <p v-if="todos || all" v-for="i in idiomasArray" class="habilidad">
        {{ i.language }} 
        <font-awesome-icon v-if="dashboard"
            :icon="['fas', 'pencil']"
            class="hover:cursor-pointer hover:text-blue-600" @click="() => setEdicionIdioma(i)" /> <span> </span>
        <font-awesome-icon v-if="dashboard"
            :icon="['fas', 'trash']"
            class="hover:cursor-pointer hover:text-red-600" @click="() => handleClickDelete(i.id)" />
    </p>

    <p v-else v-for="i in idiomasArray.slice(0, 3)" class="habilidad">
    {{ i.language }}</p>

    <p v-if="!todos && !all" class="place-self-center hover:cursor-pointer hover:text-green-500" @click="handleClick">Ver Más</p>
    <p v-else-if="todos && !all" class="place-self-center hover:cursor-pointer hover:text-green-500" @click="handleClick">Ver Menos</p>
</template>