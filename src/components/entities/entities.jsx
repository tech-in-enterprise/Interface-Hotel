import React, {useEffect} from 'react'
import { Button, Box, TextField } from '@mui/material'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelById } from '../../redux/slice/register/registerSlice'



export default function Entities() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHotelById())
    }, [dispatch])

    const { hotelRegister } = useSelector((state) => state.hotel)

    return (
        <React.Fragment>
            <Table sx={{ width: 'auto' }}>
                <TableBody>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                            Gerenciamento de Entidades
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                <Box sx={{ ml: 2, mr: 1 }}>
                    <TextField variant="standard" size="medium" fullWidth placeholder="Pesquisar Entidade" />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" color="success" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }}>
                            Pesquisar
                        </Button>
                        <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                            Adicionar
                        </Button>
                    </Box>
                </Box>
            </Paper>

            Entidades
            {hotelRegister.map((entity) => (
                <Paper elevation={3} sx={{ padding: 2 }} key={entity.id}>
                    <Table  sx={{ tableLayout: 'fixed', width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{ background: '#616161' }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.name}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.cnpj}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.phone_number}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.city}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.state}</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            ))}

        </React.Fragment>
    )
}