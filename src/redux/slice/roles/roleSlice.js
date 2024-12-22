import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllRoles = createAsyncThunk('roles/getAllRoles',
    async (_, { rejectWithValue  }) => {
        try {
            const response = await axios.get('http://localhost:8000/roles')
            return response.data
        } catch (error) {
            return rejectWithValue('Erro ao retornar roles')
        }
    }
)
const roleSlice = createSlice({
    name:'role',
    initialState:{
        loading: false,
        roles: [],
        error:'',
        message:'',
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getAllRoles.pending, (state) =>{
            state.loading = true
            state.message = 'Carregando Roles'
            state.error = ''
        })
        .addCase(getAllRoles.fulfilled, (state, action) => {
            state.loading = false
            state.roles = action.payload
        })
    }
})

export default roleSlice.reducer