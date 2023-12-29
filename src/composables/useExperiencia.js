import { clienteAxios, router } from "../main.js";
import useAuth from './useAuth.js';
import { ref, watchEffect } from "vue";

const { checkAuth } = useAuth();

const experiencias = ref([]);
const experiencia = ref({});

const useExperiencia = () => {
    
    watchEffect( async () => {
        try {
            const { data: { experiencia } } = await clienteAxios('/experiencia/');
            const sortedExperiencia = experiencia.sort( (p1, p2) => {
                if (!p1.endYear) {
                    return -1
                } else if (!p2.endYear) {
                    return 1
                } else if (p1.endYear < p2.endYear) {
                    return 1
                } else if (p1.endYear > p2.endYear) {
                    return -1
                } 
                return 0
            })
            experiencias.value = sortedExperiencia;
        } catch (error) {
            console.log(error);
        }
    })

    async function guardarExperiencia(experiencia) {
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

        if (experiencia.id) {
            try {
                const { data } = await clienteAxios.put(`/experiencia/${experiencia.id}`, experiencia, config);
                const experienciasActualizadas = experiencias.value.map( experienciaState => experienciaState.id === data.id ? data : experienciaState);
                experiencias.value = experienciasActualizadas;
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/experiencia/', experiencia, config);
                const { ...experienciaAlmacenada } = data;
                experiencias.value = [experienciaAlmacenada, ...experiencias.value];
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function eliminarExperiencia(id) {
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
            const { data } = await clienteAxios.delete(`/experiencia/${id}`, config);
            const experienciasActualizadas = experiencias.value.filter( experienciaState => experienciaState.id !== id);
            experiencias.value = experienciasActualizadas;
        } catch (error) {
            console.log(error);
        }
    }

    function setEdicionExperiencia(exp) {
        experiencia.value = exp;
    }

    return {
        experiencia,
        experiencias,
        guardarExperiencia,
        setEdicionExperiencia,
        eliminarExperiencia
    }
}

export default useExperiencia;