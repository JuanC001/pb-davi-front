import conectateApi from "../helpers/conectateApi"

export const useAuth = () => {

    const login = async (email, password) => {

        const { user, token } = await conectateApi.post('/auth/login', { email, password })
        return true

    }
    const register = async (email, password, name, surname, document) => {
        const res = await conectateApi.post('/auth/register', { email, password, name, surname, document })
        return res.data
    }

    return {

        login,
        register

    }
}