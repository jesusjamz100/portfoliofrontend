<script>
export default {
    name: 'Modal',
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal">
            <button class="text-end w-full text-xl text-gray-500 mb-5" @click="close">X</button>
            <slot name="body"></slot>
        </div>
    </div>
</template>