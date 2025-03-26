import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid2, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useEvents } from '../hooks/useEvents'

import { useCurrency } from '../hooks/useCurrency';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { EventCard } from '../components/Events/EventCard';

export const Home = () => {

    const { user } = useContext(UserContext)

    const { events } = useEvents()
    const { formatter } = useCurrency()
    const navigate = useNavigate()

    return (
        <Box minHeight={'100vh'} width={'100%'} sx={{ overflow: 'hidden' }}>

            <Box display={'flex'} p={2} sx={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundImage: 'url(https://i.gifer.com/LxAb.gif)',
                backgroundSize: 'cover',
            }}>
                <Box>
                    <Typography variant={'h1'} sx={{
                        fontSize: {
                            xs: '60px',
                            sm: '50px',
                            md: '100px',
                        },
                        color: 'white',
                        fontWeight: 'bold'
                    }} align={'center'}>ConéctaTE</Typography>
                    <Typography variant={'h1'} align={'center'} sx={{
                        fontSize: '26px',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>Conectando personas con el mundo</Typography>
                </Box>
            </Box>

            <Box sx={{
                my: 2,
                px: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                maxWidth: '1500px',
                minHeight: '50vh',
            }}>
                <Grid2 container spacing={2} >
                    <Grid2 item size={{ xs: 12, md: 6 }}>
                        <Typography variant={'h2'} align={'center'} sx={{
                            flexGrow: 3,
                        }}>Conoce cual será tu próxima experiencia
                        </Typography>

                    </Grid2>
                    <Grid2 item size={{ xs: 12, md: 6 }}>
                        <Typography variant='body1' align={'left'} sx={{ flexGrow: 2 }}>
                            <strong>ConéctaTE</strong> es una plataforma para descubrir, organizar y participar en eventos. Facilita la conexión entre personas a través de conferencias, conciertos y reuniones. Con un diseño intuitivo, permite gestionar inscripciones y recibir actualizaciones en tiempo real, creando una experiencia interactiva y accesible para todos. 🚀
                        </Typography>
                    </Grid2>

                </Grid2>

            </Box>

            <Box sx={{
                maxWidth: '1500px',
                minHeight: '50vh',
                my: 2,
                px: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
            }}>
                <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} useFlexGap>
                    {
                        events.length > 0 && events.map((event, index) => (
                            <EventCard event={event} key={index} />
                        ))
                    }
                </Stack>
            </Box>

        </Box >
    )
}
