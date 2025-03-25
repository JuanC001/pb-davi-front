import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { NavBarComponent } from "../components/NavBarComponent"
import { Login } from "../pages/Login"
export const AppRouter = () => {

    return <>
        <NavBarComponent />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>

    </>

}