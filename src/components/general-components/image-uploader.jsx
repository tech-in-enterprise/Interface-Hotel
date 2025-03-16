import React, { useState } from 'react'
import axios from 'axios'
import { Grid, Button, Box, Avatar } from '@mui/material'
import LocationCityIcon from '@mui/icons-material/LocationCity'


export default function ImageUploader({ isEditing, filteredHotelProfile, imageUrl, setImageUrl }) {

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
            <Grid item xs={2}>
                <Box sx={{ position: 'relative' }}>
                    <Avatar sx={{ width: '100%', height: 150, borderRadius: 2, border: '2px solid #ccc' }} src={imageUrl}>
                        {imageUrl ? (
                            <img src={imageUrl} alt='Imagem do hotel' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                            <LocationCityIcon sx={{ fontSize: 60 }} />
                        )}
                    </Avatar>
                    <Button size='small' variant='contained' component='label' sx={{ position: 'absolute', bottom: 0, width: '100%', fontSize: '0.8rem' }} disabled={isUploading || (!isEditing && !filteredHotelProfile)} >
                        {isUploading ? 'Uploading...' : 'Upload Foto'}
                        <input hidden accept='image/*' type='file' onChange={handleImageUpload} />
                    </Button>
                </Box>
            </Grid>

    )
}
