import { AppBar, Box, Button, Collapse, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

export const NavBarComponent = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const location = useLocation()

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Stack direction={'column'} onClick={() => console.log('click')} sx={{ cursor: 'pointer' }}>
                            <Typography variant="h6" sx={{
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
                        location.pathname !== '/login' && !loggedIn && <LoginButton onClick={() => setLoggedIn(true)} />
                    }

                    {
                        location.pathname !== '/login' && loggedIn && <LoggedInformation logOut={() => setLoggedIn(false)} />
                    }

                    {
                        location.pathname !== '/login' && loggedIn && <IconButton
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'white' }}>
                            <MenuIcon />
                        </IconButton>
                    }

                    {drawerOpen && <Collapse in={drawerOpen}>
                        <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
                    </Collapse>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

const LoginButton = ({ onClick }) => {
    return <Button variant="text" color='white' onClick={onClick}>Log In</Button>
}
const LoggedInformation = ({ logOut, profile, reserves }) => {
    return <Stack direction={'row'} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <MenuItem color='white' sx={{ gap: 1 }} onClick={profile}> Profile<PersonIcon fontSize='small' /></MenuItem>
        <MenuItem color='white' sx={{ gap: 1 }} onClick={reserves}>My reserves <CalendarMonthIcon fontSize='small' /></MenuItem>
        <MenuItem color='white' onClick={logOut} sx={{ gap: 1 }}> Log out <LogoutIcon fontSize='small' /></MenuItem>
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