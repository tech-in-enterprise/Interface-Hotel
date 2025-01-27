import React, { useState, useEffect } from 'react'
import { Box, TextField, Avatar, Button, Grid, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'
import Title from '../../general-components/title-from-pages'
import { getHotelById } from '../../../redux/slice/managment/profile-info-hotel'




export default function ProfileHotel() {

    //pega as informações dos dados (nome, cnpj, email, etc..) e retorna na tela através de hotelProfileById
    const dispatch = useDispatch()
    const { hotelProfileById, loading, error, message } = useSelector((state) => state.hotelProfileById)

    const selectedHotelId = useSelector((state) => state.auth.hotel)


    // Retorna os dados do hotel criado
    useEffect(() => {
        dispatch(getHotelById())
    }, [dispatch])

    const [filteredUsers, setFilteredUsers] = useState([])
    useEffect(() => {
        if (selectedHotelId) {
            const filtered = hotelProfileById.filter((hotel) => String(hotel.id) === String(selectedHotelId))
            setFilteredUsers(filtered)
        } else {
            setFilteredUsers(hotelProfileById)
        }
    }, [selectedHotelId, hotelProfileById])

    return (
        <React.Fragment>
            {/* Mostrar mensagens */}
            {loading && <Alert sx={{ mt: 0, mb: 1 }} severity="info">{message}</Alert>}
            {error && !loading && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="error">{error}</Alert>
            )}

            <Title Title={"Gerencialmento de Perfil"} />

            {loading ? (
                <Box sx={{ flexGrow: 1, ml: 3 }}>
                    <Grid container spacing={2}>
                        {/* Nome do hotel e CNPJ */}
                        <Grid item xs={12} sm={6}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} width="80%" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} width="80%" />
                        </Grid>

                        {/* Endereço */}
                        <Grid item xs={12} sm={3}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} width="90%" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} width="90%" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} width="90%" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} width="90%" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} width="90%" />
                        </Grid>

                        {/* Telefone */}
                        <Grid item xs={12} sm={3}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', m: 1 }} width="90%" />
                        </Grid>
                    </Grid>
                </Box>
            ) : error ? (
                // Mostra os campos com apenas os labels se houver erro
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField disabled label="Nome do Hotel" fullWidth variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField disabled label="Nome Fantasia" fullWidth variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' } }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField disabled label="Rua" fullWidth variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' } }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField disabled label="Número" fullWidth variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' } }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField disabled label="Cidade" fullWidth variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' } }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField disabled label="Estado" fullWidth variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' } }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField disabled label="CEP" fullWidth variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' } }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField disabled label="Telefone" fullWidth variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' } }} />
                    </Grid>
                </Grid>
            ) : (
                <>
                    {/* Dados do hotel */}
                    {filteredUsers.map((hotelData) => (
                        <Box sx={{ flexGrow: 1, ml: 3 }} key={hotelData.id}>
                            <Grid container spacing={2}>
                                {/* Nome do hotel e CNPJ */}
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="Razão social" fullWidth variant="standard" value={hotelData.registered_name} sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="Nome fantasia" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.hotel_name} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="CNPJ" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.cnpj} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>

                                {/*Telefone*/}
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="Email" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.hotel_email} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>

                                {/*Telefone*/}
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="Telefone" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.phone_number} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>

                                {/* Endereço*/}
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="Rua" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.street_address} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="Número" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.number_address} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="Cidade" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.city} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="Estado" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.state} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField disabled label="CEP" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.cep} InputLabelProps={{ style: { fontSize: '0.9rem' }, shrink: true }} InputProps={{ readOnly: true }} />
                                </Grid>


                            </Grid>
                        </Box>
                    ))}
                </>
            )}


        </React.Fragment >
    )
}
