import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { NavBarComponent } from "../components/NavBarComponent"
export const AppRouter = () => {

    return <>
        <NavBarComponent />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>

    </>

}