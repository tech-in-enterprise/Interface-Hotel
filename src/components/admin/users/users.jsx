import React, { useState, useEffect } from 'react'
import { Alert, Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRoles } from '../../../redux/slice/roles/roleSlice'
import { getHotelById } from '../../../redux/slice/managment/profile-info-hotel'
import { getUsers } from '../../../redux/slice/admin/users'
import Title from '../../general-components/title-from-pages'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import AddUsers from './addUser'



export default function Users() {

    const dispatch = useDispatch()
    const { users, message, error, loading } = useSelector((state) => state.users)
    const selectedHotelId = useSelector((state) => state.auth.hotel)

    const [visibleMessage, setVisibleMessage] = useState(null)
    const [visibleError, setVisibleError] = useState(null)

    useEffect(() => {
        dispatch(getAllRoles())
        dispatch(getHotelById())
        dispatch(getUsers())
    }, [dispatch])

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
    }, [message, users])

    // Exibir erro com duração de 5 segundos
    useEffect(() => {
        if (error) {
            setVisibleError(error)
            const timer = setTimeout(() => setVisibleError(null), 3000)
            return () => clearTimeout(timer)
        }
        setVisibleError('')
    }, [error])

    // Atualizar os usuários filtrados quando selectedHotelId ou users mudarem
    const [filteredUsers, setFilteredUsers] = useState([])
    useEffect(() => {
        if (selectedHotelId) {
            const filtered = users.filter((user) => String(user.hotel_id) === String(selectedHotelId))
                .filter((user) => user.role.access_level !== "Administrador")
            setFilteredUsers(filtered)
        } else {
            setFilteredUsers(users)
        }
    }, [selectedHotelId, users])



    return (
        <React.Fragment>
            {loading && <Alert sx={{ mt: 0, mb: 1 }} severity="info">{message}</Alert>}
            {visibleError && <Alert sx={{ mt: 0, mb: 1 }} severity="error">{visibleError}</Alert>}
            {visibleMessage && !loading && !error && (
                <Alert sx={{ mt: 0, mb: 1 }} severity={visibleMessage.includes('sucesso') ? 'success' : 'info'}>{visibleMessage}</Alert>
            )}
            {filteredUsers.length === 0 && !visibleMessage && !loading && !error && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="info">Nenhum usuário encontrado para essa Entidade</Alert>
            )}
            {error && !loading && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="error">{error}</Alert>
            )}
            <Title Title={"Gerenciamento de Usuários"} />
            <AddUsers />
            {filteredUsers.length > 0 && (
                <>
                    <Title Title={'Usuários'} />
                    <Paper elevation={3} sx={{ padding: 2 }} >
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ background: '#101F33' }}>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Usuário
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Entidades
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        CNPJ
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Perfil
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                                        Ações
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow sx={{ background: '#FFF' }} key={user.id}>
                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                            <Box>{user.email}</Box>
                                        </TableCell>
                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                            <Box>{user.hotel?.registered_name || 'N/A'}</Box>
                                        </TableCell>
                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                            <Box>{user.hotel?.cnpj || 'N/A'}</Box>
                                        </TableCell>
                                        <TableCell sx={{ justifyContent: 'space-around', fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', ml: 2, textAlign: 'center' }}>
                                            <Box>{user.role.access_level}</Box>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                            <Tooltip title="Editar Usuário">
                                                <IconButton>
                                                    <BorderColorIcon style={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Deletar Usuário">
                                                <IconButton onClick={() => handleDeleteDepartment(department.id)}>
                                                    <DeleteForeverIcon style={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
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