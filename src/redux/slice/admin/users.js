import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api/api"
import Cookies from 'js-cookie'


// Thunk para buscar usuários com token de autenticação
export const getUsers = createAsyncThunk('users/getUsers', async (_, { rejectWithValue }) => {
    try {
        // Realiza a requisição GET para a rota "/users"
        const response = await api.get('/users')
        return response.data
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.detail || 'Erro ao retornar usuários. Verifique suas credenciais'
        )
    }
})

//Thunk para criar usuários do sistema do hotel
export const createUser = createAsyncThunk('users/createUsers', async (formData, {rejectWithValue}) => {
    try{
        const response = await api.post('/sign-up', formData)
        return response.data
    } catch(error){
        return rejectWithValue(
            error.response?.data?.detail || 'Erro ao criar um usuário. Verifique suas credenciais'
        )
    }
})

// Thunk para alterar o hotel_id do usuário admin dinâmicamente
export const updateHotelId = createAsyncThunk('users/updateHotelId', async ({ hotel_id }, { rejectWithValue }) => {
    try {
        // Realiza a requisição GET para a rota "/users"
        const response = await api.patch(`/users`, null, {
            params: { hotel_id }, // Adiciona os parâmetros à URL
        })
        return response.data
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.detail || 'Erro ao retornar usuários. Verifique suas credenciais'
        )
    }
})

//Thunk para remover o hotel_id do usuário admin dinâmicamente
export const removeHotelFromUser = createAsyncThunk('users/removeHotelFromUser', async(_, {rejectWithValue}) =>{
    try{
        const response = await api.patch('/users/remove-hotel')
        return response.data
    }catch(error){
        return rejectWithValue(
            error.response?.data?.detail || 'Erro ao remover o hotel_id do usuário'
        )
    }
})

// Slice para retorno de usuários
const allUsers = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        users: [],
        message: '',
        hotel: Cookies.get('hotel') || null,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        //rota get
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
                state.message = 'Carregando usuários'
                state.error = ''
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                state.message = 'Usuários carregados com sucesso'
                state.users = action.payload
                state.error = ''
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Erro inesperado ao retornar usuários'
            })
        
        //rota post
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true
                state.message = 'Criando usuários'
                state.error = ''
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false
                state.message = 'Usuário criado com sucesso'
                state.users.push(action.payload)
                state.error = ''
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Erro ao criar usuário'
            })
            

        //Rota remove hotel_id from admin (rota patch)
        builder
            .addCase(removeHotelFromUser.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(removeHotelFromUser.fulfilled, (state, action) => {
                state.loading = false
                state.hotel = null
                Cookies.remove('hotel')
                state.error = ''
            })
            .addCase(removeHotelFromUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Erro ao remover hotel do usuário'
            })
    }
})


export default allUsers.reducer