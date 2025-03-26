import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import Swal from "sweetalert2"
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material"

export const LoginForm = ({ onRegister }) => {

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

