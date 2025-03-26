import { Box, Button, Divider, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { useAuth } from "../../hooks/useAuth"

export const RegisterForm = ({ onLogin }) => {

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
