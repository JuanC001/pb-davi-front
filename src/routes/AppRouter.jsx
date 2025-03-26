import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { NavBarComponent } from "../components/NavBarComponent"
import { Login } from "../pages/Login"
import { MyEvents } from "../pages/MyEvents"
import { Event } from "../pages/Event"
import { NotFound } from "../pages/NotFound"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
export const AppRouter = () => {

    const { user } = useContext(UserContext)

    return <>
        <NavBarComponent />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {user && <Route path="/my-events" element={<MyEvents />} />}
            <Route path="/event/:id" element={<Event />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/not-found" element={<NotFound />} />
        </Routes>

    </>

}