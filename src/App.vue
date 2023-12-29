<script setup>
import { provide } from 'vue';
import useHabilidades from './composables/useHabilidades';
import useIdiomas from './composables/useIdiomas.js';
import useProyectos from './composables/useProyectos.js';

const { habilidad, habilidadesArray } = useHabilidades();
provide('habilidad', habilidad);
provide('habilidades', habilidadesArray);

const { idioma, idiomasArray } = useIdiomas();
provide('idioma', idioma);
provide('idiomas', idiomasArray);

const { proyecto, proyectosArray } = useProyectos();
provide('proyecto', proyecto);
provide('proyectos', proyectosArray);

</script>

<template :onload="toggleDark()">
    <router-view></router-view>
</template>
