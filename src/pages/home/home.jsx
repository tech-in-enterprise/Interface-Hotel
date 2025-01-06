import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import MenuLateral from '../../components/menus-home/menu-lateral'
import MenuSuperior from '../../components/menus-home/menu-superior'
import OpenManualTicket from '../../components/open-manual-ticket/open-manual-ticket'
import { Outlet } from 'react-router-dom'
import ComponentHome from '../../components/component-home/home'


let theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 44,
    },
  },
})

theme = {
  ...theme,
  components: {


    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2)
        },
      },
    },
  },
}


export default function Home() {

  //criarChamadoManutal (newTicket)
  const [newTicket, setValueNewTicket] = useState(false)
  const handleClick = () => {
    setValueNewTicket(!newTicket)
  }

  return (
    <ThemeProvider theme={theme}>
       <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { sm: 200 }, flexShrink: { sm: 0 } }}>
          <MenuLateral sx={{ display: { sm: 'block', xs: 'none' } }} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <MenuSuperior newTicket={newTicket} handleClick={handleClick} />
          <Box sx={{ mt: 2, p: 2, flexGrow: 1, overflow: 'auto' }}>
            <Outlet /> {/* Renderiza o conteúdo das rotas filhas */}
       
            {newTicket && <OpenManualTicket open={newTicket} onClose={handleClick} />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}