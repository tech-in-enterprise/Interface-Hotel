import React, { useState, useEffect } from 'react'
import { Button, Box } from '@mui/material'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelById } from '../../../redux/slice/managment/profile-info-hotel'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'
import Title from '../../general-components/title-from-pages'
import { clearHotel, setHotel } from '../../../redux/slice/auth/loginSlice'
import { removeHotelFromUser, updateHotelId } from '../../../redux/slice/admin/users'
import { useNavigate } from 'react-router-dom'
import FilterEntities from './filter-entities'
import AddEntities from './add-entities'
import { setHotelName } from '../../../redux/slice/menuSlice'




export default function AllEntities() {

    const [addEntity, setAddEntity] = useState(false)
    const [filteredEntities, setFilteredEntities] = useState(null)
    const [visibleMessage, setVisibleMessage] = useState(null)
    const [visibleError, setVisibleError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selectedHotelId = useSelector((state) => state.auth.hotel)
    const { hotelProfileById, loading, message, error } = useSelector((state) => state.hotelProfileById)


    // Exibir mensagem com duração de 5 segundos
    useEffect(() => {
        if (message) {
            setVisibleMessage(message)
            const timer = setTimeout(() => {
                setVisibleMessage(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
        setVisibleMessage('')
    }, [message, hotelProfileById])

    // Exibir erro com duração de 5 segundos
    useEffect(() => {
        if (error) {
            setVisibleError(error)
            const timer = setTimeout(() => setVisibleError(null), 3000)
            return () => clearTimeout(timer)
        }
        setVisibleError('')
    }, [error])

    //adiciona e pesquisa de entidades 
    const handleAddEntity = () => {
        setAddEntity(true)
    }

    const handleSearch = () => {
        setAddEntity(false)
    }


    // Retorna todos as entidades criadas e usuários atualizados
    useEffect(() => {
        dispatch(getHotelById())
    }, [dispatch])

    // Restaurar a entidade filtrada do cookie ao carregar a página
    useEffect(() => {
        if (selectedHotelId && hotelProfileById.length > 0) {
            const selectedEntity = hotelProfileById.find((entity) => String(entity.id) === String(selectedHotelId))
            if (selectedEntity) {
                setFilteredEntities([selectedEntity])
                dispatch(setHotel(selectedHotelId))
            }
        }
    }, [dispatch, hotelProfileById])

    // Associa o id do hotel selecionado ao atributo hotel do admin
    const handleAccessEntity = async (hotel_id) => {
        const selectedEntity = hotelProfileById.find((entity) => entity.id === hotel_id)
        if (selectedEntity) {
            dispatch(updateHotelId({ hotel_id }))
            dispatch(setHotel(hotel_id))
            setFilteredEntities([selectedEntity])
            navigate(`/admin/entidades/${hotel_id}`)
            dispatch(setHotelName([selectedEntity.hotel_name]))
        }
    }

    // Sair da entidade selecionada
    const handleExitEntity = () => {
        dispatch(clearHotel())
        dispatch(removeHotelFromUser())
        setFilteredEntities(null)
        navigate('/admin/entidades')
        dispatch(setHotelName(''))
    }

    return (
        <React.Fragment>
            {/* Mostrar mensagens */}
            {loading && <Alert sx={{ mt: 0, mb: 1 }} severity="info">{message}</Alert>}
            {visibleError && <Alert sx={{ mt: 0, mb: 1 }} severity="error">{visibleError}</Alert>}
            {visibleMessage && !loading && !error && (
                <Alert sx={{ mt: 0, mb: 1 }} severity={visibleMessage.includes('sucesso') ? 'success' : 'info'}>{visibleMessage}</Alert>
            )}
            {hotelProfileById.length === 0 && !visibleMessage && !loading && !error && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="info">Você não possui entidades criadas.</Alert>
            )}
            {error && !loading && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="error">{error}</Alert>
            )}
            {!selectedHotelId && (
                <>
                    <Title Title={'Gerenciamento de Entidades'} />
                    <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', mt: 2 }}>
                            {addEntity ? (
                                <AddEntities handleSearch={handleSearch} />
                            ) : (
                                <FilterEntities handleSearch={handleSearch} handleAddEntity={handleAddEntity} />
                            )}
                        </Box>
                    </Paper>
                </>
            )}

            <Title Title={'Entidades'} />
            {loading ? (
                <Paper elevation={3}>
                    <Table size="small">
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ) : error ? (
                <Paper elevation={3} sx={{ padding: 2 }} >
                    <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{ background: '#616161' }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error cnpj</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error phone_number</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error city</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Error state</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            ) : (
                <>
                    <Paper elevation={3} sx={{ padding: 2 }} >
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ background: '#101F33' }}>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Razão Social
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Entidades
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        CNPJ
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Estado
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Ações
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(filteredEntities || hotelProfileById).map((entity) => (
                                    <TableRow sx={{ background: '#FFF' }} key={entity.id}>
                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                            <Box>{entity.registered_name}</Box>
                                        </TableCell>
                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                            <Box>{entity.hotel_name}</Box>
                                        </TableCell>
                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                            <Box>{entity.cnpj}</Box>
                                        </TableCell>
                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                            <Box>{entity.state}</Box>
                                        </TableCell>

                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>

                                            {String(selectedHotelId) === String(entity.id) ? (
                                                <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', textTransform: 'none' }} onClick={handleExitEntity}>
                                                    Sair
                                                </Button>
                                            ) : (
                                                <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', textTransform: 'none' }} onClick={() => handleAccessEntity(entity.id)}>
                                                    Acessar Entidade
                                                </Button>
                                            )}
                                        </TableCell>

                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </Paper>
                </>
            )}
        </React.Fragment>
    )
}