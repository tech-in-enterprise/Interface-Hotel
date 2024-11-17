import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { act } from "react"


export const getHotelById = createAsyncThunk(
    'hotel/getHotelById',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`http://localhost:8000/hotel_data`)
            return response.data
        } catch (error) {
            return rejectWithValue ('Erro ao retornar dados do hotel')
        }
    }
)

const hotelSlice = createSlice({
    name: 'hotelRegister',
    initialState:{
        loading: false,
        hotelRegister: [],
        error: '',
        message: '',
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getHotelById.pending, (state) => {
            state.loading = true
            state.message = 'Carregando dados do Hotel'
            state.error = ''
        })
        .addCase(getHotelById.fulfilled, (state, action) => {
            state.loading = false
            state.hotelRegister = action.payload
        })
        .addCase(getHotelById.rejected, (state, action) =>{
            state.loading = false
            state.hotelRegister = []
            state.error = action.payload
            state.message = ''
        })
    }
})

export default hotelSlice.reducer