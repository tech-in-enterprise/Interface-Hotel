
import React, { useState } from 'react'
import axios from 'axios'
import { Box, Button, Paper, Typography, TextField, Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createAmenity } from '../../../redux/slice/managment/hotel_amenities'
import LocationCityIcon from '@mui/icons-material/LocationCity'



export default function AddComodities() {
    const dispatch = useDispatch()
    const selectedHotelId = useSelector((state) => state.auth.hotel)

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
                image_amenity_url: imageUrl,
                hotel_id: selectedHotelId,
            }))
            setNewAmenity('')
            setErrors({})
        }
    }

    const [imageUrl, setImageUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    //Subir imagem para nuvem cloudinary
    const handleImageUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setIsUploading(true)
        const formImageData = new FormData()
        formImageData.append('file', file)
        formImageData.append('upload_preset', 'hotel-photos')

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/do8ruf0ah/image/upload', formImageData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (response.data.secure_url) {
                setImageUrl(response.data.secure_url)
            }
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error)
        } finally {
            setIsUploading(false)
        }
    }



    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ padding: 2, mt:2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                        <Box sx={{ mr: 2, cursor: 'pointer' }}>
                            <input id="image-upload" hidden accept="image/*" type="file" onChange={handleImageUpload} />
                            <label htmlFor="image-upload">
                                <Avatar sx={{ width: 40, height: 40, borderRadius: 2, border: '2px solid #ccc', cursor: 'pointer' }} src={imageUrl}>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt='Imagem do hotel' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    ) : (
                                        <LocationCityIcon />
                                    )}
                                </Avatar>
                            </label>
                        </Box>
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


                    <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }} onClick={handleAddAmenity}>
                        Adicionar
                    </Button>

                </Box>
            </Paper>
        </React.Fragment>

    )
}