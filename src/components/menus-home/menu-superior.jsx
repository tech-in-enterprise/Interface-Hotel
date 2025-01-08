import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTabLabel } from '../../redux/slice/menuSlice'
import { handleLogout } from '../auth/sign-out'
import { useNavigate } from 'react-router-dom'



export default function MenuSuperior({ handleClick, newTicket }) { // propriedades vindo da página home

  // state e function que dá efeito de sublinhado active ao clicar em 'chamado' no menu superior
  const [value, setValue] = useState(null)
  //utilizando redux para disparar os novos estados (item do menu que foi clicado e enviar para store)
  const itemName = useSelector((state) => state.menu.itemName)
  const selectedTabLabel = useSelector((state) => state.menu.selectedTabLabel)

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  useEffect(() => {
    setValue(null)
  }, [itemName])

  const handleChange = (event, newValue) => {
    const newTab = tabs.find(tab => tab.value === newValue) //acha qual aba(chamado) está sendo selecionada no menu superior e captura esse valor
    if (newTab) {
      setValue(newValue) //atribui esse valor encontrado ao value através da função setValue
      dispatch(setSelectedTabLabel(newTab.label)) //dispacha o valor encontrado pra store, alterando o valor do estado
    }
  }

  const tabs = itemName === 'Relatórios'
    ? [
      { value: 1, label: 'Briefing', key: 'briefing' },
      { value: 2, label: 'Recepção', key: 'reception' },
      { value: 3, label: 'Governança', key: 'governance' },
      { value: 4, label: 'Manutenção', key: 'maintenance' },
    ]
    : [
      { value: 1, label: 'Chamados Abertos', key: 'open' },
      { value: 2, label: 'Chamados em Andamento', key: 'inProgress' },
      { value: 3, label: 'Chamados Encerrados', key: 'closed' },
    ]

  // data atual
  const dataAtual = new Date()
  const dia = String(dataAtual.getDate()).padStart(2, '0')
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
  const ano = dataAtual.getFullYear()

  const dataFormatada = `${dia}/${mes}/${ano}`



  return (
    <React.Fragment>
      <AppBar color="primary" position="relative" elevation={0} sx={{ background: '#101F33' }} >
        <Toolbar>
          <Grid container spacing={1} alignItems="center" sx={{ fontSize:  '0.9rem'}}>
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton color="inherit" aria-label="open drawer" edge="start">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography color="inherit"  sx={{ fontSize: '0.9rem'  }}>
                {itemName} {selectedTabLabel && ` | ${selectedTabLabel}`}
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <CalendarMonthIcon style={{ fontSize: '1rem' }} sx={{ mr: 1 }} />
              {dataFormatada}
            </Grid>
            <Grid item sx={{ fontSize: '0.9rem'  }}>
              {user}
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleLogout(dispatch, navigate)} color="inherit" sx={{ fontSize: '0.9rem'  }}>
                sair
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" color="primary" position="relative" elevation={0} sx={{ zIndex: 0, background: '#101F33' }}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              {itemName && !["Home", 'Entidades', 'Usuários', 'Cadastro', "Departamentos", "Escala", "Contas", "Novo Chamado"].includes(itemName) && (
                <Tabs value={value !== null ? value : false} onChange={handleChange}>
                  {tabs.map((tab) => (
                    <Tab key={tab.key} sx={{ textTransform: 'none', color: '#606060', '&.Mui-selected': { color: '#FFF' } }} value={tab.value} label={tab.label}/>
                  ))}
                </Tabs>
              )}
            </Grid>
            <Grid item>
              <Box display='flex' alignItems="center" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={handleClick} >
                {newTicket ? (
                  <React.Fragment>
                    <IconButton color="inherit">
                      <CloseIcon style={{ fontSize: '1rem', color: 'red' }} />
                    </IconButton>
                    <Typography sx={{ fontSize: '0.9rem'  }}>
                      Fechar Chamado
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Tooltip title="Editar Departamento">
                      <IconButton color='inherit'>
                        <AddCircleOutlineIcon style={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Typography sx={{ fontSize: '0.9rem'  }}>
                      Novo Chamado
                    </Typography>
                  </React.Fragment>
                )}

              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
