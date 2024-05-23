<script setup>
import { ref, inject, watch } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import useProyectos from '../../composables/useProyectos.js'
import Alerta from '../Alerta.vue';

library.add(faImage)

const { guardarProyecto } = useProyectos();

const habilidades = inject('habilidades');
const proyecto = inject('proyecto');
const alerta = ref({});

const github = ref(false);
const deploy = ref(false);

const id = ref(null);
const titulo = ref('');
const descripcion = ref('');
const tecnologias = ref([]);
const startDate = ref('');
const endDate = ref('');
const githubLinks = ref([]);
const deployLinks = ref([]);
const githubLinkFront = ref('');
const githubLinkBack = ref('');
const deployLinkFront = ref('');
const deployLinkBack = ref('');

const selectedFile = ref(null);
const imageUrl = ref('');

watch([proyecto], () => {
    if (proyecto.value?.id) {
        id.value = proyecto.value.id;
        titulo.value = proyecto.value.titulo;
        descripcion.value = proyecto.value.descripcion;
        tecnologias.value = proyecto.value.tecnologias;
        startDate.value = proyecto.value.startDate;
        endDate.value = proyecto.value.endDate;
        githubLinks.value = proyecto.value.githubLinks;
        deployLinks.value = proyecto.value.deployLinks;

        githubLinkBack.value = githubLinks.value[1];
        githubLinkFront.value = githubLinks.value[0];

        deployLinkBack.value = deployLinks.value[1];
        deployLinkFront.value = deployLinks.value[0];

        github.value = true;
        deploy.value = true;
    }
})

const showGithub = () => {
    github.value = !github.value;
}

const showDeploy = () => {
    deploy.value = !deploy.value;
}

const handleReset = () => {
    id.value = null;
    titulo.value = '';
    descripcion.value = '';
    tecnologias.value = [];
    startDate.value = '';
    endDate.value = '';
    githubLinks.value = [];
    deployLinks.value = [];
    githubLinkFront.value = '';
    githubLinkBack.value = '';
    deployLinkFront.value = '';
    deployLinkBack.value = '';
    github.value = false;
    deploy.value = false;
    selectedFile.value = null;
}

const handleFileChange = e => {
    selectedFile.value = e.target.files[0];
    imageUrl.value = URL.createObjectURL(selectedFile.value);
}

const handleSubmit = e => {
    e.preventDefault();
    
    if ([titulo.value, descripcion.value, tecnologias.value, startDate.value].includes('')) {
        alerta.value = { msg: 'Todos los campos son obligatorios', error: true };
        setTimeout( () => alerta.value = {}, 3000);
        return;
    }

    githubLinks.value = githubLinkFront.value && githubLinkBack.value ? [githubLinkFront.value, githubLinkBack.value]
        : githubLinkFront.value ? [githubLinkFront.value, null]
        : githubLinkBack.value ? [null, githubLinkBack.value]
        : [];

    deployLinks.value = deployLinkFront.value && deployLinkBack.value ? [deployLinkFront.value, deployLinkBack.value]
        : deployLinkFront.value ? [deployLinkFront.value, null]
        : deployLinkBack.value ? [null, deployLinkBack.value]
        : [];

    const nuevoProyecto = {
        id: id.value,
        titulo: titulo.value,
        descripcion: descripcion.value,
        tecnologias: tecnologias.value,
        startDate: startDate.value,
        endDate: endDate.value,
        githubLinks: githubLinks.value,
        deployLinks: deployLinks.value
    }

    const formData = new FormData();
    formData.append('proyecto', JSON.stringify(nuevoProyecto))
    if (selectedFile.value) {
        formData.append('image', selectedFile.value)
    }

    try {
        guardarProyecto(formData);
        alerta.value = { msg: 'Proyecto guardado correctamente' };
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
    <form class="flex flex-col gap-5 w-full" @submit="handleSubmit">
        <div class="w-full">
            <div class="flex flex-col gap-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" name="nombre" id="nombre" class="form-input-white" v-model="titulo" />
            </div>
        </div>
        <div class="w-full">
            <div class="flex flex-col gap-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <input type="text" name="descripcion" id="descripcion" class="form-input-white" v-model="descripcion" />
            </div>
        </div>
        <div class="flex gap-5 w-full">
            <div class="flex flex-col gap-3 w-full">
                <label for="startdate" class="form-label">Fecha de inicio</label>
                <input type="date" name="startdate" id="startdate" class="form-input-white" v-model="startDate" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="enddate" class="form-label">Fecha de finalización</label>
                <input type="date" name="enddate" id="enddate" class="form-input-white" v-model="endDate" />
            </div>
        </div>
        <p class="decoration-gray-600 underline text-gray-600 select-none hover:cursor-pointer dark:text-neutral-300" @click="showGithub">Links de Github</p>
        <div :class="github ? 'flex gap-5 w-full' : 'hidden'">
            <div class="flex flex-col gap-3 w-full">
                <label for="githubfront" class="form-label">Frontend</label>
                <input type="url" name="githubfront" id="githubfront" class="form-input-white" v-model="githubLinkFront" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="githubback" class="form-label">Backend</label>
                <input type="url" name="githubback" id="githubback" class="form-input-white" v-model="githubLinkBack" />
            </div>
        </div>
        <p class="decoration-gray-600 underline text-gray-600 select-none hover:cursor-pointer dark:text-neutral-300" @click="showDeploy">Links de Deploy</p>
        <div :class="deploy ? 'flex gap-5 w-full' : 'hidden'">
            <div class="flex flex-col gap-3 w-full">
                <label for="deployfront" class="form-label">Frontend</label>
                <input type="url" name="deployfront" id="deployfront" class="form-input-white" v-model="deployLinkFront" />
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="deployback" class="form-label">Backend</label>
                <input type="url" name="deployback" id="deployback" class="form-input-white" v-model="deployLinkBack" />
            </div>
        </div>
        <label for="tecnologias" class="form-label">Tecnologias</label>
        <select class="form-input-white" name="tecnologias" id="tecnologias" multiple v-model="tecnologias">
            <option v-for="i in habilidades" :value="i.habilidad">{{ i.habilidad }}</option>
        </select>
        <div class="w-full">
            <div class="flex flex-col gap-3">
                <label for="thumbnail" class="form-label text-base hover:cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'image']" />
                    Thumbnail
                </label>
                <input type="file" name="thumbnail" id="thumbnail" class="hidden" @change="handleFileChange" />
                <p v-if="selectedFile">{{ selectedFile.name }}</p>
                <img v-if="selectedFile" :src="imageUrl" alt="" class="max-w-full max-h-[350px] h-auto">
            </div>
        </div>
        <div class="flex gap-3 mt-2">
            <input type="submit" class="btn-green cursor-pointer w-40" :value="id ? 'Editar' : 'Agregar'">
            <input type="button" class="btn-blue cursor-pointer w-40" value="Resetear" @click="handleReset" >
        </div>
    </form>
</template>