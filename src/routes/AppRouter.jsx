import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { NavBarComponent } from "../components/NavBarComponent"
import { Login } from "../pages/Login"
import { MyEvents } from "../pages/MyEvents"
export const AppRouter = () => {

    return <>
        <NavBarComponent />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="my-events" element={<MyEvents />} />
        </Routes>

    </>

}