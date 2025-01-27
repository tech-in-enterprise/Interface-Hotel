import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert'




export default function AlertMessages({filtroMap, stateFromRedux, message, loading, error, infoMessage}) {


    const [visibleMessage, setVisibleMessage] = useState(null)
    const [visibleError, setVisibleError] = useState(null)


    // Exibir mensagem com duração de 5 segundos
    useEffect(() => {
        if (message) {
            setVisibleMessage(message)
            const timer = setTimeout(() => {
                setVisibleMessage(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
        setVisibleMessage('')
    }, [message, stateFromRedux])

    // Exibir erro com duração de 5 segundos
    useEffect(() => {
        if (error) {
            setVisibleError(error)
            const timer = setTimeout(() => setVisibleError(null), 3000)
            return () => clearTimeout(timer)
        }
        setVisibleError('')
    }, [error])




    return (
        <React.Fragment>
            {/* Mostrar mensagens */}
            {loading && <Alert sx={{ mt: 0, mb: 1 }} severity="info">{message}</Alert>}
            {visibleError && <Alert sx={{ mt: 0, mb: 1 }} severity="error">{visibleError}</Alert>}
            {visibleMessage && !loading && !error && (
                <Alert sx={{ mt: 0, mb: 1 }} severity={visibleMessage.includes('sucesso') ? 'success' : 'info'}>{visibleMessage}</Alert>
            )}
            {filtroMap.length === 0 && !visibleMessage && !loading && !error && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="info">{infoMessage}</Alert>
            )}
            {error && stateFromRedux.length === 0 && !visibleError && !loading && (
                <Alert sx={{ mt: 0, mb: 1 }} severity="error">{error}</Alert>
            )}
        </React.Fragment>
    )
}
