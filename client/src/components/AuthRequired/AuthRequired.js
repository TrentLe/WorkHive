import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import Auth from '../../utils/auth'

export default function AuthRequired() {
           
    if (!Auth.loggedIn()) {
        return <Navigate to="/LandingPage" />
    }
    return <Outlet />
}