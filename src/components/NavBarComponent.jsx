import { AppBar, Box, Button, Collapse, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from '../context/UserContext';

export const NavBarComponent = () => {

    const { user, authStatus, logout } = useContext(UserContext)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <AppBar position="sticky" sx={{ zIndex: 999 }}>
            <Container>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Stack direction={'column'}>
                            <Typography variant="h6"
                                onClick={() => navigate('/')}
                                sx={{
                                    cursor: 'pointer',
                                    letterSpacing: {
                                        xs: 1,
                                        sm: 2,
                                        md: 8,
                                    }, display: 'flex', alignItems: 'center'
                                }}>
                                ConectaTE
                                <RssFeedIcon />
                            </Typography>
                            <Typography variant="caption" sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'block',
                                }
                            }}>
                                Conectando personas con el mundo
                            </Typography>
                        </Stack>
                    </Box>
                    {
                        location.pathname !== '/login' && authStatus !== true && <LoginButton onClick={() => navigate('/login')} />
                    }

                    {
                        location.pathname !== '/login' && authStatus && user && <LoggedInformation logOut={logout} reserves={() => navigate('/my-events')} userName={user.name ? user.name : 'Usuario'} />
                    }

                    {
                        location.pathname !== '/login' && authStatus && <IconButton
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'white' }}>
                            <MenuIcon />
                        </IconButton>
                    }

                    {drawerOpen && <Collapse in={drawerOpen}>
                        <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} logOut={logout} reserves={() => navigate('/my-events')} />
                    </Collapse>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

const LoginButton = ({ onClick }) => {
    return <Button variant="text" color='white' onClick={onClick}>Iniciar Sesión</Button>
}
const LoggedInformation = ({ logOut, profile, reserves, userName }) => {
    return <Stack direction={'row'} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <MenuItem color='white' sx={{ gap: 1 }} onClick={profile}>Hola, {userName}<PersonIcon fontSize='small' /></MenuItem>
        <MenuItem color='white' sx={{ gap: 1 }} onClick={reserves}>Mis Eventos <CalendarMonthIcon fontSize='small' /></MenuItem>
        <MenuItem color='white' onClick={logOut} sx={{ gap: 1 }}> Cerrar Sesión <LogoutIcon fontSize='small' /></MenuItem>
    </Stack>
}

const DrawerMenu = ({ open, onClose, logOut, profile, reserves }) => {
    return <Drawer
        anchor='right'
        open={open}
        onClose={onClose}
    >

        <Box sx={{ width: 250 }} role='presentation'>
            <List>
                <ListItem onClick={profile}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Perfil
                        </ListItemText>
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton onClick={reserves}>
                        <ListItemIcon>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Mis Reservas
                        </ListItemText>
                    </ListItemButton>

                </ListItem>
                <ListItem>
                    <ListItemButton onClick={logOut}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Cerrar Sesión
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>

    </Drawer>
}