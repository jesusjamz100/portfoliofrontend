<script setup>
import { clienteAxios } from '../main';
import { ref, reactive } from 'vue';
import { router } from '../main.js';
import DarkButton from '../components/DarkButton.vue';

import useAuth from '../composables/useAuth.js';

import Alerta from '../components/Alerta.vue';

const alerta = ref({});

const formData = reactive({
    username: '',
    password: ''
})

const { logIn } = useAuth();

const handleSubmit = async e => {
    e.preventDefault();
    
    if ([formData.username, formData.password].includes('')) {
        alerta.value = { msg: 'Todos los campos son obligatorios', error: true };
        setTimeout(() => {
            alerta.value = {};
        }, 3000);
        return;
    }

    const userCredentials = {
        username: formData.username,
        password: formData.password
    }

    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    try {
        const { data: { access_token } } = await clienteAxios.post('/users/token', userCredentials, config);
        logIn(access_token);
        await router.push('/dashboard');
    } catch (error) {
        alerta.value = {msg: error.response.data.detail, error: true};
        setTimeout(() => {
            alerta.value = {};
        }, 3000);
        return;
    }

    formData.username = '';
    formData.password = '';
};
</script>

<template>
    <div class="absolute top-5 right-5">
        <DarkButton />
    </div>
    <div class="h-screen md:px-0 px-10 flex justify-center items-center">
        <div class="lg:w-[40%] md:w-[70%] w-full h-fit card-white py-14 px-16 shadow-lg flex flex-col gap-6 items-center">
            <Alerta v-if="alerta.msg" :alerta="alerta" />
            <p class="text-center text-2xl font-bold dark:text-neutral-300 w-full">Iniciar Sesión</p>
            <form @submit="handleSubmit" class="flex flex-col gap-3 w-full">
                <label for="username" class="form-label">Usuario:</label>
                <input type="text" name="username" id="username" class="form-input-gray" autocomplete="username" v-model="formData.username" />
                <label for="password" class="form-label">Contraseña:</label>
                <input type="password" name="password" id="password" class="form-input-gray" autocomplete="current-password" v-model="formData.password" />
                <input type="submit" name="submit" class="mt-5 btn-green w-fit hover:cursor-pointer self-center" value="Iniciar Sesión" />
            </form>
            <router-link to="/" class="text-gray-400 underline text-sm dark:text-neutral-300">Volver al Inicio</router-link>
        </div>
    </div>
</template>