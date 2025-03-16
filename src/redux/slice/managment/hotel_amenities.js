import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

// Thunk para criar um departamento
export const createAmenity = createAsyncThunk(
  'amenity/createDepartment',
  async (newAmenities, { rejectWithValue }) => {
    try {
      const response = await api.post('/amenities-hotel', newAmenities)
      return response.data
    } catch (error) {
      return rejectWithValue( error.response?.data?.message || 'Erro ao criar Departamento. Verifique os dados e tente novamente.')
    }
  }
)


const amenitySlice = createSlice({
  name: 'amenities',
  initialState: {
    loading: false,
    amenities: [],
    error: '',
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Amenidade
      .addCase(createAmenity.pending, (state) => {
        state.loading = true
        state.message = 'Criando Amenidade...'
        state.error = ''
      })
      .addCase(createAmenity.fulfilled, (state, action) => {
        state.loading = false
        state.amenities = action.payload
        state.message = 'Amenidade criada com sucesso!'
        state.error = ''
      })
      .addCase(createAmenity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Erro inesperado ao criar o Amenidade.'
        state.message = ''
      })
  },
})


export default amenitySlice.reducer
