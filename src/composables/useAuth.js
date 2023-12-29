import { clienteAxios } from '../main.js';

const useAuth = () => {
    async function checkAuth() {
        const token = document.cookie.match('(^|;)?' + 'Authorization' + '=([^;]*)(;|$)')

        if (token) {
            const config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token[2]}`
                }
            }
            try {
                const { data: { user } } = await clienteAxios('/users/me', config);
                return user
            } catch (error) {
                return null
            }
        }

        return null;
    }

    function logIn(token) {
        const dateObj = new Date();
        const expires = new Date(dateObj.getTime() + (30 * 60000));
        document.cookie = `Authorization=${token}; expires=${expires.toUTCString()}`;
    }

    function logOut() {
        const dateObj = new Date();
        const expires = new Date(dateObj.getTime() - 1);
        document.cookie = `Authorization=; expires=${expires.toUTCString()}`;
    }

    return {
        checkAuth,
        logIn,
        logOut
    }
}

export default useAuth;