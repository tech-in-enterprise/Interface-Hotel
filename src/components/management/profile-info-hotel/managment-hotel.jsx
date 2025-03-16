import React, { useState, useEffect } from 'react'
import { TextField, Grid, Button, Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Title from '../../general-components/title-from-pages'
import Comodities from './comodities'
import AlertMessages from '../../general-components/alert-messages'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelById, managementProfileHotel, updateManagementProfileHotel } from '../../../redux/slice/managment/profile-info-hotel'
import ImageUploader from '../../general-components/image-uploader'
import Skeleton from '@mui/material/Skeleton'


export default function ManagementHotel() {
    const [formData, setFormData] = useState({
        social_media_facebook: '',
        social_media_instagram: '',
        wifi_name: '',
        password_wifi: '',
        phone_number_reception: '',
        phone_number_reservation: ''
    })

    const dispatch = useDispatch()
    const selectedHotelId = useSelector((state) => state.auth.hotel)
    const { hotelProfileById, message, error, loading } = useSelector((state) => state.hotelProfileById)

    const [initialFormData, setInitialFormData] = useState(formData)
    const [errors, setErrors] = useState({})
    const [imageUrl, setImageUrl] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [filteredHotelProfile, setFilteredHotelProfile] = useState([])

    //Bucar o id do hotel logado
    useEffect(() => {
        if (selectedHotelId) {
            dispatch(getHotelById(selectedHotelId))
        }
    }, [selectedHotelId, dispatch])

    // Filtrar o hotel que está sendo reenderizado
    useEffect(() => {
        if (Array.isArray(hotelProfileById) && selectedHotelId) {
            const filtered = hotelProfileById.filter(
                (profileHotel) => String(profileHotel.hotel_id) === String(selectedHotelId)
            )
            setFilteredHotelProfile(filtered)
        }
    }, [hotelProfileById, selectedHotelId])

    //Popular os inputs com os dados do bando de dados do respectivo hotel filtrado
    useEffect(() => {
        if (filteredHotelProfile.length > 0) {
            const hotelData = filteredHotelProfile[0]
            if (hotelData) {
                const newFormData = {
                    social_media_facebook: hotelData.facebook_url || '',
                    social_media_instagram: hotelData.instagram_url || '',
                    wifi_name: hotelData.wifi_network || '',
                    password_wifi: hotelData.wifi_password || '',
                    phone_number_reception: hotelData.reception_phone || '',
                    phone_number_reservation: hotelData.reservation_phone || ''
                }
                setFormData(newFormData)
                setInitialFormData(newFormData)
                setImageUrl(hotelData.image_hotel_url || '')
                setIsEditing(false)
            }
        }
    }, [filteredHotelProfile])



    //Campos com os valores dos inputs
    const fields = [
        { name: 'social_media_facebook', label: 'Link Facebook', xs: 6, required: true },
        { name: 'social_media_instagram', label: 'Link Instagram', xs: 6, required: true },
        { name: 'wifi_name', label: 'Nome da Rede', xs: 3, required: true },
        { name: 'password_wifi', label: 'Senha do Wi-Fi', xs: 3, required: true },
        { name: 'phone_number_reception', label: 'Telefone Recepção', xs: 3, required: true },
        { name: 'phone_number_reservation', label: 'Telefone Reservas', xs: 3, required: true }
    ]

    //Validação do formulários (inputs)
    const validateFields = () => {
        const newErrors = {}
        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} é obrigatório`
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    //Pega valor dos inputs quando são alterados
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }


    //Botão para quando cancelar inputs
    const handleCancel = () => {
        setFormData(initialFormData)
        setErrors({})
        setIsEditing(false)
    }

    //Botão para quando salvar inputs
    const handleSave = () => {
        if (validateFields()) {
            dispatch(
                updateManagementProfileHotel({
                    image_hotel_url: imageUrl,
                    instagram_url: formData.social_media_instagram,
                    facebook_url: formData.social_media_facebook,
                    wifi_network: formData.wifi_name,
                    wifi_password: formData.password_wifi,
                    reception_phone: formData.phone_number_reception,
                    reservation_phone: formData.phone_number_reservation,
                    hotel_id: selectedHotelId
                })
            )
            setIsEditing(false)
        }
    }

    //validar campos pela função validateFilds e enviar dados para o backend
    const handleCreate = () => {
        if (validateFields()) {
            const newHotelData = {
                image_hotel_url: imageUrl,
                instagram_url: formData.social_media_instagram,
                facebook_url: formData.social_media_facebook,
                wifi_network: formData.wifi_name,
                wifi_password: formData.password_wifi,
                reception_phone: formData.phone_number_reception,
                reservation_phone: formData.phone_number_reservation,
                hotel_id: selectedHotelId
            }
            dispatch(managementProfileHotel(newHotelData))
            setFilteredHotelProfile([newHotelData])
        }
    }

    return (
        <>
            <AlertMessages filtroMap={filteredHotelProfile} error={error} stateFromRedux={filteredHotelProfile} loading={loading} message={message} infoMessage='Você ainda não possui um Perfil.' />

            <Title Title='Gerenciamento do Hotel' />

            <Paper elevation={3} sx={{ padding: 1, mb: 2 }}>
                <Grid container spacing={3} sx={{ p: 1 }}>

                    {loading ? (
                        <>
                            <Grid item xs={2}>
                                <Skeleton variant="rectangular" height={150} />
                            </Grid>
                            <Grid item xs={10}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Grid container spacing={3}>
                                        {fields.map((field) => (
                                            <Grid item xs={field.xs} key={field.name}>
                                                <Skeleton variant="rectangular" height='40px' />
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                                        <Skeleton variant="rectangular" height='40px' />
                                        <Skeleton variant="rectangular" height='40px' />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <Skeleton width={90} height={60}/>
                                </Box>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <ImageUploader isEditing={isEditing} filteredHotelProfile={filteredHotelProfile.length === 0} imageUrl={imageUrl} setImageUrl={(url) => setImageUrl(url)} />

                            <Grid item xs={10}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Grid container spacing={2}>
                                        {fields.map((field) => (
                                            <Grid item xs={field.xs} key={field.name}>
                                                <TextField
                                                    name={field.name}
                                                    label={field.label}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant='outlined'
                                                    disabled={filteredHotelProfile.length > 0 && !isEditing}
                                                    error={!!errors[field.name]}
                                                    helperText={errors[field.name]}
                                                    InputProps={{ style: { height: '40px', padding: '0' } }}
                                                    InputLabelProps={{
                                                        style: { fontSize: '0.9rem', lineHeight: '15px', paddingRight: 2 }
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        {filteredHotelProfile.length === 0 ? (
                                            <Button variant='contained' color='primary' sx={{ fontSize: '0.8rem', textTransform: 'none' }} onClick={handleCreate}>
                                                Criar Perfil
                                            </Button>
                                        ) : isEditing ? (
                                            <>
                                                <Button variant='contained' color='error' sx={{ fontSize: '0.8rem', textTransform: 'none', mr: 1 }} onClick={handleCancel} >
                                                    Cancelar
                                                </Button>
                                                <Button variant='contained' color='primary' sx={{ fontSize: '0.8rem', textTransform: 'none' }} onClick={handleSave}>
                                                    Salvar
                                                </Button>
                                            </>
                                        ) : (
                                            <Button variant="contained" sx={{ fontSize: '0.8rem', textTransform: 'none', mr: 1, background: '#ffc26c' }} onClick={() => setIsEditing(true)}>
                                                Editar
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Paper>

            <Title Title='Amenidades do Hotel' />
            <Comodities />
        </>
    )
}
