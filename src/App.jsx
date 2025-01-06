import React, {useEffect} from "react"
import AppRoutes from "./AppRoutes"
import { useDispatch } from "react-redux"
import { initializeAuth } from "./redux/slice/auth/loginSlice"

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    // Inicializa o estado do Redux com os dados dos cookies
    dispatch(initializeAuth())
  }, [dispatch])
  
  return (
    <AppRoutes />
  )
}


