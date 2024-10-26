import React, { useState, useEffect } from 'react'
import { Box, TextField, Avatar, Button, Grid, Paper } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelById } from '../../redux/slice/register/registerSlice'



export default function ProfileHotel() {

    const dispatch = useDispatch()
    const { hotelRegister } = useSelector((state) => state.hotel)

    useEffect(() => {
        dispatch(getHotelById())
    }, [dispatch])

    const [facebookValue, setFacebookValue] = useState('')

    const handleHoverColor = (event) => {
        setFacebookValue(event.target.value)
        setInstagramValue(event.target.value)
    }

    return (
        <React.Fragment>
            <Table sx={{ width: 'auto' }}>
                <TableBody>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                            Gerenciamento de Perfil
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Paper elevation={3} sx={{ display: 'flex', padding: 2, mt: 2, mb: 2 }}>
                {/* Foto do hotel */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <Avatar alt="Profile Picture" sx={{ width: 300, height: 200, borderRadius: 4, border: '2px solid #ccc' }} />
                    <Button variant="contained" fullWidth component="label" sx={{ position: 'absolute', bottom: 0 }}>
                        Upload Photo
                        <input hidden accept="image/*" type="file" />
                    </Button>
                </Box>

                {/* Dados do hotel */}
                {hotelRegister.map((hotelData) =>(
                    <Box sx={{ flexGrow: 1, ml: 3 }}>
                        <Grid container spacing={2}>
                            {/* Nome do hotel e CNPJ */}
                            <Grid item xs={12} sm={6}>
                                <TextField disabled label="Nome do Hotel" fullWidth variant="standard" value={hotelData.name} sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: 14}, shrink: true  }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField disabled label="CNPJ" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.cnpj} InputLabelProps={{ style: {fontSize: 14}, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>

                            {/* Endereço*/}
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Rua" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.street_address} InputLabelProps={{ style: {fontSize: 14}, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Número" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.number_address} InputLabelProps={{ style: {fontSize: 14}, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Cidade" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.city} InputLabelProps={{ style: {fontSize: 14}, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Estado" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.state} InputLabelProps={{ style: {fontSize: 14}, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="CEP" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.cep} InputLabelProps={{ style: {fontSize: 14}, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>

                            {/*Telefone*/}
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Telefone" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.phone_number} InputLabelProps={{ style: {fontSize: 14}, shrink: true }} InputProps={{ readOnly: true }}/>
                            </Grid>

                        </Grid>
                    </Box>
                ))}
            </Paper>


            <Table sx={{ width: 'auto', mb: 2, mt: 2 }}>
                <TableBody>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                            Adicionar Comodidades
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Redes Sociais*/}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Table sx={{ width: 'auto', mb: 2 }}>
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ fontSize: 12, fontWeight: 'bold', padding: '8px', textAlign: 'center' }}>
                                    Redes Sociais
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ position: 'relative' }}>
                                    <TextField label="Facebook" fullWidth variant="standard" InputLabelProps={{ style: { fontSize: 14 } }} onChange={handleHoverColor} />
                                    {facebookValue && (
                                        <Tooltip title="Salvar" sx={{ position: 'absolute', top: '40%', right: 0, p: 0 }}>
                                            <IconButton>
                                                <IoIosCheckmarkCircleOutline color='#55a630' />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ position: 'relative' }}>
                                    <TextField label="Instagram" fullWidth variant="standard" InputLabelProps={{ style: { fontSize: 14 } }} onChange={handleHoverColor} />
                                    <Tooltip title="Salvar" sx={{ position: 'absolute', top: '40%', right: 0, p: 0 }}>
                                        <IconButton>
                                            <IoIosCheckmarkCircleOutline color='#55a630' />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/* Dados do wi-fi */}
                <Grid item xs={12} sm={6}>
                    <Table sx={{ width: 'auto', mb: 2 }}>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 12, fontWeight: 'bold', padding: '8px', textAlign: 'center' }}>
                                    Wi-fi
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ position: 'relative' }}>
                                    <TextField label="Rede" fullWidth variant="standard" InputLabelProps={{ style: { fontSize: 14 } }} />
                                    <Tooltip title="Salvar" sx={{ position: 'absolute', top: '40%', right: 0, p: 0 }}>
                                        <IconButton color='inherit'>
                                            <IoIosCheckmarkCircleOutline />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ position: 'relative' }}>
                                    <TextField label="Senha" fullWidth variant="standard" InputLabelProps={{ style: { fontSize: 14 } }} />
                                    <Tooltip title="Salvar" sx={{ position: 'absolute', top: '40%', right: 0, p: 0 }}>
                                        <IconButton color='inherit'>
                                            <IoIosCheckmarkCircleOutline />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>

            {/* Horários do Hotel */}
            <Table sx={{ width: 'auto', mb: 2, mt: 2 }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ fontSize: 12, fontWeight: 'bold', padding: '8px', textAlign: 'center' }}>
                            Horários
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Café da manhã" fullWidth variant="standard" InputLabelProps={{ style: { fontSize: 14 } }} />
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}
