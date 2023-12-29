<script setup>
import { ref, watch, inject } from 'vue';
import useHabilidades from '../../composables/useHabilidades.js';
import range from '../../helpers/range.js';
import Alerta from '../Alerta.vue';

const { guardarHabilidad } = useHabilidades();

const habilidad = inject('habilidad');
const tipos = ['dura', 'blanda'];
const alerta = ref({});

const id = ref(null);
const habilidadNombre = ref('');
const tipo = ref('');
const nivel = ref(null);

watch([habilidad], () => {
    if (habilidad.value?.id) {
        id.value = habilidad.value.id;
        habilidadNombre.value = habilidad.value.habilidad;
        tipo.value = habilidad.value.tipo;
        nivel.value = habilidad.value.nivel;
    }
})

const handleReset = () => {
    id.value = null;
    habilidadNombre.value = '';
    tipo.value = '';
    nivel.value = null;
}

const handleSubmit = e => {
    e.preventDefault();
    
    if ([habilidadNombre.value, tipo.value, nivel.value].includes('')) {
        alerta.value = { msg: 'Todos los campos son obligatorios', error: true };
        setTimeout( () => alerta.value = {}, 3000);
        return;
    }

    const nuevaHabilidad = {
        id: id.value,
        habilidad: habilidadNombre.value,
        tipo: tipo.value,
        nivel: Number(nivel.value)
    }

    try {
        guardarHabilidad(nuevaHabilidad);
        alerta.value = { msg: 'Habilidad guardada correctamente' };
        setTimeout( () => alerta.value = {}, 3000);
    } catch (error) {
        console.log(error);
    }

    handleReset();

};

</script>

<template>
    <Alerta v-if="alerta.msg" :alerta="alerta" />
    <form class="flex flex-col gap-5" @submit="handleSubmit" >
        <div class="flex flex-col gap-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input name="nombre" id="nombre" type="text" class="form-input-white" v-model="habilidadNombre" />
        </div>
        <div class="flex gap-5">
            <div class="flex flex-col gap-3 w-full">
                <label for="tipo" class="form-label">Tipo</label>
                <select name="tipo" id="tipo" class="capitalize form-input-white" v-model="tipo">
                    <option v-for="i in tipos" :value="i" class="capitalize text-base">{{ i }}</option>
                </select>
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="nivel" class="form-label">Nivel</label>
                <select name="nivel" id="nivel" class="capitalize form-input-white" v-model="nivel">
                    <option v-for="i in range(1, 6)" :value="i" class="capitalize text-base">{{ i }}</option>
                </select>
            </div>
        </div>
        <div class="flex gap-3 mt-2">
            <input type="submit" class="btn-green cursor-pointer w-40" :value="id ? 'Editar' : 'Agregar'">
            <input type="button" class="btn-blue cursor-pointer w-40" value="Resetear" @click="handleReset" >
        </div>
    </form>
</template>