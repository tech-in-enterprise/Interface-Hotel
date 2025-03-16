import React, { useState, } from 'react'
import { Button, TextField, Grid, Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../../redux/slice/admin/users'


export default function AddUsers() {

    const dispatch = useDispatch()
    const { roles } = useSelector((state) => state.roles)
    const { hotelRegister } = useSelector((state) => state.entityHotel)
    const selectedHotelId = useSelector((state) => state.auth.hotel)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: selectedHotelId ? 2 : 1,
        hotel: selectedHotelId || null,
    })

    const [errors, setErrors] = useState({})

    const validateFields = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Nome do usuário é obrigatório.'
        if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório.'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido.'
        if (!formData.password) newErrors.password = 'Senha é obrigatória.'
        else if (formData.password.length < 8) newErrors.password = 'A senha deve ter pelo menos 8 caracteres.'
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirmação de senha é obrigatória.'
        else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'As senhas não correspondem.'
        if (!formData.role) newErrors.role = 'Nível de acesso é obrigatório.'
        if (formData.role === 2 && !formData.hotel) newErrors.hotel = 'Hotel é obrigatório para Gerentes.'

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    const handleSubmit = () => {
        if (validateFields()) {
            const payload = {
                user: {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                },
                role_id: formData.role,
                hotel_id: formData.hotel,
            }
            dispatch(createUser(payload))
            setFormData({ name: "", email: "", password: "", confirmPassword: "" })

        } else {
            console.log('validação falhou')
        }
    }

    const [selectedRole, setSelectedRole] = useState('')
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value)
        setErrors({ ...errors, role: '' })
    }

    const [selectedHotel, setSelectedHotel] = useState(selectedHotelId || "")
    const handleHotelChange = (event) => {
        setSelectedHotel(event.target.value)
        setFormData({ ...formData, hotel: event.target.value })
        setErrors({ ...errors, hotel: '' })
    }
    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container spacing={2}>

                        <Grid item xs={3}>
                            <TextField name='name' label="Nome do usuário" required fullWidth variant="outlined"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                InputProps={{
                                    style: { height: '40px', padding: '0', fontSize: '0.9rem', },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '0.9rem', lineHeight: '15px', paddingRight: 2 },
                                }}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField name='email' label="E-mail" required fullWidth variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="off"
                                error={!!errors.email}
                                helperText={errors.email}
                                InputProps={{
                                    style: { height: '40px', padding: '0', fontSize: '0.9rem', },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '0.9rem', lineHeight: '15px', paddingRight: 2 },
                                }}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField name='password' label="Senha" type="password" required fullWidth variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="off"  
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    style: { height: '40px', padding: '0', fontSize: '0.9rem', },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '0.9rem', lineHeight: '15px', paddingRight: 2 },
                                }}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField name='confirmPassword' label="Confirmar senha" type="password" required fullWidth variant="outlined"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                InputProps={{
                                    style: { height: '40px', padding: '0', fontSize: '0.9rem', },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '0.9rem', lineHeight: '15px', paddingRight: 2 },
                                }}
                            />
                        </Grid>


                        {selectedHotelId ? (
                            <>
                                <Grid item xs={6}>
                                    <FormControl fullWidth error={!!errors.role}>
                                        <InputLabel sx={{ fontSize: '0.9rem', lineHeight: '1rem', paddingRight: 2 }} id="select-label">
                                            Nível de acesso
                                        </InputLabel>
                                        <Select
                                            name="role"
                                            labelId="select-label"
                                            id="select-role"
                                            label="Nível de acesso"
                                            required
                                            value={formData.role || 2}
                                            onChange={handleRoleChange}
                                            sx={{ height: '40px', fontSize: '0.9rem' }}
                                        >
                                            {roles
                                                .filter((role) => role.id === 2)
                                                .map((role) => (
                                                    <MenuItem key={role.id} value={role.id}>
                                                        {`${role.id} - ${role.access_level}: ${role.description_of_access_level}`}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontSize: '0.9rem', lineHeight: '1rem', paddingRight: 2 }} id="select-hotel-label">
                                            Hotel
                                        </InputLabel>
                                        <Select
                                            name="hotel"
                                            labelId="select-hotel-label"
                                            id="select-hotel"
                                            label="Hotel"
                                            required
                                            value={formData.hotel || selectedHotelId}
                                            onChange={handleHotelChange}
                                            sx={{ height: '40px', fontSize: '0.9rem' }}
                                        >
                                            {hotelRegister
                                                .filter((hotel) => String(hotel.id) === String(selectedHotelId)) 
                                                .map((filteredHotel) => (
                                                    <MenuItem key={filteredHotel.id} value={filteredHotel.id}>
                                                        {filteredHotel.hotel_name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={6}>
                                    <FormControl fullWidth error={!!errors.role}>
                                        <InputLabel sx={{ fontSize: '0.9rem', lineHeight: '1rem', paddingRight: 2 }} id="select-label">
                                            Nível de acesso
                                        </InputLabel>
                                        <Select
                                            name="role"
                                            labelId="select-label"
                                            id="select"
                                            label="Nível de acesso"
                                            required
                                            value={formData.role || 1}
                                            onChange={handleRoleChange}
                                            sx={{ height: '40px' }}
                                        >
                                            {roles
                                                .filter((role) => role.id === 1)
                                                .map((role) => (
                                                    <MenuItem key={role.id} value={role.id}>
                                                        {`${role.id} - ${role.access_level}: ${role.description_of_access_level}`}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>


                            </>
                        )}
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 1 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                        Salvar
                    </Button>
                </Box>
            </Paper>
        </React.Fragment>
    )
}