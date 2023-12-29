<script setup>
import { useDark, useToggle } from '@vueuse/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
library.add(faMoon, faSun);

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template>
    <font-awesome-icon
        @click="toggleDark()"
        :icon="isDark ? ['fas', 'sun'] : ['fas', 'moon']"
        size="lg"
        class="self-center hover:cursor-pointer dark:text-neutral-300 select-none"
    />
</template>