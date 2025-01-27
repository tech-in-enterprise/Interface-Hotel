import React, { useState, useEffect } from 'react'
import { TextField, Avatar, Button, Grid, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import Alert from '@mui/material/Alert'
import Title from '../../general-components/title-from-pages'
import { getHotelById } from '../../../redux/slice/managment/profile-info-hotel'



export default function ManagmentHotel() {

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

            {/* Horários do Hotel */}
            <Title Title={'Horários do Hotel'} />
            <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems='flex-start'>
                    <Grid item xs={2}>
                        <Avatar sx={{ width: '100%', height: 100, borderRadius: 3, border: '2px solid #ccc' }}>
                            <LocationCityIcon sx={{ fontSize: 60 }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            variant="outlined"
                            size="medium"
                            fullWidth
                            placeholder="Criar Novo Serviço"
                            sx={{mt: 1}}
                            InputProps={{
                                style: { height: '40px', padding: '0' }
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: '0.9rem',
                                    lineHeight: '15px',
                                    paddingRight: 2
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Button size='small' variant="contained" fullWidth component="label" sx={{ bottom: 0 }} style={{ fontSize: 10 }}>
                            Upload Photo
                            <input hidden accept="image/*" type="file" />
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={1} justifyContent="flex-end">
                            <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }}>
                                Adicionar
                            </Button>
                            <Button variant="contained" color="error" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        </React.Fragment >
    )
}
