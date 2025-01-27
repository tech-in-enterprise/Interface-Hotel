import React, { useState, useEffect } from "react"
import Paper from '@mui/material/Paper'
import { Button, Box } from "@mui/material"
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTabLabel } from "../../../redux/slice/menuSlice"
import Title from "../../general-components/title-from-pages"
import AddService from "./addService"
import { getAllServices } from "../../../redux/slice/managment/serviceSlice"
import AlertMessages from "../../general-components/alert-messages"
import { useNavigate } from 'react-router-dom'



export default function ServicesFromDepartments() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectedHotelId = useSelector((state) => state.auth.hotel)
    const selectedDepartment = useSelector((state) => state.departments.selectedDepartment)
    const { services, loading, error, message } = useSelector((state) => state.services)

    const backToDepartments = () => {
        navigate(selectedHotelId ? `/admin/departamentos/${selectedHotelId}` : '/departamentos')
        dispatch(setSelectedTabLabel(''))
    }

    // Não use useState para armazenar o filtro
    const [filteredServiceHotelById, setFilteredServiceHotelById] = useState([])
    useEffect(() => {
        const filtered = services.filter((service) => String(service.department_id) === String(selectedDepartment.id))
        setFilteredServiceHotelById(filtered)
    }, [services])



    return (
        <React.Fragment>
            {/* Mostrar mensagens */}
            <AlertMessages filtroMap={filteredServiceHotelById} error={error} loading={loading} message={message} stateFromRedux={services} infoMessage={'Esse departamento não possui serviços criados.'} />
            <Title Title={selectedDepartment?.name} />
            <AddService />
            {filteredServiceHotelById.length > 0 ? (
                <>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ background: '#101F33' }}>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                                        Serviços
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Ações
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredServiceHotelById.map((service) => (
                                    <TableRow key={service.id} sx={{ background: '#FFF' }}>
                                        <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                            {service?.name}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                            <Tooltip title="Editar Serviço">
                                                <IconButton>
                                                    <BorderColorIcon style={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Deletar Serviço">
                                                <IconButton>
                                                    <DeleteForeverIcon style={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </Paper>
                </>
            ) : ('')}
            {/* <Box sx={{ position: 'absolute', top: 50, right:10,  }}>
                <Button variant="contained" color="primary" onClick={backToDepartments} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }}>
                    Voltar
                </Button>
            </Box> */}
        </React.Fragment>
    )
}
