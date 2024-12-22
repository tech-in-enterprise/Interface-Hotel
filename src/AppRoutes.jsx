import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/home"
import SignIn from "./components/sign-in/sign-in"


export default function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route exact path="/sign-in" element={<SignIn/>}></Route>
                <Route exact path="/" element={<Home/>}></Route>
            </Routes>
        </Router>
    )
}