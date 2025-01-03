import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"



//Thunk para acessar a rota de buscar serviços
export const getAllServices = createAsyncThunk(
    'services/getAllServices',
    async (department_id) => {
      const response = await axios.get(`http://localhost:8000/services?department_id=${department_id}`)
      return response.data
    }
  )
  


const serviceSlice = createSlice({
    name: 'services',
    initialState:{
        loading: false,
        services: [],
        error: '',
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        .addCase(getAllServices.pending, (state) => {
            state.loading = true,
            state.message = 'Carregando serviços'
        })
        .addCase(getAllServices.fulfilled, (state, action) => {
            state.loading = false,
            state.services = action.payload
            state.error = ''
            state.message = action.payload.length === 0 ? 'Este departamento não possui serviços' : ''
        })
        .addCase(getAllServices.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.message = 'Erro ao carregar serviços'
        })
    }
})


export default serviceSlice.reducer