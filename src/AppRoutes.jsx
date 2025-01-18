import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/home"
import SignIn from "./components/auth/sign-in"
import { useSelector } from "react-redux"
import AllEntities from "./components/admin/entities/all-entities"
import Users from "./components/admin/users/users"
import ProfileHotel from './components/management/profile-info-hotel/profile-info-hotel'
import Department from "./components/management/departments/departments"
import ServicesFromDepartments from "./components/management/services-hotel/services"
import DashboardCard from "./components/briefing/briefing"
import ChamadosAbertos from "./components/chamados/chamados-abertos"




export default function AppRoutes() {

    const Private = ({ children }) => {
        const { isAuthenticated } = useSelector((state) => state.auth)
        if (!isAuthenticated) {
            return <Navigate to={"/sign-in"} replace />
        }
        return children
    }

 

    return (
        <Router>
            <Routes>
                <Route exact path="/sign-in" element={<SignIn />}></Route>
                <Route exact path="/" element={<Private><Home /></Private>}>
                    <Route path="/admin/entidades/:hotelId?" element={<Private><AllEntities /></Private>} />
                    <Route path="/admin/usuarios/:hotelId?" element={<Private><Users /></Private>} />
                    <Route path="/admin/hotel/:hotelId?" element={<Private><ProfileHotel /></Private>} />
                    <Route path="/admin/departamentos/:hotelId?" element={<Private><Department /></Private>} />
                    <Route path="/admin/departamento/servicos/:hotelId?" element={<Private><ServicesFromDepartments /></Private>} />
                    <Route path="/admin/setores/:departamentoId?/:hotelId?" element={<Private><ChamadosAbertos/></Private>} />
                    <Route path="/admin/contas/:hotelId?" element={<Private><Users /></Private>} />
                    <Route path="/admin/relatorios/:hotelId?" element={<Private><DashboardCard/></Private>} />

                    //rotas de gerente

                    <Route path="/hotel/:hotelId?" element={<Private><ProfileHotel /></Private>} />
                    <Route path="/departamentos/:hotelId?" element={<Private><Department /></Private>} />
                    <Route path="/departamento/servicos/:hotelId?" element={<Private><ServicesFromDepartments /></Private>} />
                    <Route path="/setores/:departamentoId?" element={<Private><ChamadosAbertos /></Private>} />
                    <Route path="/contas/:hotelId?" element={<Private><Users /></Private>} />
                    <Route path="/relatorios/:hotelId?" element={<Private><DashboardCard/></Private>} />            
                </Route>
            </Routes>
        </Router>
    )
}