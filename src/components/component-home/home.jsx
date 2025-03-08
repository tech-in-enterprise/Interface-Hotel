import React from "react"
import { useSelector } from "react-redux"
import { Box } from "@mui/material"
import Title from "../general-components/title-from-pages"


export default function ComponentHome() {

    const { role } = useSelector((state) => state.auth)

    return (
        <Box>
            {role === "Administrador" ? (
                <Title Title = {"Administrador"}/>
            ) : role === "Gerente" ? (
                <div>
                    <h1>Bem-vindo, Gerente</h1>
                    <p>Dados disponíveis para o hotel:</p>
                    <ul>
                        <li>Relatórios financeiros</li>
                        <li>Departamentos</li>
                        <li>Escalas</li>
                    </ul>
                </div>
            ) : (
                <div>
                    <h1>Bem-vindo</h1>
                    <p>Por favor, entre com um papel válido para acessar os recursos.</p>
                </div>
            )}
        </Box>
    )
}