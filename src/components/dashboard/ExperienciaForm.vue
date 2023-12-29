<script setup>
import { ref, watch, inject } from 'vue';
import useExperiencia from '../../composables/useExperiencia.js';
import Alerta from '../Alerta.vue';

const { guardarExperiencia } = useExperiencia();

const experiencia = inject('experiencia');
const alerta = ref({});

const id = ref(null);
const empresa = ref('');
const cargo = ref('');
const startYear = ref(null);
const endYear = ref(null);
const descripcion = ref('');

watch([experiencia], () => {
    if (experiencia?.value.id) {
        id.value = experiencia.value.id;
        empresa.value = experiencia.value.empresa;
        cargo.value = experiencia.value.cargo;
        startYear.value = experiencia.value.startYear;
        endYear.value = experiencia.value.endYear;
        descripcion.value = experiencia.value.descripcion;
    }
});

const handleReset = () => {
    id.value = null;
    empresa.value = '';
    cargo.value = '';
    startYear.value = null;
    endYear.value = null;
    descripcion.value = '';
}

const handleSubmit = async e => {
    e.preventDefault();

    if ([empresa.value, cargo.value, startYear.value, descripcion.value].includes('')) {
        alerta.value = { msg: 'Todos los campos son obligatorios', error: true }
        setTimeout( () => alerta.value = {}, 3000);
        return;
    }

    const nuevaExperiencia = {
        id: id.value,
        empresa: empresa.value,
        cargo: cargo.value,
        startYear: Number(startYear.value),
        endYear: Number(endYear.value),
        descripcion: descripcion.value
    }

    try {
        await guardarExperiencia(nuevaExperiencia);
        alerta.value = { msg: 'Experiencia guardada correctamente' }
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
    <form @submit="handleSubmit" class="flex flex-col gap-5 w-full">
        <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-3 w-full">
                <label for="cargo" class="form-label">Cargo</label>
                <input type="text" name="cargo" id="cargo" class="form-input-white w-full" v-model="cargo" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="empresa" class="form-label">Empresa</label>
                <input type="text" name="empresa" id="empresa" class="form-input-white w-full" v-model="empresa" />
            </div>
        </div>
        <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-3 w-full">
                <label for="startyear" class="form-label">Año de inicio</label>
                <input type="text" name="startyear" id="startyear" class="form-input-white w-full" v-model="startYear" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="endyear" class="form-label">Año de finalización</label>
                <input type="text" name="endyear" id="endyear" class="form-input-white w-full" v-model="endYear" />
            </div>
        </div>
        <div class="flex flex-col gap-3 w-full">
            <label for="descripcion" class="form-label">Descripción</label>
            <input type="text" name="descripcion" id="descripcion" class="form-input-white w-full" v-model="descripcion" />
        </div>
        <div class="flex gap-3 mt-2">
            <input type="submit" class="btn-green cursor-pointer w-40" :value="id ? 'Editar' : 'Agregar'">
            <input type="button" class="btn-blue cursor-pointer w-40" value="Resetear" @click="handleReset" >
        </div>
    </form>
</template>