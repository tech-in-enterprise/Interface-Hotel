import Cookies from "js-cookie"
import { logout } from "../../redux/slice/auth/loginSlice"
import { removeHotelFromUser } from "../../redux/slice/admin/users"


// Função de logout global
export const handleLogout = async (dispatch, navigate) => {
    try {
        // Remove o hotel associado ao usuário
        await dispatch(removeHotelFromUser()) // Use await se for assíncrono

        // Despacha a ação de logout
        await dispatch(logout()) // Use await se for assíncrono

        // Limpa o activeItem do localStorage
        localStorage.removeItem("activeMenuItem")

        // Remove cookies
        Cookies.remove("hotel")
        Cookies.remove("authToken")
        Cookies.remove("user")

        // Redireciona para a página de login
        navigate("/sign-in")
    } catch (error) {
        console.error("Erro ao realizar logout:", error)
        navigate("/sign-in")
    }
}
