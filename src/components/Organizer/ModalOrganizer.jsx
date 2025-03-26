import { Button, Divider, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useEventsOrganizer } from '../../hooks/useEventOrganizer'
import Swal from 'sweetalert2'

export const ModalOrganizer = ({ refresh, open, onClose, ownerId }) => {

    const { register, getValues } = useForm()
    const { createEventOrganizer } = useEventsOrganizer()

    const handleAddOrganization = async (e) => {

        e.preventDefault()
        const { name, description } = getValues()
        const payload = {
            companyName: name,
            companyDescription: description,
            ownerId
        }

        try {
            await createEventOrganizer(payload)
            refresh()
            onClose()
            Swal.fire({
                icon: 'success',
                title: 'Organización creada',
                text: 'Tu organización ha sido creada con éxito'
            })
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al crear la organización',
            })
            console.error(error)

        }


    }

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',zIndex: 1000 }}>
            <Paper sx={{ height: "400px", width: '80%', maxWidth: 600, p: 2 }} component={'form'} onSubmit={handleAddOrganization}>
                <Typography variant='h4'>Crear organización</Typography>
                <Divider />
                <Stack spacing={2} my={2}>
                    <TextField {...register('name')} label='Nombre de la organización' fullWidth required />
                    <TextField {...register('description')} label='Descripción' fullWidth multiline rows={5} />
                    <Button variant='contained' color='primary' type='submit'>Crear organización</Button>
                </Stack>
            </Paper>
        </Modal>
    )
}
