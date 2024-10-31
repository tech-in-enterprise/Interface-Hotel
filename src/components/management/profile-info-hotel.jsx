import React, { useReducer, useEffect } from 'react'
import { Box, TextField, Avatar, Button, Grid, Paper } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelById } from '../../redux/slice/register/registerSlice'
import LocationCityIcon from '@mui/icons-material/LocationCity'

//inputs de informações de redes sociais e wifi do hotel

const actions = {
    toggleEdit: 'toggle-edit',
    updateValue: 'update-value'
}

const reducer = (state, action) => {
    switch (action.type) {
        case actions.toggleEdit:
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    editable: !state[action.field].editable
                }
            }
        case actions.updateValue:
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    value: action.value
                }
            }
        default:
            return state
    }
}

function EditableField({ label, field, state, dispatch }) {
    const { value, editable } = state[field]

    return (
        <Box sx={{ position: 'relative' }}>
            <TextField
                label={label}
                fullWidth
                variant="standard"
                value={value}
                onChange={(e) =>
                    dispatch({ type: actions.updateValue, field, value: e.target.value })
                }
                disabled={!editable}
                InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <Tooltip title={editable ? "Salvar" : "Editar"} sx={{ position: 'absolute', top: '30%', right: 0 }}>
                <IconButton onClick={() => dispatch({ type: actions.toggleEdit, field })}>
                    {editable && value ? <IoIosCheckmarkCircleOutline style={{ fontSize: 18 }} color='#55a630' /> : !editable &&   <BorderColorIcon style={{ fontSize: 18  }}  />}
                </IconButton>
            </Tooltip>
        </Box>
    )
}


export default function ProfileHotel() {

    //pega as informações dos dados (nome, cnpj, email, etc..) e retorna na tela através de hotelRegister
    const dispatch = useDispatch()
    const { hotelRegister } = useSelector((state) => state.hotel)

    useEffect(() => {
        dispatch(getHotelById())
    }, [dispatch])

    const initialState = {
        facebook: { value: '', editable: true },
        instagram: { value: '', editable: true },
        wifiNetwork: { value: '', editable: true },
        wifiPassword: { value: '', editable: true }
    }

    const [state, localDispatch] = useReducer(reducer, initialState)


    return (
        <React.Fragment>
            <Table sx={{ width: 'auto' }}>
                <TableBody>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF', width: '75%' }}>
                            Gerenciamento de Perfil
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Paper elevation={3} sx={{ display: 'flex', padding: 2, mt: 2, mb: 2 }}>
                {/* Foto do hotel */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <Avatar alt="Hotel Picture" sx={{ width: 300, height: 200, borderRadius: 4, border: '2px solid #ccc' }}>
                        <LocationCityIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Button variant="contained" fullWidth component="label" sx={{ position: 'absolute', bottom: 0 }}>
                        Upload Photo
                        <input hidden accept="image/*" type="file" />
                    </Button>
                </Box>

                {/* Dados do hotel */}
                {hotelRegister.map((hotelData) => (
                    <Box sx={{ flexGrow: 1, ml: 3 }}>
                        <Grid container spacing={2}>
                            {/* Nome do hotel e CNPJ */}
                            <Grid item xs={12} sm={6}>
                                <TextField disabled label="Nome do Hotel" fullWidth variant="standard" value={hotelData.name} sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: 14 }, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField disabled label="CNPJ" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.cnpj} InputLabelProps={{ style: { fontSize: 14 }, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>

                            {/* Endereço*/}
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Rua" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.street_address} InputLabelProps={{ style: { fontSize: 14 }, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Número" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.number_address} InputLabelProps={{ style: { fontSize: 14 }, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Cidade" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.city} InputLabelProps={{ style: { fontSize: 14 }, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Estado" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.state} InputLabelProps={{ style: { fontSize: 14 }, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="CEP" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.cep} InputLabelProps={{ style: { fontSize: 14 }, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>

                            {/*Telefone*/}
                            <Grid item xs={12} sm={3}>
                                <TextField disabled label="Telefone" fullWidth variant="standard" sx={{ m: 1 }} value={hotelData.phone_number} InputLabelProps={{ style: { fontSize: 14 }, shrink: true }} InputProps={{ readOnly: true }} />
                            </Grid>

                        </Grid>
                    </Box>
                ))}
            </Paper>


            <Table sx={{ width: 'auto', mb: 2, mt: 2 }}>
                <TableBody>
                    <TableRow sx={{ background: '#101F33' }}>
                        <TableCell sx={{ fontSize: 12, fontWeight: 'bold', border: '1px solid #ccc', padding: '8px', textAlign: 'center', color: '#FFF' }}>
                            Adicionar Comodidades
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Redes Sociais*/}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Table sx={{ width: 'auto', mb: 2 }}>
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ fontSize: 12, fontWeight: 'bold', padding: '8px', textAlign: 'center' }}>
                                    Redes Sociais
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <EditableField fullWidth label="Facebook" field="facebook" state={state} dispatch={localDispatch} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <EditableField label="Instagram" field="instagram" state={state} dispatch={localDispatch} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/* Dados do wi-fi */}
                <Grid item xs={12} sm={6}>
                    <Table sx={{ width: 'auto', mb: 2 }}>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 12, fontWeight: 'bold', padding: '8px', textAlign: 'center' }}>
                                    Wi-fi
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <EditableField label="Rede" field="wifiNetwork" state={state} dispatch={localDispatch} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <EditableField label="Senha" field="wifiPassword" state={state} dispatch={localDispatch} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            {/* Horários do Hotel */}
            <Table sx={{ width: 'auto', mb: 2, mt: 2 }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ fontSize: 12, fontWeight: 'bold', padding: '8px', textAlign: 'center' }}>
                            Horários
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Café da manhã" fullWidth variant="standard" InputLabelProps={{ style: { fontSize: 14 } }} />
                    </Grid>
                </Grid>
            </Paper>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 2 }} >
                <Button variant="contained" color="primary" sx={{ fontSize: 12, padding: '6px 12px', textTransform: 'none' }}>
                    Salvar
                </Button>
            </Box>
        </React.Fragment>
    )
}
