import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api/api"



// Thunk para buscar o perfil do hotel pelo ID
export const getHotelById = createAsyncThunk(
  "hotel/getHotelById",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/management-hotel`)
      return response.data
    } catch (error) {
      return rejectWithValue("Erro ao retornar dados do hotel")
    }
  }
)

// Thunk para criar um novo perfil de hotel
export const managementProfileHotel = createAsyncThunk(
  "management/managementProfileHotel",
  async (newProfileHotel, { rejectWithValue }) => {
    try {
      const response = await api.post(`/management-hotel`, newProfileHotel)
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue( error.response?.data?.message || "Erro ao criar novo Perfil. Verifique os dados e tente novamente.")
    }
  }
)

// Thunk para atualizar dados do perfil de hotel
export const updateManagementProfileHotel = createAsyncThunk(
  "management/updateManagementProfileHotel",
  async ( updateProfileHotel, { rejectWithValue }) => {
    try {
      const response = await api.put(`/management-hotel`, updateProfileHotel)
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue( error.response?.data?.message || "Erro ao atualizar Perfil. Verifique os dados e tente novamente.")
    }
  }
)

// Slice para gerenciar o estado do perfil do hotel
const hotelById = createSlice({
  name: "hotelProfile",
  initialState: {
    loading: false,
    hotelProfileById: [],
    error: "",
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Thunks para buscar o perfil do hotel
      .addCase(getHotelById.pending, (state) => {
        state.loading = true
        state.message = "Carregando dados do Hotel"
        state.error = ""
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        state.loading = false
        state.message = "Perfil carregado com sucesso"
        state.hotelProfileById = action.payload
      })
      .addCase(getHotelById.rejected, (state, action) => {
        state.loading = false
        state.hotelProfileById = []
        state.error = action.payload
        state.message = ""
      })

      // Thunk para criar um novo perfil de hotel
      .addCase(managementProfileHotel.pending, (state) => {
        state.loading = true
        state.message = "Criando perfil do Hotel"
        state.error = ""
      })
      .addCase(managementProfileHotel.fulfilled, (state, action) => {
        state.loading = false
        state.hotelProfileById = action.payload
        state.message = "Perfil criado com sucesso"
        state.error = ""
      })
      .addCase(managementProfileHotel.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload || "Erro inesperado ao criar o Perfil."
        state.message = ""
      })

      //Thunk para atualizar dados do profile hotel
      .addCase(updateManagementProfileHotel.pending, (state) => {
        state.loading = true
        state.message = "Atualizando perfil do Hotel"
        state.error = ""
      })
      .addCase(updateManagementProfileHotel.fulfilled, (state, action) => {
        state.loading = false
        state.hotelProfileById = action.payload
        state.message = "Perfil atualizado com sucesso"
        state.error = ""
      })
      .addCase(updateManagementProfileHotel.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload || "Erro inesperado ao atualizar o Perfil."
        state.message = ""
      })
  },
})

// Exporta o reducer padrão e os thunks
export default hotelById.reducer

