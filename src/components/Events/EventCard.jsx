import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useCurrency } from '../../hooks/useCurrency'

import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

export const EventCard = ({ event, shareInfoAction = true, width = 400, height = 240, handleDelete = null, redirect = true }) => {
    const { formatter } = useCurrency()
    const navigate = useNavigate()
    return (
        <Card sx={{
            width: width, cursor: 'pointer',
            transition: 'all 0.5s ease',
            ":hover": {
                transform: 'scale(1.01)',
            }
        }}
            onClick={() => redirect ? navigate(`/event/${event.id}`) : null}
        >
            <CardMedia
                sx={{ height: height }}
                image={event.image ? event.image : '/placeholder.webp'}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {event.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    {event.startDate.toString().split('T')[0]} - {event.startDate.split('T')[1].split('.')[0]}
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
            {
                shareInfoAction && <CardActions>

                    <IconButton color='primary' aria-label="share" onClick={() => shareInfoAction(event)}>
                        <ShareIcon />
                    </IconButton>

                    <IconButton color='primary' aria-label="info" onClick={() => navigate(`/event/${event.id}`)}>
                        <InfoIcon />
                    </IconButton>

                </CardActions>
            }

            {
                handleDelete !== null &&
                <CardActions>

                    <IconButton color='primary' aria-label="info" onClick={() => navigate(`/event/${event.id}`)}>
                        <InfoIcon />
                    </IconButton>

                    <IconButton color='error' aria-label="delete" onClick={() => handleDelete(event.id)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            }
        </Card>
    )
}
