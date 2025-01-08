import Cookies from "js-cookie"
import { logout } from "../../redux/slice/auth/loginSlice"


// Função de logout global
export const handleLogout = (dispatch, navigate) => {
    // Remove os cookies
    Cookies.remove("authToken")
    Cookies.remove("user")
    
    // Limpa o activeItem do localStorage
    localStorage.removeItem("activeMenuItem")

    // Despacha a ação de logout
    dispatch(logout())

    // Redireciona para a página de login
    navigate("/sign-in")
}
