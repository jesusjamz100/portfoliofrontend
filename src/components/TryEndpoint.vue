<script setup>
import { ref } from 'vue';
import { clienteAxios } from '../main';
import { JsonViewer } from 'vue3-json-viewer';
import "vue3-json-viewer/dist/index.css";
import Spinner from './Spinner.vue';

const url = import.meta.env.VITE_BACKEND_URL;

const props = defineProps({
    endpoint: Object
});

const id = ref('');

if (props.endpoint.path === 'educacion/') {
    id.value = '657bad830a6cf6087328c401';
} else if (props.endpoint.path === 'experiencia/') {
    id.value = '6572575ee0990bd9982d48d4';
} else if (props.endpoint.path === 'habilidades/') {
    id.value = '65720698aa148fcad61807eb';
} else if (props.endpoint.path === 'idiomas/') {
    id.value = '656f8b3a8d0e6c2cd0727703';
} else if (props.endpoint.path === 'proyectos/') {
    id.value = '657273cd0e979e1376f9f8ef';
}

const result = ref(null);
const spinner = ref(false);

const handleSubmit = async e => {
    e.preventDefault();
    
    if (props.endpoint.id) {
        try {
            spinner.value = true;
            const { data } = await clienteAxios(`${props.endpoint.path}${id.value}`);
            spinner.value = false
            result.value = data;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            spinner.value = true;
            const { data } = await clienteAxios(props.endpoint.path);
            spinner.value = false;
            result.value = data;
        } catch (error) {
            console.log(error);
        }
    }
};

</script>

<template>
    <div class="flex flex-col w-full">
        <form @submit="handleSubmit" class="self-center mb-5 w-full">
            <div class="flex w-full">
                <p class="rounded-s-xl bg-slate-200 p-4 text-lg font-semibold text-green-500 dark:bg-zinc-950">GET</p>
                <input
                    class="bg-slate-100 px-3 w-full dark:bg-zinc-900 dark:text-neutral-300"
                    type="text"
                    :value="url + '/' + endpoint.path + (endpoint.id ? id : '')"
                    disabled />
                <input class="btn-green rounded-s-none hover:cursor-pointer" type="submit" value="Probar" :disabled="result ? true : false" />
            </div>
        </form>
        <Spinner v-if="spinner" />
        <div v-if="result" class="h-fit max-h-80 overflow-y-auto dark:hidden">
            <JsonViewer :value="result" copyable boxed sort theme="light" />
        </div>
        <div v-if="result" class="h-fit max-h-80 overflow-y-auto hidden dark:block">
            <JsonViewer :value="result" copyable boxed sort theme="dark" />
        </div>
    </div>
</template>