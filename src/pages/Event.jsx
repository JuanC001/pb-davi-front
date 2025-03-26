import React, { useContext, useEffect, useState } from 'react'
import { useEvents } from '../hooks/useEvents'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, CircularProgress, Divider, Grid2, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { useCurrency } from '../hooks/useCurrency'

import PatronDesign from '../assets/diseno-patron.png'
import { UserContext } from '../context/UserContext'
import { useUserEvent } from '../hooks/useUserEvent'
import Swal from 'sweetalert2'

export const Event = () => {
    const { user } = useContext(UserContext)

    const paramas = useParams()
    const [event, setEvent] = useState(null)
    const { getEvent } = useEvents(false)
    const { formatter } = useCurrency()
    const [toolTipText, setToolTipText] = useState('')
    const [comprando, setComprando] = useState(false)
    const [disableBuy, setDisableBuy] = useState(false)

    const { createUserEvent } = useUserEvent(false)
    const navigate = useNavigate()
    const handleGetEvent = async () => {
        try {
            const data = await getEvent(paramas.id)
            setEvent(data)
        } catch (error) {
            console.error(error)
            navigate('/not-found')
        }
    }

    const handleToolTip = () => {
        if (!event) return
        if (!user) {
            setDisableBuy(true)
            return setToolTipText('Debes iniciar sesión para comprar un boleto')
        }
        if (user.id === event.eventOrganizer.ownerId) {
            setDisableBuy(true)
            return setToolTipText('No puedes comprar un boleto para tu propio evento')
        }

        if (event.remainingTickets === 0) {
            setDisableBuy(true)
            return setToolTipText('No hay boletos disponibles')
        }
        const isDisable = event.UserEvent.find(e => e.userId === user.id)
        if (isDisable) {
            setDisableBuy(true)
            return setToolTipText('Ya tienes un boleto para este evento')
        }

        setToolTipText('Comprar boleto')
    }

    const handleBuyTicket = async () => {
        try {
            setComprando(true)
            const res = await createUserEvent(user.id, event.id)
            if (res) {
                Swal.fire('Éxito', 'Boleto comprado con éxito', 'success')
                handleGetEvent()
            }
            setComprando(false)

        } catch (error) {
            console.error(error.response.data.message)
            if (error.response.data.message === "User already registered to event") {

                Swal.fire('Error', 'Ya tienes un boleto para este evento', 'error')
                setComprando(false)
                return

            }
            Swal.fire('Error', 'Ha ocurrido un error', 'error')
            setComprando(false)

        }

    }

    useEffect(() => {
        handleGetEvent()
    }, [])

    useEffect(() => {
        handleToolTip()
    }, [event])

    if (!event) return <CircularProgress />

    return (
        <Box
            sx={{
                backgroundImage: `url(${PatronDesign})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'repeat',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Box sx={{
                backdropFilter: 'blur(10px)',
                width: '100%',
                height: '100%',
            }}>
                <Box
                    maxWidth={'1300px'} minHeight={'100vh'} mx={'auto'} p={5} component={Paper} borderRadius={0}>

                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, }}>
                            <Box>
                                <Box component={'img'} maxHeight={'40vh'} width={'100%'} sx={{
                                    objectFit: 'cover',
                                }} src={event?.image} alt={event?.name + 'img'} />
                            </Box>
                        </Grid2>
                        <Grid2 item size={{ xs: 12, md: 7 }}>

                            <Stack spacing={2}>

                                <Typography variant={'h2'} sx={{ fontSize: '3.5rem' }}>
                                    {event?.name}
                                </Typography>

                                <Typography variant={'h4'} sx={{ fontSize: '2.5rem' }}>
                                    {event?.location}
                                </Typography>

                                <Divider />


                            </Stack>
                            <Typography variant={'h5'}>
                                del
                                <Box component={'span'} color={'secondary.main'}>
                                    {' ' + event.startDate.toString().split('T')[0]}
                                </Box>
                                al
                                <Box component={'span'} color={'secondary.main'}>
                                    {' ' + event.startDate.split('T')[1].split('.')[0]}
                                </Box>

                            </Typography>
                            <Typography variant={'body1'}>
                                {event?.description}
                            </Typography>
                        </Grid2>

                        <Grid2 item size={{ xs: 12, md: 5 }}>
                            <Paper sx={{ minHeight: '50vh', width: '100%', p: 2, bgcolor: 'primary.light' }}>

                                <Grid2 container spacing={2}>
                                    <Grid2 size={{ xs: 12, md: 4 }} color={'white'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                        <Box>
                                            <Typography variant={'h3'}>
                                                {event.remainingTickets}
                                            </Typography>
                                            <Typography variant={'body1'} textAlign={'center'}>
                                                Cupos
                                            </Typography>
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 8 }}>
                                        <Tooltip
                                            title={toolTipText} >
                                            <Button
                                                onClick={handleBuyTicket}
                                                disabled={disableBuy}
                                                sx={{
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }} variant={'contained'} color={'secondary'} fullWidth>
                                                {comprando ? <CircularProgress /> : <>
                                                    <Box>
                                                        Comprar Ahora por
                                                    </Box>
                                                    <Box>
                                                        {formatter(event.price)}
                                                    </Box>
                                                </>}
                                            </Button>
                                            <Typography variant={'caption'}>
                                                {''}
                                            </Typography>
                                        </Tooltip>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12 }}>

                                        <List sx={{ color: 'white' }}>
                                            <Typography variant={'h5'}>
                                                Recomendaciones
                                            </Typography>
                                            <Divider />
                                            <Typography variant={'body2'}>
                                                A continuación te presentamos una lista de recomendaciones para que disfrutes al máximo tu evento.
                                            </Typography>

                                            <ListItem>
                                                <ListItemIcon>
                                                    ✅
                                                </ListItemIcon>
                                                <ListItemText>
                                                    Revisa tu entrada: Asegúrate de tener tu boleto o confirmación de registro en digital o impreso.
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemIcon>
                                                    ✅
                                                </ListItemIcon>
                                                <ListItemText>
                                                    Consulta la ubicación y horarios: Verifica la dirección y el tiempo estimado de llegada para evitar retrasos.
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemIcon>
                                                    ✅
                                                </ListItemIcon>
                                                <ListItemText>
                                                    Lee las reglas del evento: Algunos eventos tienen restricciones sobre objetos permitidos, vestimenta o normas de comportamiento.
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemIcon>
                                                    ✅
                                                </ListItemIcon>
                                                <ListItemText>
                                                    ¡Disfruta!: ConéctaTE con personas nuevas, aprende algo nuevo y diviértete.
                                                </ListItemText>
                                            </ListItem>

                                        </List>

                                    </Grid2>
                                </Grid2>

                            </Paper>
                        </Grid2>

                    </Grid2>


                </Box>
            </Box>
        </Box>
    )
}
