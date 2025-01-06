import React, { useState } from 'react'
import { TextField, Grid, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createHotel } from '../../../redux/slice/admin/register-hotel'



export default function AddEntities({ handleSearch }) {
    const [formData, setFormData] = useState({
        hotel_name: '',
        registered_name: '',
        phone_number: '',
        hotel_email: '',
        cnpj: '',
        street_address: '',
        number_address: '',
        city: '',
        state: '',
        cep: '',
    })

    // Lista de campos com tamanhos
    const fields = [
        { name: 'hotel_name', label: 'Nome do Hotel', xs: 6 },
        { name: 'registered_name', label: 'Nome Fantasia', xs: 3 },
        { name: 'cnpj', label: 'CNPJ', xs: 3 },
        { name: 'phone_number', label: 'Telefone', xs: 3 },
        { name: 'hotel_email', label: 'E-mail', xs: 3 },
        { name: 'street_address', label: 'Rua', xs: 3 },
        { name: 'number_address', label: 'Número', xs: 3 },
        { name: 'city', label: 'Cidade', xs: 3 },
        { name: 'state', label: 'Estado', xs: 3 },
        { name: 'cep', label: 'CEP', xs: 3 },
    ]

    // Atualiza o estado do formulário
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(createHotel(formData))
        console.log('enviado com sucesso')
    }
    return (
        <Box sx={{ display: 'flex', flexDirection:'column' }}>
            <Grid container spacing={2}>
                {fields.map((field) => (
                    <Grid item xs={field.xs} key={field.name}>
                        <TextField
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                style: { height: '40px', padding: '0' },
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: '0.9rem',
                                    lineHeight: '15px',
                                    paddingRight: 2,
                                },
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="success" onClick={handleSearch} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }}>
                    Voltar
                </Button>

                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}
