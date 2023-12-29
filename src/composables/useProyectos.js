import { clienteAxios, router } from '../main.js';
import { ref, watchEffect } from 'vue';
import useAuth from './useAuth.js';

const { checkAuth } = useAuth();

const proyecto = ref({});
const proyectosArray = ref([]);

const useProyectos = () => {

    watchEffect( async () => {
        try {
            const { data: { proyectos } } = await clienteAxios('/proyectos/');
            proyectosArray.value = proyectos;
        } catch (error) {
            console.log(error);
        }
    })

    async function guardarProyecto(proyecto) {
        if (!(await checkAuth())) {
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
        
        if (proyecto.id) {
            try {
                const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);
                const proyectosActualizados = proyectosArray.value.map( proyectoState => proyectoState.id === data.id ? data : proyectoState);
                proyectosArray.value = proyectosActualizados;
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/proyectos/', proyecto, config);
                proyectosArray.value = [...proyectosArray.value, data];
            } catch (error) {
                console.log(error)
            }
        }
    }

    function setEdicionProyecto(project) {
        proyecto.value = project;
    }

    async function eliminarProyecto(id) {
        if (!(await checkAuth())) {
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
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
            const proyectosActualizados = proyectosArray.value.filter( proyectoState => proyectoState.id !== id);
            proyectosArray.value = proyectosActualizados;
        } catch (error) {
            console.log(error)
        }
    }

    return {
        proyecto,
        proyectosArray,
        guardarProyecto,
        setEdicionProyecto,
        eliminarProyecto
    }
}

export default useProyectos;