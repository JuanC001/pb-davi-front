import { Button, Grid2, Paper, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useEventsOrganizer } from '../hooks/useEventOrganizer'

import Swal from 'sweetalert2'
import { ModalOrganizer } from '../components/Organizer/ModalOrganizer'

import { useUserEvent } from '../hooks/useUserEvent'
import { EventCard } from '../components/Events/EventCard'
import { EventOrganizerComponent } from '../components/Organizer/EventOrganizerComponent'

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



