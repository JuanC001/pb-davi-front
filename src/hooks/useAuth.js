import conectateApi from "../helpers/conectateApi"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"

export const useAuth = () => {

    const { loggedIn, logout } = useContext(UserContext)

    const login = async (email, password) => {

        const { data } = await conectateApi.post('/auth/login', { email, password })
        const { user, token } = data
        if (!user) return false
        loggedIn(user, token)
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