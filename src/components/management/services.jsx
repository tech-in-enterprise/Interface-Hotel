import React, { useEffect } from "react"
import Paper from '@mui/material/Paper'
import { Button, Box, TextField } from "@mui/material"
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
import { setSelectedTabLabel } from "../../redux/slice/menuSlice"
import { getAllServices } from "../../redux/slice/departments/servicesSlice"


export default function ServicesFromDepartments() {
    const dispatch = useDispatch()

    const selectedDepartment = useSelector((state) => state.departments.selectedDepartment)
    const { services, loading, error, message } = useSelector((state) => state.services)

    // Efeito para buscar os serviços quando um departamento é selecionado
    useEffect(() => {
        if (selectedDepartment) {
            dispatch(getAllServices(selectedDepartment.id))
        }
    }, [selectedDepartment, dispatch])

    const backToDepartments = () => {
        dispatch(setSelectedTabLabel(''))
    }

    // Filtro de serviços com base no department_id
    const filteredServices = services.filter(service => service.department_id === selectedDepartment.id)

    return (
        <React.Fragment>
            <Table sx={{ width: 'auto' }}>
                <TableBody>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                            {selectedDepartment?.name}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField variant="standard" size="medium" sx={{ ml: 0.5 }} fullWidth placeholder={`Associar Novo Serviço à ${selectedDepartment?.name}`} />
                    <Box sx={{ display: 'flex', ml: 2, mr: 0.5 }}>
                        <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }}>
                            Adicionar
                        </Button>
                        <Button variant="contained" color="error" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
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
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                                <TableRow key={service.id} sx={{ background: '#FFF' }}>
                                    <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                        {service.name}
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                                    Nenhum serviço encontrado para o departamento selecionado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', m: 2 }}>
                <Button variant="contained" color="primary" onClick={backToDepartments} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }}>
                    Voltar
                </Button>
            </Box>
        </React.Fragment>
    )
}
