import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const getHotelById = createAsyncThunk(
    'hotel/getHotelById',
    async () => {
        try {
            const response = await axios.get(`http://localhost:8000/hotel_data`)
            return response.data
        } catch (error) {
            console.error("Erro ao buscar dados do hotel", error)
            throw error
        }
    }
)

const hotelSlice = createSlice({
    name: 'hotelRegister',
    initialState:{
        hotelRegister: [],
    },
    reducers:{},
    extraReducers: (builder) => {
        builder

        .addCase(getHotelById.fulfilled, (state, action) => {
            state.hotelRegister = action.payload
        })
    }
})

export default hotelSlice.reducer