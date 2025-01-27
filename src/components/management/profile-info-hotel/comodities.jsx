
import React, { useState } from 'react'
import { Box, Button, Grid, Paper, Typography, TextField } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Title from '../../general-components/title-from-pages'
import DoneIcon from '@mui/icons-material/Done'


export default function Comodities() {

    const [comodities, setComodities] = useState([{ id: 1, name: 'Serviço Padrão', startTime: '08:00', endTime: '18:00', isEditing: true }])

    const handleEditTime = (id) => {
        setComodities(comodities.map(item =>
            item.id === id ? { ...item, isEditing: false } : item
        ))
    }

    const handleSaveTime = (id) => {
        setComodities(comodities.map(item =>
            item.id === id ? { ...item, isEditing: true } : item
        ))
    }

    const addNewComoditie = (id) => {
        const newId = comodities.length + 1
        setComodities([...comodities, { id: newId, name: 'Novo Serviço', startTime: '08:00', endTime: '18:00', isEditing: false }])
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    {comodities.map((service) => (
                        <Paper elevation={3} sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml:2 }}>
                            {service.isEditing ? (
                                <>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold", mr: 1 }}>
                                            {service.name}:
                                        </Typography>
                                    </Box>
                                    <form noValidate>
                                        <TextField
                                            id="time"
                                            type="time"
                                            defaultValue="00:00"
                                            disabled
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
                                    </form>
                                    <form noValidate>
                                        <TextField
                                            id="time"
                                            type="time"
                                            defaultValue="00:00"
                                            disabled
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
                                    </form>
                                    <Tooltip title="Editar serviço" onClick={() => handleEditTime(service.id)}>
                                        <IconButton>
                                            <BorderColorIcon style={{ fontSize: '1rem' }} />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold", mr: 1 }}>
                                            {service.name}:
                                        </Typography>
                                    </Box>
                                    <form noValidate>
                                        <TextField
                                            id="time"
                                            type="time"
                                            defaultValue="00:00"
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
                                    </form>
                                    <form noValidate>
                                        <TextField
                                            id="time"
                                            type="time"
                                            defaultValue="00:00"
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
                                    </form>
                                    <Tooltip title="Salvar serviço" onClick={() => handleSaveTime(service.id)}>
                                        <IconButton>
                                            <DoneIcon style={{ fontSize: '1rem' }} />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                        </Paper>
                    ))}
                </Grid>
            </Grid>

        </React.Fragment>

    )
}