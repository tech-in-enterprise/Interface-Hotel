import axios from "axios"
import Cookies from 'js-cookie'
import { handleLogout } from "../../components/auth/sign-in/sign-out"



// Cria a instância do Axios
export const api = axios.create({
    baseURL: 'http://localhost:8000'
})

//Adiciona um intercptador para as requisições
api.interceptors.request.use((config) => {
    const token = Cookies.get('authToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Função para configurar o interceptor de resposta
export const setupInterceptors = (dispatch, navigate) => {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                handleLogout(dispatch, navigate) // Chama a função de logout
            }
            return Promise.reject(error)
        }
    )
}