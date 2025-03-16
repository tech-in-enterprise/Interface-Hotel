
import React, { useState } from 'react'
import { Box, Button, Grid, Paper, Typography, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createAmenity } from '../../../redux/slice/managment/hotel_amenities'



export default function Comodities() {
    const dispatch = useDispatch()
    const selectedHotelId = useSelector((state) => state.auth.hotel)
    const { amenities, message, error, loading } = useSelector((state) => state.amenities)

    const [newAmenity, setNewAmenity] = useState('')
    const [startTime, setStartTime] = useState('00:00')
    const [endTime, setEndTime] = useState('00:00')
    const [errors, setErrors] = useState({})

    const validateFields = () => {
        const newErrors = {}
        if (!newAmenity.trim()) newErrors.department = 'O nome da amenidade é obrigatório.'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Criar departamento
    const handleAddAmenity = () => {
        if (validateFields()) {
            dispatch(createAmenity({
                name: newAmenity.trim(),
                start_time: startTime,
                end_time: endTime,
                hotel_id: selectedHotelId,
            }))
            setNewAmenity('')
            setErrors({})
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                <TextField
                                    name="text"
                                    type="text"
                                    label="Ex. Café da manhã"
                                    value={newAmenity}
                                    variant="outlined"
                                    onChange={(e) => setNewAmenity(e.target.value)}
                                    error={!!errors.department}
                                    helperText={errors.department}
                                    InputProps={{
                                        style: { height: '40px', padding: '0', marginRight: 10 }
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '0.9rem',
                                            lineHeight: '15px',
                                            paddingRight: 2
                                        }
                                    }}
                                />

                                <TextField
                                    id="time"
                                    type="time"
                                    label="Hora inicial"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    InputProps={{
                                        style: { height: '40px', padding: '0', marginRight: 10 }
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '0.9rem',
                                            lineHeight: '15px',
                                            paddingRight: 2
                                        }
                                    }}
                                />

                                <Typography sx={{ mr: 1 }}>até</Typography>

                                <TextField
                                    id="time"
                                    type="time"
                                    label="Hora final"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
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
                            </Box>


                            <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}  onClick={handleAddAmenity}>
                                Adicionar
                            </Button>

                        </Box>
                    </Paper>

                </Grid>
            </Grid>

        </React.Fragment>

    )
}