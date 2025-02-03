
import React, { useState } from 'react'
import { Box, Button, Grid, Paper, Typography, TextField } from '@mui/material'



export default function Comodities() {

    const [comodities, setComodities] = useState([{ id: 1, name: 'Serviço Padrão', startTime: '08:00', endTime: '18:00', isEditing: true }])


    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                <TextField
                                    name="text"
                                    type="text"
                                    label="Ex.: Café da manhã"
                                    value=""
                                    variant="outlined"
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
                                    defaultValue="00:00"
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

                                <Typography sx={{ mr: 1 }}>até</Typography>

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
                            </Box>


                            <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                                Adicionar
                            </Button>

                        </Box>
                    </Paper>

                </Grid>
            </Grid>

        </React.Fragment>

    )
}