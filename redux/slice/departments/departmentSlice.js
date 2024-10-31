import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunk para acessar rota de buscar departamentos
export const getAllDepartments = createAsyncThunk(
  'departments/getAllDepartments',
  async () => {
    const response = await axios.get('http://localhost:8000/departments')
    return response.data
  }
)


//Thunk para acessar rota de criar departamentos
export const createDepartment = createAsyncThunk(
  'departments/createDepartment',
  async (newDepartment) => {
    const response = await axios.post('http://localhost:8000/departments', newDepartment)
    return response.data
  }
)

//Thunk para acessar rota de deletar departamentos
export const deleteDepartment = createAsyncThunk(
  'departments/deleteDepartment',
  async (department_id) => {
    await axios.delete(`http://localhost:8000/departments/${department_id}`)
    return department_id
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
    //armazena o nome do departamento para ser usado (reenderizado) em serviços
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //get
      .addCase(getAllDepartments.pending, (state) => {
        state.loading = true
        state.message = 'Carregando Departamentos'
      })
      .addCase(getAllDepartments.fulfilled, (state, action) => {
        state.loading = false
        state.departments = action.payload
        state.error = ''
        state.message = action.payload.length === 0 ? 'Você não possui departamentos criados.' : ''
      })
      .addCase(getAllDepartments.rejected, (state, action) => {
        state.loading = false
        state.departments = []
        state.error = action.error.message
        state.message = 'Erro ao retornar Departamentos'
      })

      //post
      .addCase(createDepartment.pending, (state) => {
        state.loading = true
        state.message = 'Criando Departamentos'
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false
        state.departments.push(action.payload)
        state.message = 'Departamento criado com sucesso'
        state.error = ''
      })

      //delete
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true
        state.message = 'Deletando Departamento'
        state.error = ''
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false
        state.departments = state.departments.filter(dept => dept.id !== action.payload)
        state.message = 'Departamento removido com sucesso'
        state.error = ''
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.message = 'Erro ao deletar departamento'
      })


  },
})


export const { selectedDepartment, setSelectedDepartment } =  departmentSlice.actions
export default departmentSlice.reducer
