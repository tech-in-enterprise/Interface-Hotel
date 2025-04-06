
import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createAmenity } from '../../../redux/slice/managment/hotel_amenities'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'


export default function UpdateComodities({amenity}) {
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
            <Table size="small" sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '10%' }}>
                            Ícones
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '40%' }}>
                            Amenidades
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '25%' }}>
                            Horários
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                            Ações
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ background: '#FFF', height: '60px' }}>
                        <TableCell sx={{ border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px' }}>
                            <input id="image-upload" hidden accept="image/*" type="file" onChange={handleImageUpload} />
                            <label htmlFor="image-upload">
                                <Avatar sx={{ borderRadius: 2, border: '2px solid #ccc', cursor: 'pointer' }} src={imageUrl}>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt='Imagem do hotel' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    ) : (
                                        <LocationCityIcon />
                                    )}
                                </Avatar>
                            </label>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                            <TextField
                                name="text"
                                type="text"
                                value={'oi'}
                                variant="outlined"
                                onChange={(e) => setNewAmenity(e.target.value)}
                                error={!!errors.department}
                                helperText={errors.department}
                                InputProps={{
                                    style: { height: '40px', padding: '0', marginRight: 10 },
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: '0.9rem',
                                        lineHeight: '15px',
                                        paddingRight: 2
                                    },
                                    shrink: false
                                }}
                            />
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
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
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                            <Tooltip title="Salvar edição">
                                <IconButton onClick={() => setEditingId(false)}>
                                    <CheckCircleIcon style={{ fontSize: '1rem' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Deletar Departamento">
                                <IconButton>
                                    <DeleteForeverIcon style={{ fontSize: '1rem' }} />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>

    )
}