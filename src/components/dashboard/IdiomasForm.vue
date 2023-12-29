<script setup>
import { ref, watch, inject } from 'vue';
import useIdiomas from '../../composables/useIdiomas';
import Alerta from '../Alerta.vue';

const { guardarIdioma } = useIdiomas();

const idioma = inject('idioma');
const niveles = ['Nativo', 'Avanzado', 'Medio/Avanzado', 'Medio', 'Principiante'];
const alerta = ref({});

const id = ref(null);
const language = ref('');
const nivel = ref('');

watch([idioma], () => {
    if (idioma.value?.id) {
        id.value = idioma.value.id;
        language.value = idioma.value.language;
        nivel.value = idioma.value.nivel;
    }
})

const handleReset = () => {
    id.value = null;
    language.value = '';
    nivel.value = '';
};

const handleSubmit = e => {
    e.preventDefault();

    if ([language.value, nivel.value].includes('')) {
        alerta.value = { msg: 'Todos los campos son obligatorios', error: true };
        setTimeout( () => alerta.value = {}, 3000);
        return;
    }

    const nuevoIdioma = {
        id: id.value,
        language: language.value,
        nivel: nivel.value
    }

    try {
        guardarIdioma(nuevoIdioma);
        alerta.value = { msg: 'Idioma guardado correctamente' };
        setTimeout( () => alerta.value = {}, 3000);
    } catch (error) {
        alerta.value = { msg: 'Hubo un error en la petición', error: true };
        setTimeout( () => alerta.value = {}, 3000);
        return;
    }

    handleReset();

};

</script>

<template>
    <Alerta v-if="alerta.msg" :alerta="alerta" />
    <form class="flex flex-col gap-5" @submit="handleSubmit" >
        <div class="flex gap-5">
            <div class="flex flex-col gap-3 w-full">
                <label for="idioma" class="form-label">Idioma</label>
                <input name="idioma" id="idioma" type="text" class="form-input-white" v-model="language" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="tipo" class="form-label">Nivel</label>
                <select name="tipo" id="tipo" class="capitalize form-input-white" v-model="nivel">
                    <option v-for="i in niveles" :value="i" class="capitalize text-base">{{ i }}</option>
                </select>
            </div>
        </div>
        <div class="flex gap-3 mt-2">
            <input type="submit" class="btn-green cursor-pointer w-40" :value="id ? 'Editar' : 'Agregar'">
            <input type="button" class="btn-blue cursor-pointer w-40" value="Resetear" @click="handleReset" >
        </div>
    </form>
</template>