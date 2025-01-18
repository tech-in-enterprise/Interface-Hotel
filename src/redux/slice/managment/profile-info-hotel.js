import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api/api"


export const getHotelById = createAsyncThunk(
    'hotel/getHotelById',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/hotel_data`)
            return response.data
        } catch (error) {
            return rejectWithValue('Erro ao retornar dados do hotel')
        }
    }
)


const hotelById = createSlice({
    name: 'hotelProfileById',
    initialState: {
        loading: false,
        hotelProfileById: [],
        error: '',
        message: '',
        filteredEntities: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get entidades (hoteis)
            .addCase(getHotelById.pending, (state) => {
                state.loading = true
                state.message = 'Carregando dados do Hotel'
                state.error = ''
            })
            .addCase(getHotelById.fulfilled, (state, action) => {
                state.loading = false
                state.message = 'Entidades carregadas com sucesso'
                state.hotelProfileById = action.payload
            })
            .addCase(getHotelById.rejected, (state, action) => {
                state.loading = false
                state.hotelProfileById = []
                state.error = action.payload
                state.message = ''
            })
    }
})

export default hotelById.reducer