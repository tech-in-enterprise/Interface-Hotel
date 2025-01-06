import React, { useState, useEffect } from 'react'
import { Button, Box } from '@mui/material'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelById } from '../../../redux/slice/admin/register-hotel'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'
import Title from '../../general-components/title-from-pages'
import { setHotel, clearHotel } from '../../../redux/slice/auth/loginSlice'
import { useNavigate } from 'react-router-dom'
import FilterEntities from './filter-entities'
import AddEntities from './add-entities'




export default function AllEntities() {

    const [addEntity, setAddEntity] = useState(false)
    const [filteredEntities, setFilteredEntities] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectedHotel = useSelector((state) => state.auth.hotel)
    const { hotelRegister, loading, message, error } = useSelector((state) => state.hotel)

    //adiciona e pesquisa de entidades 
    const handleAddEntity = () => {
        setAddEntity(true)
    }

    const handleSearch = () => {
        setAddEntity(false)
    }

    // Retorna todos as entidades criadas
    useEffect(() => {
        dispatch(getHotelById())
    }, [dispatch])

    // Restaurar a entidade filtrada do cookie ao carregar a página
    useEffect(() => {
        if (selectedHotel && hotelRegister.length > 0) {
            const selectedEntity = hotelRegister.find((entity) => String(entity.id) === String(selectedHotel))
            if (selectedEntity) {
                setFilteredEntities([selectedEntity])
                dispatch(setHotel(selectedHotel))
            }
        }
    }, [dispatch, hotelRegister])



    //associa o id do hotel selecionado ao atributo hotel do admin (para o admin poder acessar o hotel selecionado em entidades)
    // Acessar uma entidade específica
    const handleAccessEntity = (hotel_id) => {
        const selectedEntity = hotelRegister.find((entity) => entity.id === hotel_id)
        if (selectedEntity) {
            dispatch(setHotel(hotel_id))
            setFilteredEntities([selectedEntity])
            navigate(`/admin/entidades/${hotel_id}`)
        }
    }

    // Sair da entidade selecionada
    const handleExitEntity = () => {
        setFilteredEntities(null)
        dispatch(clearHotel())
        navigate('/admin/entidades')
    }

    return (
        <React.Fragment>
            {/* Mostrar mensagens */}
            {loading && <Alert sx={{ mt: 0, mb: 1 }} severity="info">{message}</Alert>}
            {error && !loading && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="error">{error}</Alert>
            )}

            <Title Title={'Gerenciamento de Entidades'} />
            <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', mt: 2 }}>
                    {addEntity ? (
                        <AddEntities handleSearch={handleSearch} />
                    ) : (
                        <FilterEntities handleSearch={handleSearch} handleAddEntity={handleAddEntity} />
                    )}
                </Box>
            </Paper>

            <Title Title={'Entidades'} />
            {loading ? (
                <Paper elevation={3} sx={{ padding: 2, mt: 1 }}>
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
                                {(filteredEntities || hotelRegister).map((entity) => (
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
                                            {String(selectedHotel) === String(entity.id) ? (
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