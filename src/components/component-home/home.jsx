import React from "react"
import { useSelector } from "react-redux"
import { Box } from "@mui/material"



export default function ComponentHome() {

    const { role } = useSelector((state) => state.auth)

    return (
        <Box>
            {role === "Administrador" ? (
                <div>
                    <h1>Bem-vindo, Administrador</h1>
                    <p>Aqui você pode gerenciar:</p>
                    <ul>
                        <li>Usuários</li>
                        <li>Entidades</li>
                        <li>Configurações gerais</li>
                    </ul>
                </div>
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