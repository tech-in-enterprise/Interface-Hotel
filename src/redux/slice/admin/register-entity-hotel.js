import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api/api"

//Thunk para reenderizar todas as entidades de hotel
export const getHotelEntity = createAsyncThunk(
    'hotel/getHotelEntity',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/hotel_data`)
            return response.data
        } catch (error) {
            return rejectWithValue('Erro ao retornar dados do hotel')
        }
    }
)


// Thunk para criar um hotel
export const createHotel = createAsyncThunk(
    'hotel/createHotel',
    async (hotelData, { rejectWithValue }) => {
        try {
            const response = await api.post(`/create-hotel`, hotelData)
            return response.data
        } catch (error) {
            return rejectWithValue('Erro ao criar hotel')
        }
    }
)

const hotelEntity = createSlice({
    name: 'hotelRegister',
    initialState: {
        loading: false,
        hotelRegister: [],
        error: '',
        message: '',
        filteredEntities: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get entidades (hoteis)
            .addCase(getHotelEntity.pending, (state) => {
                state.loading = true
                state.message = 'Carregando dados do Hotel'
                state.error = ''
            })
            .addCase(getHotelEntity.fulfilled, (state, action) => {
                state.loading = false
                state.message = 'Entidades carregadas com sucesso'
                state.hotelRegister = action.payload
            })
            .addCase(getHotelEntity.rejected, (state, action) => {
                state.loading = false
                state.hotelRegister = []
                state.error = action.payload
                state.message = ''
            })
            //post entidades (criar hoteis)
            .addCase(createHotel.pending, (state) => {
                state.loading = true
                state.message = 'Criando novo hotel...'
                state.error = ''
            })
            .addCase(createHotel.fulfilled, (state, action) => {
                state.loading = false
                state.hotelRegister.push(action.payload)
                state.message = 'Hotel criado com sucesso'
            })
            .addCase(createHotel.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = ''
            })
    }
})

export default hotelEntity.reducer