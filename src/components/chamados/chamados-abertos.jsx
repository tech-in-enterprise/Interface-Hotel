import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Button, Paper } from '@mui/material'
import { useSelector } from 'react-redux'

// Exemplo de dados para os chamados
const chamados = [
  { apartamento: 'U.H. 101', solicitacao: 'Toalha extra', quantidade: 2, inicio: '10:00', tempo: '15 min' },
  { apartamento: 'U.H. 102', solicitacao: 'Travesseiro extra', quantidade: 1, inicio: '10:05', tempo: '10 min' },
  { apartamento: 'U.H. 103', solicitacao: 'Limpeza', quantidade: 1, inicio: '10:10', tempo: '30 min' },
]

export default function ChamadosAbertos() {
  const selectedTabLabel = useSelector((state) => state.menu.selectedTabLabel)

  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow sx={{ background: '#101F33' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Apartamento</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Solicitação</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Quantidade</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Início</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Tempo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', color: '#FFF', padding: '8px' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          {selectedTabLabel && (
            <TableBody>
              {chamados.map((chamado, index) => (
                <TableRow key={index} sx={{ bgcolor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    {chamado.apartamento}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    {chamado.solicitacao}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    {chamado.quantidade}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    {chamado.inicio}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    {chamado.tempo}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', textTransform: 'none' }}>
                      Atender
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
    </React.Fragment>
  )
}
