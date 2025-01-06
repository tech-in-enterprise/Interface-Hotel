import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunk para buscar departamentos
export const getAllDepartments = createAsyncThunk(
  'departments/getAllDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/departments')
      return response.data
    } catch (error) {
      return rejectWithValue('Erro ao retornar departamentos. Verifique sua conexão.')
    }
  }
)

// Thunk para criar um departamento
export const createDepartment = createAsyncThunk(
  'departments/createDepartment',
  async (newDepartment, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/departments', newDepartment)
      return response.data
    } catch (error) {
      return rejectWithValue('Erro ao criar Departamento. Verifique os dados e tente novamente.')
    }
  }
)

// Thunk para deletar um departamento
export const deleteDepartment = createAsyncThunk(
  'departments/deleteDepartment',
  async (department_id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/departments/${department_id}`)
      return department_id
    } catch (error) {
      return rejectWithValue('Erro ao deletar Departamento. Verifique sua conexão.')
    }
  }
)

const departmentSlice = createSlice({
  name: 'departments',
  initialState: {
    loading: false,
    departments: [],
    selectedDepartment: '',
    error: '',
    message: '',
  },
  reducers: {
    // Armazena o nome do departamento para ser usado em serviços
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Departments
      .addCase(getAllDepartments.pending, (state) => {
        state.loading = true
        state.message = 'Carregando Departamentos...'
        state.error = ''
      })
      .addCase(getAllDepartments.fulfilled, (state, action) => {
        state.loading = false
        state.departments = action.payload
        state.message = action.payload.length === 0 
        ? 'Você não possui departamentos criados.' 
        : 'Departamentos carregados com sucesso!'
        state.error = ''
      })
      .addCase(getAllDepartments.rejected, (state, action) => {
        state.loading = false
        state.departments = []
        state.error = action.payload 
        state.message = ''
      })

      // Create Department
      .addCase(createDepartment.pending, (state) => {
        state.loading = true
        state.message = 'Criando Departamento...'
        state.error = ''
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false
        state.departments.push(action.payload)
        state.message = 'Departamento criado com sucesso!'
        state.error = ''
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Erro inesperado ao criar o Departamento.'
        state.message = ''
      })

      // Delete Department
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true
        state.message = 'Deletando Departamento...'
        state.error = ''
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false
        state.departments = state.departments.filter(dept => dept.id !== action.payload)
        state.message = 'Departamento removido com sucesso!'
        state.error = ''
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Erro inesperado ao deletar o Departamento.'
        state.message = ''
      })
  },
})

export const { setSelectedDepartment } = departmentSlice.actions
export default departmentSlice.reducer