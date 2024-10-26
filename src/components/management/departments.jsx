import { Button, Typography, Box, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Alert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDepartments, createDepartment, deleteDepartment, setSelectedDepartment } from '../../redux/slice/departments/departmentSlice'
import { setSelectedTabLabel } from '../../redux/slice/menuSlice'


export default function Department() {
    const dispatch = useDispatch()
    const { departments, message } = useSelector((state) => state.departments)

    const [newDepartment, setNewDepartment] = useState('')
    const [showCreateAlert, setShowCreateAlert] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)

    // Retorna todos os departamentos criados
    useEffect(() => {
        dispatch(getAllDepartments())
    }, [dispatch])

    // Criar departamento
    const handleAddDepartment = () => {
        if (newDepartment.trim()) {
            dispatch(createDepartment({ name: newDepartment.trim() }))
            setNewDepartment('')
            setShowCreateAlert(true)
            setTimeout(() => {
                setShowCreateAlert(false)
            }, 3000)
        }
    }

    // Deletar departamento
    const handleDeleteDepartment = (departmentId) => {
        dispatch(deleteDepartment(departmentId))
        setShowDeleteAlert(true)
        setTimeout(() => {
            setShowDeleteAlert(false)
        }, 3000) 
    }

    //abrir página de serviços relacionado ao departamento criado
    const showComponentService = (department) => {
        dispatch(setSelectedDepartment(department))
        dispatch(setSelectedTabLabel('Serviços'))
    }

    return (
        <React.Fragment>
            <Table sx={{ width: 'auto' }}>
                <TableBody>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                            Gerenciamento de Departamentos
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/* Mostrar alerta de sucesso quando criar ou deletar */}
            {showCreateAlert && message && (
                <Alert severity='success' sx={{ mb: 2, mt: 1 }}> 
                    Departamento criado com sucesso
                </Alert>
            )}

            {showDeleteAlert && message && (
                <Alert severity='success' sx={{ mb: 2, mt: 1 }}>
                    Departamento removido com sucesso
                </Alert>
            )}

            {/* Mostrar mensagem informativa se não houver departamentos */}
            {!showCreateAlert && !showDeleteAlert && departments.length === 0 && (
                <Alert severity='info' sx={{ mb: 2, mt: 1 }}>
                    Você não possui nenhum departamento cadastrado
                </Alert>
            )}

            <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField variant="standard" size="medium" sx={{ ml: 0.5 }} fullWidth value={newDepartment} placeholder="Criar Novo Departamento" onChange={(e) => setNewDepartment(e.target.value)} />
                    <Box sx={{ display: 'flex', ml: 2, mr: 0.5 }}>
                        <Button variant="contained" color="primary" sx={{ fontSize: 12, padding: '6px 12px', textTransform: 'none', mr: 1 }} onClick={handleAddDepartment}>
                            Adicionar
                        </Button>
                        <Button variant="contained" color="error" sx={{ fontSize: 12, padding: '6px 12px', textTransform: 'none' }}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>

            {departments.length > 0 && (
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ background: '#101F33' }}>
                                <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                                    Departamentos
                                </TableCell>
                                <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((department) => (
                                <TableRow key={department.id} sx={{ background: '#FFF' }}>
                                    <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                        {department.name}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 12, border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                        <Tooltip title="Adicionar Serviços">
                                            <IconButton onClick={() => showComponentService(department)}>
                                                <AddCircleOutlineIcon style={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Editar Departamento">
                                            <IconButton>
                                                <BorderColorIcon style={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Deletar Departamento">
                                            <IconButton onClick={() => handleDeleteDepartment(department.id)}>
                                                <DeleteForeverIcon style={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </React.Fragment>
    )
}
