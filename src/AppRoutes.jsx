import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/home"
import SignIn from "./components/sign-in/sign-in"
import { useSelector } from "react-redux"





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
                <Route exact path="/" element={<Private><Home /></Private>}></Route>
            </Routes>
        </Router>
    )
}