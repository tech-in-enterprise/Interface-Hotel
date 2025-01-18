import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import HomeIcon from '@mui/icons-material/Home'
import { Typography } from '@mui/material'
import { setItemName, setSelectedTabLabel } from '../../redux/slice/menuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDepartments } from '../../redux/slice/managment/departments'
import { getCategories } from './utils-menu-lateral/categories-menu-lateral'
import { filterCategories } from './utils-menu-lateral/filterCategories'
import { useNavigate } from 'react-router-dom'




export default function MenuLateral() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState(Number(localStorage.getItem('activeMenuItem')) || 0)
  const { role, hotel } = useSelector((state) => state.auth)
  const { departments } = useSelector((state) => state.departments)



  //reenderiza todos os departamentos vindo do redux e banco de dados
  useEffect(() => {
    dispatch(getAllDepartments())
  }, [dispatch])

  //atualiza o itemName quando for clicado em início
  const handleDashboardClick = () => {
    dispatch(setItemName('Home'))
    dispatch(setSelectedTabLabel(''))
    setActiveItem(0)
    localStorage.setItem('activeMenuItem', 0) 
    navigate("/")
  }


  const handleCategoryItemClick = (childName, id, path) => {
    dispatch(setItemName(childName))
    dispatch(setSelectedTabLabel(''))
    setActiveItem(id)
    localStorage.setItem('activeMenuItem', id)
    navigate(path)
  }

  const categories = getCategories( departments)

  const filteredCategories  = filterCategories(categories, role, hotel)

  return (
    <Drawer variant="permanent" sx={{ background: '#101F33' }}>
      <List disablePadding sx={{ background: '#101F33', height: '100vh', width: 200 }}>
        <ListItem sx={{ py: 1, px: 3, color: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset', fontSize: '1rem', color: '#fff' }}>
          <ViewInArIcon />
          <Typography variant="body3" sx={{ ml: 2, fontSize: '0.9rem' }}>
            Tech-in
          </Typography>
        </ListItem>

        <ListItem disablePadding sx={{ background: '#101F33' }} onClick={handleDashboardClick}>
          <ListItemButton selected={activeItem === 0} sx={{ py: 1, px: 2, color: 'rgba(255, 255, 255, 0.7)' }} >
            <ListItemIcon><HomeIcon style={{ fontSize: '1rem', color:'#FFF' }} /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Início
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />

        {filteredCategories
          .map(({ name, children }) => (
            <Box key={name} sx={{ bgcolor: '#101F33' }}>
              <ListItem sx={{ p: 1, pb: 0 }}>
                <ListItemText
                  sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0 }}
                  primary={<Typography sx={{ fontSize: '0.9rem' }}>{name}</Typography>}
                />
              </ListItem>
              {children.map(({ id, name: childName, icon, path }) => (
                <ListItem disablePadding key={id}>
                  <ListItemButton selected={activeItem === id} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} onClick={() => handleCategoryItemClick(childName, id, path)}>
                    <ListItemIcon >{icon}</ListItemIcon>
                    <ListItemText>
                      <Typography sx={{ fontSize: '0.8rem' }}>
                        {childName}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}

      </List>
    </Drawer>
  )
}