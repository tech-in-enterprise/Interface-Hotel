import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api/api"



//Thunk para acessar a rota de buscar serviços
export const getAllServices = createAsyncThunk(
    'services/getAllServices',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/services`)
            return response.data
        } catch (error) {
            return rejectWithValue('Erro ao retornar serviços. Verifique sua conexão')
        }
    }
)

//Thunk para criar serviços de um respectivo departamento/hotel
export const createService = createAsyncThunk(
    'services/createService',
    async (newService, { rejectWithValue }) => {
        try {
            const response = await api.post('/services', newService)
            return response.data
        } catch (error) {
            return rejectWithValue('Erro ao criar serviço. Verifique sua conexão')
        }
    }
)

export const deleteService = createAsyncThunk(
    'services/deleteService',
    async(service_id, {rejectWithValue}) => {
        try{
            await api.delete(`/services/${service_id}`)
            return service_id
        }catch(error){
            return rejectWithValue('Erro ao deletar serviço')
        }
    }
)


const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        loading: false,
        services: [],
        error: '',
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get all services
            .addCase(getAllServices.pending, (state) => {
                state.loading = true,
                    state.message = 'Carregando serviços'
            })
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.loading = false
                state.services = action.payload
                state.error = ''
                state.message = action.payload.length === 0 ? 'Você não possui serviços criados.' : 'Serviços carregados com sucesso!'
            })
            .addCase(getAllServices.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.message = 'Erro ao carregar serviços'
            })

            //create a respective service from department
            .addCase(createService.pending, (state) => {
                state.loading = true
                state.message = 'Carregando serviços'
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.loading = false
                state.services.push(action.payload.service)
                state.error = ''
                state.message = 'Serviço criado com sucesso'
            })
            .addCase(createService.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = 'Erro ao criar serviços'
            })

            //Delete service
            .addCase(deleteService.pending, (state) => {
                state.loading = true
                state.message = 'Deletando Departamento...'
                state.error = ''
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.loading = false
                state.services = state.services.filter(service => service.id !== action.payload)
                state.message = 'Serviço removido com sucesso!'
                state.error = ''
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Erro inesperado ao deletar o Serviço.'
                state.message = ''
            })
    }
})


export default serviceSlice.reducer