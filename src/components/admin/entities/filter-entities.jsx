import React from 'react'
import { Button, TextField, Grid, Box } from '@mui/material'



export default function FilterEntities({ handleSearch, handleAddEntity }) {
    return (
        <Grid item xs={12} sx={{ display: 'flex', flexDirection:'column', justifyContent: 'space-around', width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={3} style={{ maxHeight: '100px' }}>
                    <TextField
                        label="Nome"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            style: { height: '40px', padding: '0' },
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: '0.9rem',
                                lineHeight: '15px',
                                padding: 1
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="CNPJ"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            style: { height: '40px', padding: '0' },
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: '0.9rem',
                                lineHeight: '15px',
                                padding: 1
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Ativo"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            style: { height: '40px', padding: '0' },
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: '0.9rem',
                                lineHeight: '15px',
                                padding: 2
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Estado"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            style: { height: '40px', padding: '0' },
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: '0.9rem',
                                lineHeight: '15px',
                                paddingRight: 2
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="success" onClick={handleSearch} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }}>
                    Pesquisar
                </Button>
                <Button variant="contained" color="primary" onClick={handleAddEntity} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                    Criar Entidade
                </Button>
            </Box>
        </Grid>

    )
}
