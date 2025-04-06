import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'


// Thunk para requisitar amenidades do hotel
export const getAmenity = createAsyncThunk(
  'amenity/getAmenity',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/amenities-hotel')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao requisitar Amenidades. Verifique os dados e tente novamente.')
    }
  }
)

// Thunk para criar um amenidade
export const createAmenity = createAsyncThunk(
  'amenity/createDepartment',
  async (newAmenities, { rejectWithValue }) => {
    try {
      const response = await api.post('/amenities-hotel', newAmenities)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao criar Amenidade. Verifique os dados e tente novamente.')
    }
  }
)

// Thunk para editar um amenidade
export const updateAmenity = createAsyncThunk(
  'amenity/updateAmenity',
  async (updateAmenities, { rejectWithValue }) => {
    try {
      const response = await api.put('/amenities-hotel', updateAmenities)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao editar Amenidade. Verifique os dados e tente novamente.')
    }
  }
)

// Thunk para deletar um amenidade
export const deleteAmenity = createAsyncThunk(
  'amenity/deleteAmenity',
  async (deleteAmenities, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/amenities-hotel/${deleteAmenities}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao Deletar Amenidade. Verifique os dados e tente novamente.')
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
      // Get Amenidade
      .addCase(getAmenity.pending, (state) => {
        state.loading = true
        state.message = 'Carregando Amenidades...'
        state.error = ''
      })
      .addCase(getAmenity.fulfilled, (state, action) => {
        state.loading = false
        state.amenities = action.payload
        state.message = action.payload.length === 0
          ? 'Você não possui amenidades criadasaa.'
          : 'Amenidades carregadas com sucesso!'
        state.error = ''
      })
      .addCase(getAmenity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Erro inesperado ao carregar Amenidades.'
        state.message = ''
      })

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

      // Update Amenidades
      .addCase(updateAmenity.pending, (state) => {
        state.loading = true
        state.message = 'Atualizando Amenidade...'
        state.error = ''
      })
      .addCase(updateAmenity.fulfilled, (state, action) => {
        state.loading = false
        const updatedAmenity = action.payload;

        // Verificação básica se o payload tem ID
        if (!updatedAmenity || !updatedAmenity.id) {
          state.message = 'Erro ao atualizar amenidade: payload inválido.';
          state.error = 'Payload inválido.';
          return;
        }

        // Atualiza apenas a amenidade que foi editada
        state.amenities = state.amenities.map((amenity) =>
          amenity.id === updatedAmenity.id ? { ...amenity, ...updatedAmenity } : amenity
        );
        state.message = 'Amenidade editada com sucesso!'
        state.error = ''
      })
      .addCase(updateAmenity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Erro inesperado ao editar o Amenidade.'
        state.message = ''
      })

      // Delete Amenity
      .addCase(deleteAmenity.pending, (state) => {
        state.loading = true
        state.message = 'Deletando Amenidade...'
        state.error = ''
      })
      .addCase(deleteAmenity.fulfilled, (state, action) => {
        state.loading = false
        state.amenities = state.amenities.filter(amenity => amenity.id !== action.payload)
        state.message = 'Amenidade removida com sucesso!'
        state.error = ''
      })
      .addCase(deleteAmenity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Erro inesperado ao deletar Amenidade.'
        state.message = ''
      })
  },
})


export default amenitySlice.reducer
