import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/home"
import SignUP from "./components/sign-up/sign-up"


export default function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route exact path="/sign-up" element={<SignUP/>}></Route>
                <Route exact path="/" element={<Home/>}></Route>
            </Routes>
        </Router>
    )
}