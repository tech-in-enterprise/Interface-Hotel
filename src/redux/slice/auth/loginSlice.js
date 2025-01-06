import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'
import { api } from "../../api/api"



// Thunk para realizar o login
export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await api.post('/sign-in', loginData)
        Cookies.set('authToken', response.data.access_token, { expires: 1, path: '/' })
        Cookies.set('role', response.data.role, { expires: 1, path: '/' })
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 1, path: '/' })
        return response.data
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.detail || 'Erro ao realizar login. Verifique suas credenciais'
        )
    }
}
)


// Slice para autenticação
const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
        token: Cookies.get('authToken') || null,
        role: Cookies.get('role') || null, 
        hotel: Cookies.get('hotel') || null,
        isAuthenticated: !!Cookies.get('authToken'),
        error: ''
    },
    reducers: {
        logout: (state) => {
            state.loading = false
            state.user = null
            state.token = null
            state.role = null
            state.hotel = null
            state.isAuthenticated = false
            state.error = ''

            // Remover cookies
            Cookies.remove('authToken', { path: '/' })
            Cookies.remove('user', { path: '/' })
            Cookies.remove('role', { path: '/' })
            Cookies.remove('hotel', { path: '/' })
        },
        initializeAuth: (state) => {
            const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
            state.user = user
            state.token = Cookies.get("authToken") || null
            state.role = Cookies.get('role') || null
            state.hotel = Cookies.get('hotel') || null
            state.isAuthenticated = !!Cookies.get("authToken")
        },
        setHotel: (state, action) => {
            state.hotel = action.payload
            Cookies.set("hotel", action.payload, { expires: 1, path: "/" }) 
        },
        clearHotel: (state) => {
            state.hotel = null
            Cookies.remove("hotel", { path: "/" })
        },
        clearError: (state) => {
            state.error = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.access_token
                state.role = action.payload.role
                state.isAuthenticated = true
                state.error = ''
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Erro inesperado ao realizar login'
            })
    }
})

export const { logout, initializeAuth, setHotel, clearHotel, clearError } = loginSlice.actions
export default loginSlice.reducer