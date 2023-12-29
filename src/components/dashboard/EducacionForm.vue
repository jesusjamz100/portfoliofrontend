<script setup>
import { ref, inject, watch } from 'vue';
import useEducacion from '../../composables/useEducacion.js';
import Alerta from '../Alerta.vue';

const { guardarEducacion } = useEducacion();

const alerta = ref({});

const educacion = inject('educacion');

const id = ref(null);
const titulo = ref('');
const tipo = ref('');
const institucion = ref('');
const startYear = ref(null);
const endYear = ref(null);
const minor = ref('');
const description = ref('');

watch([educacion], () => {
    if(educacion.value?.id) {
        id.value = educacion.value.id;
        titulo.value = educacion.value.titulo;
        tipo.value = educacion.value.tipo;
        institucion.value = educacion.value.institucion;
        startYear.value = educacion.value.startYear;
        endYear.value = educacion.value.endYear;
        minor.value = educacion.value.minor;
        description.value = educacion.value.description;
    }
})

const handleReset = () => {
    id.value = null;
    titulo.value = '';
    tipo.value = '';
    institucion.value = '';
    startYear.value = '';
    endYear.value = '';
    minor.value = '';
    description.value = '';
}

const handleSubmit = async e => {
    e.preventDefault();

    if ([titulo.value, tipo.value, institucion.value, startYear.value, description.value].includes('')) {
        alerta.value = { msg: 'Todos los campos son obligatorios', error: true }
        setTimeout( () => alerta.value = {}, 3000);
        return;
    }

    const nuevaEducacion = {
        id: id.value,
        titulo: titulo.value,
        tipo: tipo.value,
        institucion: institucion.value,
        startYear: Number(startYear.value),
        endYear: Number(endYear.value),
        minor: minor.value,
        description: description.value
    };
    
    try {
        await guardarEducacion(nuevaEducacion);
        alerta.value = { msg: 'Educación guardada correctamente' };
        setTimeout( () => alerta.value = {}, 3000);
    } catch (error) {
        console.log(error);
        return;
    }

    handleReset();
};

</script>

<template>
    <Alerta v-if="alerta.msg" :alerta="alerta" />
    <form class="flex flex-col gap-4 w-full" @submit="handleSubmit">
        <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-3 w-full">
                <label for="titulo" class="form-label">Titulo</label>
                <input name="titulo" id="titulo" type="text" class="form-input-white w-full" v-model="titulo" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="tipo" class="form-label">Tipo</label>
                <input name="tipo" id="tipo" type="text" class="form-input-white w-full" v-model="tipo" />
            </div>
        </div>
        <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-3 w-full">
                <label for="institucion" class="form-label">Institucion</label>
                <input name="institucion" id="institucion" type="text" class="form-input-white w-full" v-model="institucion" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="startyear" class="form-label">Año de inicio</label>
                <input name="startyear" id="startyear" type="number" class="form-input-white w-full" v-model="startYear" />
            </div>
        </div>
        <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-3 w-full">
                <label for="endyear" class="form-label">Año de finalización</label>
                <input name="endyear" id="endyear" type="number" class="form-input-white w-full" v-model="endYear" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="minor" class="form-label">Especialización</label>
                <input name="minor" id="minor" type="text" class="form-input-white w-full" v-model="minor" />
            </div>
        </div>
        <label for="descripcion" class="form-label">Descripcion</label>
        <input name="descripcion" id="descripcion" type="text" class="form-input-white w-full" v-model="description" />
        <div class="flex gap-3 mt-2">
            <input type="submit" name="submit" id="submit" class="btn-green w-40" :value="id ? 'Editar' : 'Agregar'" />
            <input type="button" name="reset" id="reset" class="btn-blue w-40" value="Resetear" @click="handleReset" >
        </div>
    </form>
</template>