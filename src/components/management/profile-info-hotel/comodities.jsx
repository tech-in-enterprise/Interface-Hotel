import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Avatar, TextField, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, Skeleton } from '@mui/material'
import { CheckCircle as CheckCircleIcon, DeleteForever as DeleteForeverIcon, BorderColor as BorderColorIcon, LocationCity as LocationCityIcon, Cancel as CancelIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../general-components/title-from-pages'
import AlertMessages from '../../general-components/alert-messages'
import AddComodities from './add-comodities'
import { deleteAmenity, getAmenity, updateAmenity } from '../../../redux/slice/managment/hotel_amenities'


export default function Comodities() {
    const dispatch = useDispatch()
    const selectedHotelId = useSelector((state) => state.auth.hotel)
    const { amenities, message, error, loading } = useSelector((state) => state.amenities)

    const [filteredAmenities, setFilteredAmenities] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({})
    const [imageUrls, setImageUrls] = useState({})
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        dispatch(getAmenity())
    }, [dispatch])

    useEffect(() => {
        if (Array.isArray(amenities) && selectedHotelId) {
            const filtered = amenities.filter(({ hotel_id }) => String(hotel_id) === String(selectedHotelId));
            setFilteredAmenities(filtered);

            const imageMap = filtered.reduce((acc, { id, image_amenity_url }) => {
                acc[id] = image_amenity_url || '';
                return acc;
            }, {});

            setImageUrls(imageMap);
        }
    }, [amenities, selectedHotelId]);


    //faz um switch e mostra os campos de edição ao clicar em editar
    const handleEditClick = (amenity) => {
        setEditingId(amenity.id)
        setFormData({
            [amenity.id]: {
                name: amenity.name || '',
                start_time: amenity.start_time || '',
                end_time: amenity.end_time || ''
            }
        })
    }


    //cancela edição e limpa os campos de edição
    const handleCancel = () => {
        setEditingId(null)
        setFormData((prev) => {
            const newData = { ...prev }
            delete newData[editingId]
            return newData
        })
    }


    const handleSaveClick = async (amenityId) => {
        if (!amenityId || !formData[amenityId]) return

        const updatedAmenity = {
            id: amenityId,
            name: formData[amenityId].name,
            start_time: formData[amenityId].start_time,
            end_time: formData[amenityId].end_time,
            image_amenity_url: imageUrls[amenityId],
            hotel_id: selectedHotelId,
        }

        const result = await dispatch(updateAmenity(updatedAmenity))

        if (updateAmenity.fulfilled.match(result)) {
            await dispatch(getAmenity())
            setEditingId(null)
            setFormData({})
        } else {
            console.error("❌ Erro ao atualizar amenidade:", result)
        }
    }


    const handleImageUpload = async (event, amenityId) => {
        const file = event.target.files[0]
        if (!file) return

        setIsUploading(true)
        const formImageData = new FormData()
        formImageData.append('file', file)
        formImageData.append('upload_preset', 'hotel-photos')

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/do8ruf0ah/image/upload', formImageData)
            setImageUrls((prev) => ({ ...prev, [amenityId]: response.data.secure_url }))
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error)
        } finally {
            setIsUploading(false)
        }
    }

    // Deletar departamento
    const handleDeleteAmenity = (amenityId) => {
        dispatch(deleteAmenity(amenityId))
    }


    return (
        <>
            <AlertMessages filtroMap={filteredAmenities} error={error} stateFromRedux={filteredAmenities} loading={loading} message={message} infoMessage='Você ainda não possui amenidades criadas.' />
            <Title Title='Amenidades do Hotel' />
            <AddComodities />

            {loading ? (
                <Skeleton variant='rectangular' width='100%' height={200} />
            ) : filteredAmenities.length > 0 && selectedHotelId && (
                <Table size='small' sx={{ mt: 2 }}>
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
                        {filteredAmenities.map((amenity) => (
                            <TableRow key={amenity.id} sx={{ background: '#FFF' }}>
                                <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label htmlFor={`image-upload-${amenity.id}`} style={{ cursor: 'pointer' }}>
                                        <input hidden accept='image/*' type='file' id={`image-upload-${amenity.id}`} onChange={(e) => handleImageUpload(e, amenity.id)} />
                                        <Avatar src={imageUrls[amenity.id] || ''} sx={{ borderRadius: 2, border: '2px solid #ccc' }}>
                                            {!imageUrls[amenity.id] && <LocationCityIcon />}
                                        </Avatar>
                                    </label>
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                    {editingId === amenity.id ? (
                                        <TextField
                                            value={formData[editingId]?.name || ''}
                                            onChange={(e) => setFormData((prev) => ({
                                                ...prev,
                                                [editingId]: {
                                                    ...prev[editingId],
                                                    name: e.target.value
                                                }
                                            }))}
                                            InputProps={{
                                                style: { height: '40px', padding: '0', marginRight: 10 }
                                            }}
                                        />
                                    ) : (
                                        amenity.name
                                    )}
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                    {editingId === amenity.id ? (
                                        <>
                                            <TextField
                                                type='time'
                                                value={formData[editingId]?.start_time || ''}
                                                onChange={(e) => setFormData((prev) => ({
                                                    ...prev,
                                                    [editingId]: {
                                                        ...prev[editingId],
                                                        start_time: e.target.value
                                                    }
                                                }))}
                                                InputProps={{
                                                    style: { height: '40px', padding: '0', marginRight: 10 }
                                                }}
                                            />
                                            <TextField
                                                type='time'
                                                value={formData[editingId]?.end_time || ''}
                                                onChange={(e) => setFormData((prev) => ({
                                                    ...prev,
                                                    [editingId]: {
                                                        ...prev[editingId],
                                                        end_time: e.target.value
                                                    }
                                                }))}
                                                InputProps={{
                                                    style: { height: '40px', padding: '0', marginRight: 10 }
                                                }}
                                            />
                                        </>
                                    ) : (
                                        amenity.start_time === '00:00' && amenity.end_time === '23:59' ? '24 hrs' : `${amenity.start_time} - ${amenity.end_time}`
                                    )}
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                    {editingId === amenity.id ? (
                                        <>
                                            <Tooltip title='Salvar'>
                                                <IconButton onClick={() => { handleSaveClick(amenity.id) }}>
                                                    <CheckCircleIcon style={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title='Cancelar'>
                                                <IconButton onClick={handleCancel}>
                                                    <CancelIcon style={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <>
                                            <Tooltip title='Editar Amenidade'>
                                                <IconButton onClick={() => handleEditClick(amenity)}>
                                                    <BorderColorIcon style={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Deletar Amenidade">
                                                <IconButton onClick={() => handleDeleteAmenity(amenity.id)}>
                                                    <DeleteForeverIcon style={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}
