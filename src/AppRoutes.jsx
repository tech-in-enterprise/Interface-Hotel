import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/home"
import SignIn from "./components/auth/sign-in/sign-in"
import { useSelector } from "react-redux"
import AllEntities from "./components/admin/entities/all-entities"
import Users from "./components/admin/users/users"





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
                    <Route path="/admin/entidades/:hotelId?" element={<Private><AllEntities/></Private>} />
                    <Route path="/admin/usuarios" element={<Private><Users/></Private>} />
                </Route>
            </Routes>
        </Router>
    )
}