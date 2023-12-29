import useAuth from "./useAuth.js";
import { clienteAxios, router } from "../main.js";
import { ref, watchEffect } from "vue";

const { checkAuth } = useAuth();

const idioma = ref({});
const idiomasArray = ref([]);

const useIdiomas = () => {

    watchEffect( async () => {
        try {
            const { data: { idiomas } } = await clienteAxios('/idiomas/');
            idiomasArray.value = idiomas;
        } catch (error) {
            console.log(error)
        }
    })

    async function guardarIdioma(idioma) {
        if (!checkAuth) {
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

        if (idioma.id) {
            try {
                const { data } = await clienteAxios.put(`/idiomas/${idioma.id}`, idioma, config);
                const idiomasActualizados = idiomasArray.value.map( idiomaState => idiomaState.id === idioma.id ? data : idiomaState);
                idiomasArray.value = idiomasActualizados;
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await clienteAxios.post(`/idiomas/`, idioma, config);
                idiomasArray.value = [...idiomasArray.value, data];
            } catch (error) {
                console.log(error);
            }
        }
    }

    function setEdicionIdioma(lang) {
        idioma.value = lang;
    }

    async function eliminarIdioma(id) {
        if (!checkAuth) {
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
            const { data } = await clienteAxios.delete(`/idiomas/${id}`, config);
            const idiomasActualizados = idiomasArray.value.filter( idiomaState => idiomaState.id !== id);
            idiomasArray.value = idiomasActualizados;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        idioma,
        idiomasArray,
        guardarIdioma,
        setEdicionIdioma,
        eliminarIdioma
    }
}

export default useIdiomas;