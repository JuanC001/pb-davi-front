import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid2, IconButton, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useEvents } from '../hooks/useEvents'
import { useEventsOrganizer } from '../hooks/useEventOrganizer'
import { useCurrency } from '../hooks/useCurrency'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ModalEvent } from '../components/ModalEvent'
import Swal from 'sweetalert2'

export const MyEvents = () => {

    const { user } = useContext(UserContext)

    const { eventsOrganizer, getEventOrganizerByOwner } = useEventsOrganizer()

    useEffect(() => {
        if (user) {
            getEventOrganizerByOwner(user.id)
        }
    }, [user])

    return (
        <Grid2 container>
            <Grid2 item size={{ xs: 12 }} sx={{ p: 2 }}>
                <Typography variant='h3'>Mis eventos</Typography>
                <Typography variant='body1'>Aquí podrás ver los eventos que has reservado</Typography>
            </Grid2>

            <Grid2 item size={{ xs: 12 }} sx={{ p: 2 }}>

                {eventsOrganizer.length > 0 ? <EventOrganizerComponent eventOrganizer={eventsOrganizer[0]} events={eventsOrganizer[0].Events} /> :
                    <Stack>

                        <Typography variant='h4'>Parece que no tienes una organización creada...</Typography>
                        <Typography variant='caption'>Puedes crear una organización para poder organizar eventos y tener un mejor control de los mismos</Typography>
                        <Button variant='contained' color='primary'>Crear organización</Button>

                    </Stack>}

            </Grid2>
        </Grid2>
    )
}

const EventOrganizerComponent = ({ eventOrganizer, events }) => {


    return (
        <>
            <Typography variant='h4'>Mis eventos organizados</Typography>
            <Typography variant='body1'>Aquí podrás ver los eventos que has organizado por parte de tú organización</Typography>
            <Typography variant='h6'>Nombre de la organización: {eventOrganizer.companyName}</Typography>
            <Stack spacing={2} sx={{ flexWrap: 'wrap' }} direction='row' useFlexGap>
                {events.map((event, index) => <EventCardOrganizer event={event} key={index} />)}
            </Stack>
        </>
    )
}

const EventCardOrganizer = ({ event }) => {
    const { formatter } = useCurrency()
    const { updateEvent, deleteEvent } = useEvents()

    const [editMode, setEditMode] = useState(false)

    const handleEdit = async (ev) => {
        console.log(ev)
        const payload = {
            name: ev.name,
            description: ev.description,
            price: Number(ev.price),
            location: ev.location,
            startDate: ev.startDate,
            endDate: ev.endDate,
            startTime: ev.startDate.split('T')[1],
            endTime: ev.endDate.split('T')[1],
            eventOrganizerId: event.eventOrganizerId,
            capacity: Number(ev.capacity),
            remainingTickets: Number(ev.remainingTickets),
            imageUrl: ev.imageUrl,
        }

        try {
            const res = await updateEvent(event.id, payload)
            console.log(res)
            Swal.fire('Evento actualizado', 'El evento ha sido actualizado correctamente', 'success')
        } catch (error) {

            console.error(error)
            Swal.fire('Error', 'Ha ocurrido un error', 'error')

        }


    }
    const handleDelete = async () => {
        try {
            await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await deleteEvent(event.id)
                    Swal.fire(
                        'Eliminado!',
                        'El evento ha sido eliminado.',
                        'success'
                    )
                }
            })
        } catch (error) {
            console.error(error)
            Swal.fire('Error', 'Ha ocurrido un error', 'error')
        }
    }

    return (
        <>
            <Card sx={{ width: 300 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/placeholder.webp"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {event.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {event.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {formatter(event.price)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {event.location}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Quedan <strong>{event.remainingTickets}</strong> cupos
                    </Typography>
                </CardContent>
                <CardActions>

                    <IconButton color='secondary' aria-label="edit" onClick={() => setEditMode(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color='error' aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>

                </CardActions>
            </Card>
            {editMode && <ModalEvent event={event} open={editMode} onClose={() => setEditMode(false)} handleEdit={handleEdit} />}
        </>
    )
}
