<script setup>

const props = defineProps({
    alerta: Object
});

const { msg, error } = props.alerta;

</script>

<template>
    <div :class="`p-3 w-full rounded-lg mb-5 ${ error ? 'bg-red-400' : 'bg-green-400' }`">
        <p class="text-white font-semibold text-center">{{ msg }}</p>
    </div>
</template>