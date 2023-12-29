<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { endpoints } from '../constants/endpoints.js';
import Modal from '../components/Modal.vue';
import TryEndpoint from '../components/TryEndpoint.vue';

const url = import.meta.env.VITE_BACKEND_URL;

const showModal = ref(false);
const endpoint = ref({});

const handleClick = ep => {
    endpoint.value = ep;
    showModal.value = !showModal.value;
};

</script>

<template>
    <Header />
    <div class="min-h-screen flex flex-col gap-8 items-center justify-center pt-28 pb-12 px-6 sm:px-12 md:px-14 lg:px-20 xl:px-36">
        <div class="w-fit flex flex-col mx-auto max-w-[90%]">
            <div class="w-fit flex flex-col self-center">
                <p class="title text-center">Documentación</p>
                <div class="title-underline w-24"></div>
            </div>
            <p class="text-center dark:text-neutral-300">Documentación de la API de mi curriculum.</p>
            <p class="text-center dark:text-neutral-300">Existen endpoints con métodos <span class="font-semibold text-yellow-500">POST</span>, <span class="font-semibold text-blue-500">PUT</span> y <span class="font-semibold text-red-500">DELETE</span> pero son rutas protegidas.</p>
        </div>
        <div class="w-full p-5 bg-white rounded-xl overflow-x-auto dark:bg-neutral-800">
            <table class="text-base lg:text-lg table-auto w-full">
                <thead class="dark:text-neutral-300">
                    <tr>
                        <th class="px-5 text-start py-2">Método</th>
                        <th class="px-5 text-start py-2">Endpoint</th>
                        <th class="px-5 text-start py-2">Descripción</th>
                        <th class="px-5 text-start py-2">Acción</th>
                    </tr>
                </thead>
                <tbody class="dark:text-neutral-300">
                    <tr v-for="i in endpoints" class="hover:bg-gray-100 border-t border-collapse border-gray-300 dark:hover:bg-neutral-700">
                        <td class="px-5 text-start py-5 font-semibold text-green-500">{{ i.method }}</td>
                        <td class="px-5 text-start py-5">{{ url + '/' + i.path }}<span v-if="i.id" class="text-green-600">{id}</span></td>
                        <td class="px-5 text-start py-5">{{ i.description }}</td>
                        <td class="px-5 text-start py-5 hover:cursor-pointer underline underline-offset-4 text-green-600 hover:text-green-800" @click="() => handleClick(i)">Probar</td>
                    </tr>
                </tbody>
            </table>
            <Modal v-if="showModal" @close="handleClick">
                <template v-slot:body>
                    <TryEndpoint :endpoint="endpoint" />
                </template>
            </Modal>
        </div>
    </div>
    <Footer />
</template>