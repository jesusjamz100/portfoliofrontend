import useAuth from "./useAuth.js";
import { clienteAxios, router } from "../main.js";
import { ref, watchEffect } from "vue";

const { checkAuth } = useAuth();

const habilidad = ref({});
const habilidadesArray = ref([]);

const useHabilidades = () => {

    watchEffect( async () => {
        try {
            const { data: { habilidades } } = await clienteAxios('/habilidades/');
            habilidadesArray.value = habilidades;
        } catch (error) {
            console.log(error);
        }
    })

    async function guardarHabilidad(habilidad) {
        if (!checkAuth()) {
            await router.push('/');
            return;
        }

        const token = document.cookie.match('(^|;)?' + 'Authorization' + '=([^;]*)(;|$)');
        const config = {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token[2]}`
            }
        }

        if (habilidad.id) {
            try {
                const { data } = await clienteAxios.put(`/habilidades/${habilidad.id}`, habilidad, config);
                const habilidadesActualizadas = habilidadesArray.value.map( habilidadState => habilidadState.id === data.id ? data : habilidadState);
                habilidadesArray.value = habilidadesActualizadas;
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await clienteAxios.post(`/habilidades/`, habilidad, config);
                habilidadesArray.value = [...habilidadesArray.value, data];
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function eliminarHabilidad(id) {
        if (!checkAuth()) {
            await router.push('/');
            return;
        }

        const token = document.cookie.match('(^|;)?' + 'Authorization' + '=([^;]*)(;|$)');
        const config = {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token[2]}`
            }
        }

        try {
            const { data } = await clienteAxios.delete(`/habilidades/${id}`, config);
            const habilidadesActualizadas = habilidadesArray.value.filter( habilidadState => habilidadState.id !== id);
            habilidadesArray.value = habilidadesActualizadas;
        } catch (error) {
            console.log(error);
        }
    }

    function setEdicionHabilidad (skill) {
        habilidad.value = skill;
    }

    return {
        habilidad,
        habilidadesArray,
        guardarHabilidad,
        setEdicionHabilidad,
        eliminarHabilidad
    }
}

export default useHabilidades;