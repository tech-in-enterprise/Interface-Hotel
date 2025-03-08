import React, { useState } from 'react'
import { TextField, Grid, Button, Box, Avatar } from '@mui/material'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import Title from '../../general-components/title-from-pages'
import Comodities from './comodities'




export default function ManagmentHotel({ handleSearch }) {
    const [formData, setFormData] = useState({
        social_media_facebook: '',
        social_media_instagram: '',
        wifi_name: '',
        password_wifi: '',
        phone_number_reception: '',
        phone_number_reservation: '',
    })

    const [errors, setErrors] = useState({})
    const [imageUrl, setImageUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)


    const handleImageUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'hotel-photos')

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/do8ruf0ah/image/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
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

    const fields = [
        { id: 1, name: 'social_media_facebook', label: 'Link facebook', xs: 6, required: true },
        { id: 2, name: 'social_media_instagram', label: 'Link instagram', xs: 6, required: true },

        { id: 3, name: 'wifi_name', label: 'Nome da rede', xs: 3, required: true },
        { id: 4, name: 'password_wifi', label: 'Senha do wi-fi', xs: 3, required: true },
        { id: 5, name: 'phone_number_reception', label: 'Telefone recepção', xs: 3, required: true },
        { id: 6, name: 'phone_number_reservation', label: 'Telefone reservas', xs: 3, required: true },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: ''
        })
    }

    return (
        <React.Fragment>
            <Title Title={'Gerenciamento do Hotel'} />
            <Paper elevation={3} sx={{ padding: 1, mb: 2 }}>
                <Grid container spacing={3} sx={{ p: 1 }}>
                    {/* Coluna da imagem */}
                    <Grid item xs={2}>
                    <Box sx={{ position: 'relative' }}>
                            <Avatar
                                sx={{ width: '100%', height: 150, borderRadius: 3, border: '2px solid #ccc', objectFit: ''}} src={imageUrl} >
                                {!imageUrl && <LocationCityIcon sx={{ fontSize: 60 }} />}
                            </Avatar>
                            <Button size="small" variant="contained" component="label" sx={{ position: 'absolute', bottom: 0, width: '100%', fontSize: '0.8rem'}} disabled={isUploading} >
                                {isUploading ? 'Uploading...' : 'Upload Photo'}
                                <input hidden accept="image/*" type="file" onChange={handleImageUpload}/>
                            </Button>
                        </Box>
                    </Grid>

                    {/* Coluna dos campos do formulário */}
                    <Grid item xs={10}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Grid container spacing={2}>
                                {fields.map((field) => (
                                    <Grid item xs={field.xs} key={field.id}>
                                        <TextField
                                            name={field.name}
                                            label={field.label}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]}
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
                                ))}
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" color="success" onClick={handleSearch} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }}>
                                    Voltar
                                </Button>
                                <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Title Title={'Comodities'} />
            <Comodities />

        </React.Fragment>
    )
}
