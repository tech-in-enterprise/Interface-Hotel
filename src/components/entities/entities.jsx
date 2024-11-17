import React, { useEffect } from 'react'
import { Button, Box, TextField } from '@mui/material'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelById } from '../../redux/slice/register/registerSlice'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'





export default function () {

    const dispatch = useDispatch()
    // Retorna todos as entidades criadas
    useEffect(() => {
        dispatch(getHotelById())
    }, [dispatch])

    const { hotelRegister, loading, message, error } = useSelector((state) => state.hotel)

    return (
        <React.Fragment>
            {/* Mostrar mensagens */}
            {loading && <Alert sx={{ mt: 0, mb: 1 }} severity="info">{message}</Alert>}
            {error && !loading && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="error">{error}</Alert>
            )}
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
            ) : error ? (
                <Paper elevation={3} sx={{ padding: 2 }} >
                    <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{ background: '#616161' }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error cnpj</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error phone_number</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error city</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error state</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            ) : (
                <>
                    {hotelRegister.map((entity) => (
                        <Paper elevation={3} sx={{ padding: 2 }} key={entity.id}>
                            <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                                <TableHead>
                                    <TableRow sx={{ background: '#616161' }}>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.hotel_name}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.cnpj}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.phone_number}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.city}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>{entity.state}</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </Paper>
                    ))}
                </>
            )}
        </React.Fragment>
    )
}