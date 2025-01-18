import React, { useState } from "react"
import { Grid, TextField, Box, Button, Typography, Alert } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../../redux/slice/auth/loginSlice'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'




export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.auth)

    // Validar campos de email e senha
    const frontendValidation = () => {

        let isValid = true

        if (email.trim() === '') {
            setEmailError('Email é obrigatório')
            isValid = false
        } else if (!emailRegex.test(email)) {
            setEmailError('Email inválido')
            isValid = false
        } else {
            setEmailError('')
        }

        if (password.trim() === '') {
            setPasswordError('Senha é obrigatória')
            isValid = false
        } else if (password.length < 6) {
            setPasswordError('A senha deve ter pelo menos 6 caracteres')
            isValid = false
        } else {
            setPasswordError('')
        }

        return isValid
    }

    async function handleSubmit(event) {
        event.preventDefault()

        
        if (!frontendValidation()) {
            return
        }
        dispatch(loginUser.pending())
        // Se chegou aqui, os campos foram preenchidos corretamente
        setTimeout(async () => {
            dispatch(loginUser({ email, password }))
                .unwrap()
                .then(() => {
                    navigate('/')
                })
                .catch(() => { })
        }, 1500)
    }

    return (
        <React.Fragment>

            <Grid container sx={{ height: '100vh', margin: 0, padding: 0 }}>
                <Grid item xs={6} sx={{ background: '#101F33', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Box>
                        <Typography sx={{ color: 'white', margin: 0, padding: 0 }}>Tech-in</Typography>
                    </Box>
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Box sx={{ position: 'absolute', bottom: 15 }} >
                        {error && (
                            <Alert sx={{ mt: 0, mb: 1 }} severity="error">{error}</Alert>
                        )}
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '80%', maxWidth: 400, position: 'relative' }}>
                        {/* Nome do hotel e CNPJ */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    variant="standard"
                                    required
                                    fullWidth
                                    id="email"
                                    label='Email'
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (emailError) setEmailError('')
                                        if (error) dispatch(clearError())
                                    }}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    variant="standard"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if (passwordError) setPasswordError('')
                                        if (error) dispatch(clearError())
                                    }}
                                    error={!!passwordError}
                                    helperText={passwordError}
                                />
                            </Grid>
                        </Grid>


                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', mt: 3 }}>
                            {loading ? (
                                <Button type="submit" variant="contained" disabled={!(email && password)} color="primary" sx={{ fontSize: '0.8rem' }}>
                                    Entrando
                                    <CircularProgress size={20} sx={{ ml: 2, color:'#FFFFFF' }} />
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained" disabled={!(email && password)} color="primary" sx={{ fontSize: '0.8rem' }}>
                                    Entrar
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
