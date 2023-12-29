<script setup>
import { clienteAxios } from '../main';
import { ref } from 'vue';
import Alerta from './Alerta.vue'

const nombre = ref('');
const email = ref('');
const mensaje = ref('');
const alerta = ref({});

const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre.value, email.value, mensaje.value].includes('')) {
        alerta.value = {msg: "Todos los campos son obligatorios", error: true};

        setTimeout(() => {
            alerta.value = {};
        }, 3000);
        return;
    }

    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const mensajeCompleto = {
            nombre: nombre.value,
            email: email.value,
            mensaje: mensaje.value
        }

        const { data: { msg } } = await clienteAxios.post('/contacto/async', mensajeCompleto, config);
        alerta.value = {msg: msg};

        setTimeout( () => {
            alerta.value = {};
        }, 3000)
    } catch (error) {
        console.log(error);
        return;
    }

    nombre.value = '';
    email.value = '';
    mensaje.value = '';
};

</script>

<template>
    <Alerta v-if="alerta.msg" :alerta="alerta" />
    <form @submit="handleSubmit" class="flex flex-col gap-3 w-full">
        <label for="nombre" class="form-label">Nombre:</label>
        <input placeholder="Tu nombre. Ej: Jesus Mendez." type="text" name="nombre" id="nombre" class="form-input-white" autocomplete="nombre" v-model="nombre" />
        <label for="email" class="form-label">Email:</label>
        <input placeholder="correo@correo.com" type="email" name="email" id="email" class="form-input-white" autocomplete="email" v-model="email" />
        <label for="mensaje" class="form-label">Mensaje:</label>
        <textarea placeholder="Me gustaría hablar de un proyecto..." name="mensaje" id="mensaje" cols="30" rows="5" class="form-input-white" v-model="mensaje"></textarea>
        <input type="submit" name="submit" class="mt-5 btn-green w-64 hover:cursor-pointer self-center" value="Enviar" />
    </form>
</template>