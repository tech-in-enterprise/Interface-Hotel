import React, { useState } from 'react'
import axios from 'axios'
import { Box, Button, TextField, Avatar, Grid, Checkbox, FormControlLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { createDepartment, } from '../../../redux/slice/managment/departments'
import LocationCityIcon from '@mui/icons-material/LocationCity'



export default function AddDepartment() {
    const dispatch = useDispatch()
    const selectedHotelId = useSelector((state) => state.auth.hotel)
    const [newDepartment, setNewDepartment] = useState('')
    const [is24Hours, setIs24Hours] = useState(true)
    const [startTime, setStartTime] = useState('00:00')
    const [endTime, setEndTime] = useState('23:59')
    const [errors, setErrors] = useState({})

    const validateFields = () => {
        const newErrors = {}
        if (!newDepartment.trim()) newErrors.department = 'O nome do departamento é obrigatório.'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // uploud de imagem
    const [imageUrl, setImageUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    const handleImageUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return
        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'hotel-photos')

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/do8ruf0ah/image/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
            if (response.data.secure_url) setImageUrl(response.data.secure_url)
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error)
        } finally {
            setIsUploading(false)
        }
    }

    // Atualiza os horários com base na flag 24 Horas
    const handle24HoursChange = (checked) => {
        setIs24Hours(checked)
        if (checked) {
            setStartTime('00:00')
            setEndTime('23:59')
        } else {
            setStartTime('00:00')
            setEndTime('00:00')
        }
    }

    // Criar departamento
    const handleAddDepartment = () => {
        if (validateFields()) {
            dispatch(createDepartment({
                name: newDepartment.trim(),
                start_time: startTime,
                end_time: endTime,
                image_url: imageUrl,
                hotel_id: selectedHotelId,
            }))
            setNewDepartment('')
            setImageUrl('')
            setErrors({})
        }
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
            <Grid container spacing={2}>
                {/* Avatar com Botão Upload Absoluto */}
                <Grid item xs={2}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar sx={{ width: '100%', height: 150, borderRadius: 2, border: '2px solid #ccc' }}>
                            {imageUrl ?
                            (<img src={imageUrl} alt="Icone Departamento" style={{ width: '100%', height: '100%', objectFit: 'contain'}}/>) : (
                                <LocationCityIcon sx={{ fontSize: 60 }} />
                            )}
                        </Avatar>
                        <Button size="small" variant="contained" component="label" disabled={isUploading} sx={{ position: 'absolute', bottom: 0, width: '100%', fontSize: '0.8rem' }}>
                            {isUploading ? 'Uploading...' : 'Upload Icon'}
                            <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                        </Button>
                    </Box>
                </Grid>

                {/* Inputs ao lado do Avatar */}
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        {/* Input para Criar Departamento */}
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                size="medium"
                                label="Criar departamento"
                                fullWidth
                                value={newDepartment}
                                onChange={(e) => setNewDepartment(e.target.value)}
                                placeholder="Criar novo departamento"
                                error={!!errors.department}
                                helperText={errors.department}
                                InputProps={{
                                    style: { height: '40px', padding: '0' },
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: '0.9rem',
                                        lineHeight: '15px',
                                        paddingRight: 2,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Inputs de Horário */}
                        <Grid item xs={4} container spacing={1}>
                            <Grid item xs={12} sx={{ display: 'flex' }}>
                                <TextField
                                    id="time"
                                    type="time"
                                    label="Hora inicial"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    fullWidth
                                    disabled={is24Hours}
                                    sx={{ mr: 1 }}
                                    InputProps={{
                                        style: { height: '40px', padding: '0' },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '0.9rem',
                                            lineHeight: '15px',
                                            paddingRight: 2,
                                        },
                                    }}
                                />
                                <TextField
                                    id="time"
                                    type="time" // Ajuste para "time"
                                    label="Hora final"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    fullWidth
                                    disabled={is24Hours}
                                    InputProps={{
                                        style: { height: '40px', padding: '0' },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '0.9rem',
                                            lineHeight: '15px',
                                            paddingRight: 2,
                                        },
                                    }}
                                />

                            </Grid>

                        </Grid>
                    </Grid>
                    {/* Flag 24 Horas */}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            onChange={(e) => handle24HoursChange(e.target.checked)}
                            checked={is24Hours}
                            label="24 Horas"
                            sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                        />
                    </Grid>
                </Grid>


                {/* Botões de Ação */}
                <Grid item xs={12}>
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


    )
}
