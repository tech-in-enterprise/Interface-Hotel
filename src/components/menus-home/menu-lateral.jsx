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
import { getAllDepartments } from '../../redux/slice/departments/departmentSlice'
import { FaRegIdCard } from "react-icons/fa"
import { AiOutlineBarChart } from "react-icons/ai"
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import GroupsIcon from '@mui/icons-material/Groups'
import ApartmentIcon from '@mui/icons-material/Apartment'
import PersonIcon from '@mui/icons-material/Person'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'



export default function MenuLateral() { 

  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(0)
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
  }

  
  const handleCategoryItemClick = (childName, id) => {
    dispatch(setItemName(childName))
    dispatch(setSelectedTabLabel(''))
    setActiveItem(id)
  }


  // ícones e nomes que estão no menu lateral
  const categories = [
    {
      name: 'Admin',
      children: [
        {id: 101, name: 'Entidades', icon: <ApartmentIcon style={{ fontSize: '1rem' }}/> },
        {id: 102, name: 'Usuários', icon: <PersonIcon style={{ fontSize: '1rem' }}/> },
      ]
    },
    {
      name: 'Gerenciamento',
      children: [
        {id: 202, name: 'Cadastro', icon: <FaRegIdCard style={{ fontSize: '1rem' }}/> },
        { id: 203, name: 'Departamentos', icon: <GroupsIcon style={{ fontSize: '1rem' }}/> },
        { id: 204, name: 'Escala', icon: <PermContactCalendarIcon style={{ fontSize: '1rem' }}/> }
      ]
    },
    ...(departments.length > 0
      ? [{
          name: 'Setores',
          children: departments.map(department => ({
            id: department.id,
            name: department.name,
          }))
        }]
      : []),
    {
      name: 'Manutenção de Contas',
      children: [
        { id: 301, name: 'Contas', icon: <FolderSharedIcon style={{ fontSize: '1rem' }} /> },
        { id: 302, name: 'Relatórios', icon: <AiOutlineBarChart /> },
      ],
    },
  ]

  return (
    <Drawer variant="permanent" sx={{ background: '#101F33' }}>
      <List disablePadding sx={{ background: '#101F33', height: '100vh', width: 200}}>
        <ListItem sx={{ py: 1, px: 3, color: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset', fontSize: '1rem' , color: '#fff' }}>
          <ViewInArIcon />
          <Typography variant="body3" sx={{ ml: 2,  fontSize: '0.9rem' }}>
            Tech-in
          </Typography>
        </ListItem>

        <ListItem disablePadding sx={{ background: '#101F33' }} onClick={handleDashboardClick}>
          <ListItemButton selected={activeItem === 0} sx={{ py: 1, px: 2, color: 'rgba(255, 255, 255, 0.7)' }} >
            <ListItemIcon><HomeIcon style={{ fontSize: '1rem' }} /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: '0.9rem'  }}>
                Início
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />

        {categories.map(({ name, children }) => (
          <Box key={name} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ p: 1, pb:0 }}>
              <ListItemText
                sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0}}
                primary={<Typography sx={{ fontSize: '0.9rem' }}>{name}</Typography>}
              />
            </ListItem>
            {children.map(({ id, name: childName, icon }) => (
              <ListItem disablePadding key={childName}>
                <ListItemButton selected={activeItem === id} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} onClick={() => handleCategoryItemClick(childName, id)}>
                  <ListItemIcon >{icon}</ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ fontSize: '0.8rem'  }}>
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