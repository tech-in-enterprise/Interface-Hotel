import React, { useState } from 'react'
import { Button, TextField, Avatar, Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { createDepartment, } from '../../../redux/slice/managment/departments'
import LocationCityIcon from '@mui/icons-material/LocationCity'





export default function AddDepartment() {
    const dispatch = useDispatch()
    const selectedHotelId = useSelector((state) => state.auth.hotel)
    const [newDepartment, setNewDepartment] = useState('')


    // Criar departamento
    const handleAddDepartment = () => {
        if (newDepartment.trim()) {
            dispatch(createDepartment({ name: newDepartment.trim(), hotel_id: selectedHotelId }))
            setNewDepartment('')
        }
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems='flex-start'>
                <Grid item xs={2}>
                    <Avatar sx={{ width: '100%', height: 100, borderRadius: 3, border: '2px solid #ccc' }}>
                        <LocationCityIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        variant="outlined"
                        size="medium"
                        fullWidth 
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        placeholder="Criar novo departamento"
                        sx={{ mt: 1 }}
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
                </Grid>

                <Grid item xs={2}>
                    <Button size='small' variant="contained" fullWidth component="label" sx={{ bottom: 0 }} style={{ fontSize: 10 }}>
                        Upload Icon
                        <input hidden accept="image/*" type="file" />
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={1} justifyContent="flex-end">
                        <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }} onClick={handleAddDepartment}>
                            Adicionar
                        </Button>
                        <Button variant="contained" color="error" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    )
}
