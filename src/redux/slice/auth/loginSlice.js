import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'



// Thunk para realizar o login
export const loginUser = createAsyncThunk('auth/loginUser',
    async(loginData, {rejectWithValue}) => { 
        try{
            const response = await axios.post('http://localhost:8000/sign-in', loginData)
            return response.data
        }catch(error){
            return rejectWithValue(
                error.response?.data?.detail || 'Erro ao realizar login. Verifique suas credenciais'
            )
        }
    }
)


// Slice para autenticação
const loginSlice = createSlice({
    name: 'auth',
    initialState:{
        loading: false,
        user: null,
        token: null,
        role: null,
        hotel: null,
        isAuthenticated: false,
        error: ''
    },
    reducers: {
        logout: (state) => {
            state.loading = false
            state.user = null
            state.token = null
            state.role = null
            state.hotel = null
            state.isAuthenticated =  false
            state.error = ''
            localStorage.removeItem('authToken')
        },
        setHotel:(state, action) => {
            state.hotel = action.payload
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
            localStorage.setItem('authToken', action.payload.access_token)
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Erro inesperado ao realizar login'
        })
    }
})

export const { logout, sethotel, clearError } = loginSlice.actions
export default loginSlice.reducer