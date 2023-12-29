import { clienteAxios, router } from "../main";
import { ref, watchEffect } from "vue";
import useAuth from "./useAuth";

const { checkAuth } = useAuth();

const educacionArray = ref([]);
const educacion = ref({});

const useEducacion = () => {

    watchEffect( async () => {
        try {
            const { data: { educacion } } = await clienteAxios('/educacion/');
            const sortedEducacion = educacion.sort( (p1, p2) => {
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
            educacionArray.value = sortedEducacion;
        } catch (error) {
            console.log(error);
        }
    })

    async function guardarEducacion(educacion) {
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

        if (educacion.id) {
            const { data } = await clienteAxios.put(`/educacion/${educacion.id}`, educacion, config);
            const educacionActualizada = educacionArray.value.map( educacionState => educacionState.id === data.id ? data : educacionState);
            educacionArray.value = educacionActualizada;
        } else {
            try {
                const { data } = await clienteAxios.post('/educacion/', educacion, config);
                const { ...educacionAlmacenada } = data;
                educacionArray.value = [educacionAlmacenada, ...educacionArray.value];
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function setEdicionEducacion(educ) {
        educacion.value = educ;
    }

    async function eliminarEducacion(id) {
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
            const { data } = await clienteAxios.delete(`educacion/${id}`, config);
            const educacionActualizada = educacionArray.value.filter( educacionState => educacionState.id !== id);
            educacionArray.value = educacionActualizada;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        educacion,
        educacionArray,
        guardarEducacion,
        eliminarEducacion,
        setEdicionEducacion
    }
}

export default useEducacion;