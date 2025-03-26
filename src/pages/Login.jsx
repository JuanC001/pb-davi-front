import { Box, Button, Divider, FormControl, Grid2, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { useAuth } from '../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
export const Login = () => {

    const [isRegister, setIsRegister] = useState(false)
    return (
        <Box sx={{
            width: '100%', height: '100vh',
            alignItems: 'center', backgroundImage: 'url(https://i.gifer.com/OvY.gif)',
            backdropFilter: 'blur(10px)', backgroundSize: 'cover'
        }}>

            <Grid2 container height={'100vh'}>
                <Grid2 item size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ width: '100%', height: '100%', p: 2, borderRadius: 0 }}>

                        {isRegister ? <RegisterForm onLogin={() => setIsRegister(false)} /> : <LoginForm onRegister={() => setIsRegister(true)} />}

                    </Paper>
                </Grid2>

                <Grid2 item size={{ xs: 'none', md: 8 }} sx={{ backdropFilter: 'blur(10px)' }}></Grid2>

            </Grid2>

        </Box>
    )
}

const LoginForm = ({ onRegister }) => {

    const { login } = useAuth()
    const { register, getValues } = useForm()
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { email, password } = getValues()
            const res = await login(email, password)
            console.log(res)
            if (!res) return Swal.fire('Error', 'Usuario o contraseña incorrecta', 'error')
            navigate('/')
        } catch (error) {
            if (error.response.data.message === 'Invalid email or password') {
                return Swal.fire('Error', 'Usuario o contraseña incorrecta', 'error')
            }
            console.error(error)
            Swal.fire('Error', 'Ha ocurrido un error', 'error')
        }

    }

    return <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h4' align='center'>Iniciar Sesión</Typography>
        <Divider />
        <Stack spacing={2} component='form' onSubmit={handleLogin}>
            <TextField label='Email' {...register('email')} type='email' required variant='outlined' />
            <TextField label='Contraseña' {...register('password')} type='password' required variant='outlined' />
            <Button variant='contained' color='primary' type='submit'>Iniciar Sesión</Button>
            <Typography align='center'>or</Typography>
            <Button variant='contained' color='secondary' onClick={onRegister}>Register</Button>
        </Stack>
    </Box>
}

const RegisterForm = ({ onLogin }) => {

    const { register: registerUser } = useAuth()
    const { register, getValues } = useForm()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {

            const { email, password, password2, name, surname, document } = getValues()

            if (password !== password2) {
                return Swal.fire('Error', 'Las contraseñas no coinciden', 'error')
            }

            const res = await registerUser(email, password, name, surname, document)
            console.log(res)
            Swal.fire('Success', 'Usuario creado correctamente', 'success')
            onLogin()
        } catch (error) {
            console.error(error)
            if (error.response.data.message === 'Email already exists') {
                return Swal.fire('Error', 'El correo ya está registrado', 'error')
            }
            Swal.fire('Error', 'Ha ocurrido un error', 'error')
        }

    }

    return <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h4' align='center'>Registrarme</Typography>
        <Divider />
        <Stack spacing={2} component='form' onSubmit={handleRegister}>
            <TextField label='Correo' {...register('email')} type='email' variant='outlined' required />
            <TextField label='Contraseña' {...register('password')} type='password' variant='outlined' required />
            <TextField label='Contraseña' {...register('password2')} type='password' variant='outlined' required />
            <TextField label='Nombre' {...register('name')} variant='outlined' required />
            <TextField label='Apellido' {...register('surname')} variant='outlined' />
            <Stack direction='row' spacing={2}>
                <FormControl variant='outlined'>
                    <Select defaultValue={'CC'} disabled>
                        <MenuItem value='DNI'>DNI</MenuItem>
                        <MenuItem value='CC'>CC</MenuItem>
                    </Select>
                </FormControl>
                <TextField label='Document' {...register('document')} variant='outlined' required />
            </Stack>
            <Button variant='contained' type='submit' color='primary'>Registrarme</Button>
            <Typography align='center'>or</Typography>
            <Button variant='contained' color='secondary' onClick={onLogin}>Login</Button>
        </Stack>
    </Box>
}
