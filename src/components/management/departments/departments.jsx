import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDepartments, deleteDepartment, setSelectedDepartment } from '../../../redux/slice/managment/departments'
import { setSelectedTabLabel } from '../../../redux/slice/menuSlice'
import Skeleton from '@mui/material/Skeleton'
import Title from '../../general-components/title-from-pages'
import { useNavigate } from 'react-router-dom'
import AddDepartment from './add-department'
import AlertMessages from '../../general-components/alert-messages'




export default function Department() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selectedHotelId = useSelector((state) => state.auth.hotel)
    const { departments, message, error, loading } = useSelector((state) => state.departments)

    // Retorna todos os departamentos criados
    useEffect(() => {
        dispatch(getAllDepartments())
    }, [dispatch])

    // Deletar departamento
    const handleDeleteDepartment = (departmentId) => {
        dispatch(deleteDepartment(departmentId))
    }

    // Abrir página de serviços relacionado ao departamento criado
    const showComponentService = (department) => {
        dispatch(setSelectedDepartment(department))
        dispatch(setSelectedTabLabel('Serviços'))
        navigate(selectedHotelId ? `/admin/departamento/servicos/${selectedHotelId}` : '/departamento/servicos')
    }

    // Filtro referente aos departamentos respectivos do hotel
    const [filteredDepartmentsHotelById, setFilteredDepartmentsHotelById] = useState([])
    useEffect(() => {
        if (selectedHotelId) {
            const filtered = departments.filter((department) => String(department.hotel_id) === String(selectedHotelId))
            setFilteredDepartmentsHotelById(filtered)
        }
    }, [selectedHotelId, departments])

    return (
        <React.Fragment>
            {/* Mostrar mensagens */}
            <AlertMessages filtroMap={filteredDepartmentsHotelById} error={error} stateFromRedux={departments} loading={loading} message={message} infoMessage={'Você não possui departamentos criados.'} />
            {/* Mostrar Título */}
            <Title Title={"Gerenciamento de Departamentos"} />
            {/* Add Departamento */}
            <AddDepartment />

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
            ) : filteredDepartmentsHotelById.length > 0 && selectedHotelId && (
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ background: '#101F33' }}>
                                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '10%' }}>
                                    Ícones
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '40%' }}>
                                    Departamentos
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '25%' }}>
                                    Horários
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDepartmentsHotelById.map((department) => (
                                <TableRow key={department.id} sx={{ background: '#FFF' }}>
                                    <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Avatar sx={{width: 32, height: 32, borderRadius: 2}}  src={department.image_url} alt={department.name}/>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                        {department.name}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                        {department.start_time === '00:00' && department.end_time === '23:59'
                                            ? '24 hrs'
                                            : `${department.start_time} hrs às ${department.end_time} hrs`}
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
