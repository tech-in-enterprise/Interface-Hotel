import React, { useState, useEffect } from 'react'
import { Button, TextField, Avatar, Grid } from '@mui/material'
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
import { getAllDepartments, createDepartment, deleteDepartment, setSelectedDepartment } from '../../../redux/slice/departments/departmentSlice'
import { setSelectedTabLabel } from '../../../redux/slice/menuSlice'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import Skeleton from '@mui/material/Skeleton'






export default function Department() {
    const dispatch = useDispatch()
    const { departments, message, error, loading } = useSelector((state) => state.departments)

    const [newDepartment, setNewDepartment] = useState('')
    const [visibleMessage, setVisibleMessage] = useState(null)
    const [visibleError, setVisibleError] = useState(null)

    // Exibir mensagem com duração de 5 segundos
    useEffect(() => {
        if (message) {
            setVisibleMessage(message)
            const timer = setTimeout(() => {
                setVisibleMessage(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
        setVisibleMessage('')
    }, [message, departments])

    // Exibir erro com duração de 5 segundos
    useEffect(() => {
        if (error) {
            setVisibleError(error)
            const timer = setTimeout(() => setVisibleError(null), 3000)
            return () => clearTimeout(timer)
        }
        setVisibleError('')
    }, [error])

    // Retorna todos os departamentos criados
    useEffect(() => {
        dispatch(getAllDepartments())
    }, [dispatch])

    // Criar departamento
    const handleAddDepartment = () => {
        if (newDepartment.trim()) {
            dispatch(createDepartment({ name: newDepartment.trim() }))
            setNewDepartment('')
        }
    }

    // Deletar departamento
    const handleDeleteDepartment = (departmentId) => {

        dispatch(deleteDepartment(departmentId))
    }

    // Abrir página de serviços relacionado ao departamento criado
    const showComponentService = (department) => {
        dispatch(setSelectedDepartment(department))
        dispatch(setSelectedTabLabel('Serviços'))
    }

    return (
        <React.Fragment>
            {/* Mostrar mensagens */}
            {loading && <Alert sx={{ mt: 0, mb: 1 }} severity="info">{message}</Alert>}
            {visibleError && <Alert sx={{ mt: 0, mb: 1 }} severity="error">{visibleError}</Alert>}
            {visibleMessage && !loading && !error && (
                <Alert sx={{ mt: 0, mb: 1 }} severity={visibleMessage.includes('sucesso') ? 'success' : 'info'}>{visibleMessage}</Alert>
            )}
            {departments.length === 0 && !visibleMessage && !loading && !error && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="info">Você não possui departamentos criados.</Alert>
            )}
            {error && departments.length === 0 && !visibleError && !loading && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="error">{error}</Alert>
            )}

            <Table sx={{ width: 'auto' }}>
                <TableBody>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                            Gerenciamento de Departamentos
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>



            <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                        <Avatar sx={{ width: '100%', height: 100, borderRadius: 3, border: '2px solid #ccc' }}>
                            <LocationCityIcon sx={{ fontSize: 60 }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField variant="standard" size="medium" fullWidth value={newDepartment} placeholder="Criar Novo Departamento" onChange={(e) => setNewDepartment(e.target.value)} />
                    </Grid>

                    <Grid item xs={2}>
                        <Button size='small' variant="contained" fullWidth component="label" sx={{ bottom: 0 }} style={{ fontSize: 10 }}>
                            Upload Icon
                            <input hidden accept="image/*" type="file" />
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={1} justifyContent="flex-end">
                            <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }} onClick={handleAddDepartment}>
                                Adicionar
                            </Button>
                            <Button variant="contained" color="error" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {loading ? (
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Table size="small">
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ) : departments.length > 0 && (
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ background: '#101F33' }}>
                                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                                    Departamentos
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((department) => (
                                <TableRow key={department.id} sx={{ background: '#FFF' }}>
                                    <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                        {department.name}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                        <Tooltip title="Adicionar Serviços">
                                            <IconButton onClick={() => showComponentService(department)}>
                                                <AddCircleOutlineIcon style={{ fontSize: '1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Editar Departamento">
                                            <IconButton>
                                                <BorderColorIcon style={{ fontSize: '1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Deletar Departamento">
                                            <IconButton onClick={() => handleDeleteDepartment(department.id)}>
                                                <DeleteForeverIcon style={{ fontSize: '1rem' }} />
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
