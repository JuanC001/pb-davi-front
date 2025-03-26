import { Box, Grid2, Paper } from '@mui/material'
import React, { useState } from 'react'

import { RegisterForm } from '../components/Auth/RegisterForm'
import { LoginForm } from '../components/Auth/LoginForm'

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