
import React, { useState } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Title from '../../general-components/title-from-pages'



export default function Comodities() {

    const [comodities, setComodities] = useState([])

    const addNewComoditie = () => {
        setComodities([...comodities, { name: '', startTime: '', endTime: '' }])
    }

    return (
        <React.Fragment>
            {/* Horários do Hotel */}
            <Title Title={'Horários do Hotel'} />


            <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Paper elevation={3} sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold", mr: 1 }}>
                                    service.name
                                </Typography>
                                <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                                    service.startTimeàs 
                                </Typography>
                            </Box>
                            <Tooltip title="Editar Departamento">
                                <IconButton>
                                    <BorderColorIcon style={{ fontSize: '1rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {comodities.map((service, index) => (
                        <Grid item xs={12} sm={3} key={index}>
                            <Paper elevation={3} sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold", mr: 1 }}>
                                        {service.name}:
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                                        {service.startTime} às {service.endTime}
                                    </Typography>
                                </Box>
                                <Tooltip title="Editar Departamento">
                                    <IconButton>
                                        <BorderColorIcon style={{ fontSize: '1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 2 }} >
                    <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                        Salvar
                    </Button>
                </Box>
            </Paper>

            {/* Outros serviços */}
            <Title Title={'Outros Serviços'} />
            <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    {comodities.map((service, index) => (
                        <Grid item xs={12} sm={3} key={index}>
                            <Paper elevation={3} sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold", mr: 1 }}>
                                        {service.name}:
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                                        {service.startTime} às {service.endTime}
                                    </Typography>
                                </Box>
                                <Tooltip title="Editar Departamento">
                                    <IconButton>
                                        <BorderColorIcon style={{ fontSize: '1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}
                        onClick={addNewComoditie}
                    >
                        Adicionar Horário
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 2 }} >
                    <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                        Salvar
                    </Button>
                </Box>
            </Paper>

        </React.Fragment>

    )
}