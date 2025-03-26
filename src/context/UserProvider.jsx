import React, { useEffect, useState } from 'react'
import { UserContext } from './UserContext'

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [authStatus, setAuthStatus] = useState("checking")

    const loggedIn = (user, token) => {

        const { id, email, name, surname, document, role } = user
        setUser({
            id,
            email,
            name,
            surname,
            document,
            role,
            token
        })
        setAuthStatus(true);
        window.sessionStorage.setItem('user', JSON.stringify({
            id,
            email,
            name,
            surname,
            document,
            role,
            token
        }));

    }

    const logout = () => {

        setUser(null);
        setAuthStatus(false);
        window.location.href = '/';
        window.sessionStorage.removeItem('user');
        window.sessionStorage.clear();
        window.localStorage.clear();

    }

    useEffect(() => {

        const user = window.sessionStorage.getItem('user');
        if (user) {
            loggedIn(JSON.parse(user), JSON.parse(user).token);
            return
        }
        setAuthStatus(false);

    }, [])

    return (
        <UserContext.Provider value={{ user, authStatus, loggedIn, logout }}>
            {children}
        </UserContext.Provider>
    )
}
