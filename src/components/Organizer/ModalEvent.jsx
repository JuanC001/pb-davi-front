import { Box, Button, Modal, Paper, Stack, TextField, Typography } from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

export const ModalEvent = ({ event, open, onClose, addMode = false, handleAdd, handleEdit }) => {

    const { register, getValues, setValue } = useForm({
        defaultValues: {
            name: event?.name || '',
            description: event?.description || '',
            price: event?.price || '',
            location: event?.location || '',
            capacity: event?.capacity || '0',
            remainingTickets: event?.remainingTickets || '0',
            image: event?.image || '',
            startDate: event?.startDate || dayjs().add(1, 'day').format(),
            endDate: event?.endDate || dayjs().add(2, 'day').format()
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const { capacity, description, endDate, image, location, name, price, remainingTickets, startDate } = getValues()
        const event = {
            capacity,
            description,
            image,
            location,
            name,
            price,
            remainingTickets,
            startDate,
            endDate
        }

        if (addMode) {
            handleAdd(event)
        }
        else {
            handleEdit(event)
        }
    }

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <Paper sx={{ width: 400 }} component={'form'} onSubmit={handleSubmit}>
                <Box sx={{ p: 2 }}>
                    <Typography variant='h4'>{addMode ? 'Crear Evento' : 'Editar evento'}</Typography>
                    <Stack spacing={2}>
                        <TextField label='Nombre del evento' {...register('name')} variant='outlined' required />
                        <TextField label='Descripción' {...register('description')} variant='outlined' required />
                        <TextField label='Precio' {...register('price')} type='number' variant='outlined' required />
                        <TextField label='Ubicación' {...register('location')} variant='outlined' required />
                        <TextField label='Cupos' type='number' {...register('capacity')} variant='outlined' required />
                        <TextField label='Cupos Restantes' type='number' {...register('remainingTickets')} variant='outlined' required />
                        <TextField label='Image Url' type='text' {...register('image')} variant='outlined' />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker format="DD/MM/YYYY HH:mm A" minDate={dayjs().add(1, 'day')} defaultValue={!addMode ? dayjs(event.startDate) : dayjs().add(1, 'day')} label="Fecha y Hora de Inicio" onChange={(value) => setValue('startDate', dayjs(value).toDate().toString())} />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker format="DD/MM/YYYY HH:mm A" minDate={dayjs().add(1, 'day')} defaultValue={!addMode ? dayjs(event.endDate) : dayjs().add(1, 'day')} label="Fecha y Hora de Finalización" onChange={(value) => setValue('endDate', dayjs(value).toDate().toString())} />
                        </LocalizationProvider>
                        <Button variant='contained' color='primary' type="submit">Guardar</Button>
                    </Stack>
                </Box>
            </Paper>
        </Modal>
    )
}