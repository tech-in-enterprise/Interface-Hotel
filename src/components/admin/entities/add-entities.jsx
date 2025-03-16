import React, { useState } from 'react'
import { TextField, Grid, Button, Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createHotel } from '../../../redux/slice/admin/register-entity-hotel'

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
        cep: ''
    })

    const [errors, setErrors] = useState({})

    const fields = [
        { name: 'hotel_name', label: 'Nome do hotel', xs: 6, required: true },
        { name: 'registered_name', label: 'Nome fantasia', xs: 3, required: true },
        { name: 'cnpj', label: 'CNPJ', xs: 3, required: true },
        { name: 'phone_number', label: 'Telefone', xs: 3, required: true },
        { name: 'hotel_email', label: 'E-mail', xs: 3, required: true },
        { name: 'street_address', label: 'Rua', xs: 3, required: true },
        { name: 'number_address', label: 'Número', xs: 3, required: true },
        { name: 'city', label: 'Cidade', xs: 3, required: true },
        { name: 'state', label: 'Estado', xs: 3, required: true },
        { name: 'cep', label: 'CEP', xs: 3, required: true }
    ]

    const dispatch = useDispatch()

    const formatCnpj = (cnpj) => {
        return cnpj
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') // Formata o CNPJ
            .substring(0, 18) // Limita ao comprimento do formato do CNPJ
    }

    const formatCep = (cep) => {
        return cep
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3') // Formata o CEP
            .substring(0, 10) // Limita ao comprimento do formato do CEP
    }

    const formatPhoneNumber = (phone) => {
        return phone
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') // Formata o número de telefone
            .substring(0, 15) // Limita ao comprimento do formato do telefone
    }

    const validateFields = () => {
        const newErrors = {}
        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} é obrigatório`
            }
        })

        // Valida e-mail
        if (formData.hotel_email && !/\S+@\S+\.\S+/.test(formData.hotel_email)) {
            newErrors.hotel_email = 'E-mail inválido'
        }

        // Valida CNPJ
        if (formData.cnpj && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.cnpj)) {
            newErrors.cnpj = 'CNPJ deve estar no formato xx.xxx.xxx/xxxx-xx'
        }

        // Valida CEP
        if (formData.cep && !/^\d{2}\.\d{3}-\d{3}$/.test(formData.cep)) {
            newErrors.cep = 'CEP deve estar no formato xx.xxx-xxx'
        }

        // Valida Telefone
        if (formData.phone_number && !/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.phone_number)) {
            newErrors.phone_number = 'Telefone deve estar no formato (xx) xxxxx-xxxx'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateFields()) {
            dispatch(createHotel(formData))
        } else {
            console.error('Validação falhou', errors)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        let formattedValue = value

        // Formatar valores específicos
        if (name === 'cnpj') {
            formattedValue = formatCnpj(value)
        } else if (name === 'cep') {
            formattedValue = formatCep(value)
        } else if (name === 'phone_number') {
            formattedValue = formatPhoneNumber(value)
        }

        setFormData({
            ...formData,
            [name]: formattedValue
        })

        // Limpa o erro ao começar a digitar no campo
        setErrors({
            ...errors,
            [name]: ''
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                            error={!!errors[field.name]} // Define como erro se houver mensagem
                            helperText={errors[field.name]} // Exibe a mensagem de erro
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
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="success" onClick={handleSearch} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1}}>
                    Voltar
                </Button>

                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none'}}>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}