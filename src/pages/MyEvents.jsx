import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid2, IconButton, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useEvents } from '../hooks/useEvents'
import { useEventsOrganizer } from '../hooks/useEventOrganizer'
import { useCurrency } from '../hooks/useCurrency'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ModalEvent } from '../components/Organizer/ModalEvent'
import Swal from 'sweetalert2'
import { ModalOrganizer } from '../components/Organizer/ModalOrganizer'
import dayjs from 'dayjs'
import { useUserEvent } from '../hooks/useUserEvent'
import { EventCard } from '../components/Events/EventCard'

export const MyEvents = () => {

    const { user } = useContext(UserContext)
    const [createOrganizationModal, setCreateOrganizationModal] = useState(false)

    const { eventsOrganizer, getEventOrganizerByOwner } = useEventsOrganizer()
    const { userEvents, deleteUserEvent, getUserEvents } = useUserEvent(true, user.id)

    const handleDelete = async (id) => {
        try {
            await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await deleteUserEvent(user.id, id)
                    Swal.fire('Evento eliminado', 'El evento ha sido eliminado correctamente', 'success')
                    getUserEvents(user.id)
                }
            })
        } catch (error) {
            console.error(error)
            Swal.fire('Error', 'Ha ocurrido un error', 'error')
        }
    }

    useEffect(() => {
        if (user) {
            getEventOrganizerByOwner(user.id)
        }
    }, [user])

    return (
        <Grid2 container>
            <Grid2 item size={{ xs: 12, lg: 7 }} sx={{ p: 2 }}>
                <Typography variant='h3'>Mis eventos</Typography>
                <Typography variant='body1'>Aquí podrás ver los eventos que has reservado</Typography>
                {userEvents.length > 0 ? <Stack spacing={2} sx={{ flexWrap: 'wrap' }} direction='row' useFlexGap>
                    {userEvents.map((event, index) =>
                        <EventCard event={event.event} key={index} width={300} height={140}
                            shareInfoAction={false} handleDelete={handleDelete}
                            redirect={false} />
                    )}
                </Stack> : <Typography variant='body2'>No tienes eventos reservados</Typography>}
            </Grid2>

            <Grid2 component={Paper} item size={{ xs: 12, lg: 5 }} sx={{ p: 2, minHeight: '100vh' }}>

                {eventsOrganizer.length > 0 ? <EventOrganizerComponent eventOrganizer={eventsOrganizer[0]} events={eventsOrganizer[0].Events} refresh={() => getEventOrganizerByOwner(user.id)} /> :
                    <Stack height={'100%'}>

                        <Typography variant='h4'>Mis eventos organizados</Typography>
                        <Typography variant='body1'>Puedes crear una organización para poder organizar eventos y tener un mejor control de los mismos</Typography>
                        <Typography variant='body2'>Parece que no tienes organización, crea una para tener tus propios eventos! </Typography>
                        <Button variant='contained' color='primary' onClick={() => setCreateOrganizationModal(true)}>Crear mi organización</Button>

                    </Stack>}

                {createOrganizationModal && <ModalOrganizer open={createOrganizationModal} onClose={() => setCreateOrganizationModal(false)} ownerId={user.id} refresh={() => getEventOrganizerByOwner(user.id)} />}

            </Grid2>
        </Grid2>
    )
}

const EventOrganizerComponent = ({ eventOrganizer, events, refresh }) => {

    const [addMode, setAddMode] = useState(false)
    const { createEvent } = useEvents()

    const handleAdd = async (ev) => {
        const payload = {
            name: ev.name,
            description: ev.description,
            price: Number(ev.price),
            location: ev.location,
            startDate: ev.startDate,
            endDate: ev.endDate,
            startTime: ev.startDate.split('T')[1],
            endTime: ev.endDate.split('T')[1],
            eventOrganizerId: eventOrganizer.id,
            capacity: Number(ev.capacity),
            remainingTickets: Number(ev.remainingTickets),
            image: ev.image,
        }

        if (dayjs(ev.startDate) > dayjs(ev.endDate)) {
            return Swal.fire('Error', 'La fecha de inicio no puede ser mayor a la fecha de finalización', 'error')
        }

        if (ev.remainingTickets > ev.capacity) {
            return Swal.fire('Error', 'Los cupos restantes no pueden ser mayores a la capacidad', 'error')
        }

        try {
            const res = await createEvent(payload)
            Swal.fire('Evento creado', 'El evento ha sido creado correctamente', 'success')
            refresh()
            setAddMode(false)

        } catch (error) {
            console.error(error)
            Swal.fire('Error', 'Ha ocurrido un error', 'error')
        }
    }

    return (
        <>
            <Stack spacing={1}>
                <Typography variant='h4'>Mis eventos organizados</Typography>
                <Typography variant='body1'>Aquí podrás ver los eventos que has organizado por parte de tú organización</Typography>
                <Typography variant='h6'>Nombre de la organización: {eventOrganizer.companyName}</Typography>
                <Stack spacing={2} sx={{ flexWrap: 'wrap' }} direction='row' useFlexGap>
                    {events.map((event, index) => <EventCardOrganizer event={event} key={index} refresh={refresh} />)}
                </Stack>

                <Button variant='contained' color='primary' onClick={() => setAddMode(true)}>Crear evento</Button>
                <Divider />
            </Stack>
            {addMode && <ModalEvent open={addMode} onClose={() => setAddMode(false)} addMode={true} handleAdd={handleAdd} />}
        </>
    )
}

const EventCardOrganizer = ({ event, refresh }) => {
    const { formatter } = useCurrency()
    const { updateEvent, deleteEvent } = useEvents()

    const [editMode, setEditMode] = useState(false)

    const handleEdit = async (ev) => {
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
            image: ev.image,
        }

        try {
            const res = await updateEvent(event.id, payload)
            Swal.fire('Evento actualizado', 'El evento ha sido actualizado correctamente', 'success')
            refresh()
            setEditMode(false)
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
                    refresh()
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
                    image={event.image ? event.image : '/placeholder.webp'}
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
