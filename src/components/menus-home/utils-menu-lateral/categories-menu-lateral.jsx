import { FaRegIdCard } from "react-icons/fa"
import { AiOutlineBarChart } from "react-icons/ai"
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import GroupsIcon from '@mui/icons-material/Groups'
import ApartmentIcon from '@mui/icons-material/Apartment'
import PersonIcon from '@mui/icons-material/Person'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import { useSelector } from 'react-redux'




// ícones e nomes que estão no menu lateral
export const getCategories = (departments = []) => {
  const selectedHotelId = useSelector((state) => state.auth.hotel)
  const { departmentss } = useSelector((state) => state.departments)

  return [

    {
      name: 'Admin',
      role: ['Administrador'],
      children: [
        { id: 101, name: 'Entidades', icon: <ApartmentIcon style={{ fontSize: '1rem', color: '#FFF' }} />, path: selectedHotelId  ?  `/admin/entidades/${selectedHotelId}` : '/admin/entidades' },
        { id: 102, name: 'Usuários', icon: <PersonIcon style={{ fontSize: '1rem', color: '#FFF' }} />, path: selectedHotelId  ?  `admin/usuarios/${selectedHotelId }` :  '/admin/usuarios' },
      ]
    },
    {
      name: 'Gerenciamento',
      role: ['Administrador', 'Gerente'],
      children: [
        { id: 202, name: 'Hotel', icon: <FaRegIdCard style={{ fontSize: '1rem', color: '#FFF' }}/>, path: selectedHotelId  ?  `/admin/hotel/${selectedHotelId}` : '/hotel' },
        { id: 203, name: 'Departamentos', icon: <GroupsIcon style={{ fontSize: '1rem', color: '#FFF' }} /> , path: selectedHotelId  ?  `/admin/departamentos/${selectedHotelId}` : '/departamentos'},
        { id: 204, name: 'Escala', icon: <PermContactCalendarIcon style={{ fontSize: '1rem', color: '#FFF' }}/>, path: selectedHotelId  ?  `/admin/escala/${selectedHotelId}` : '/escala' }
      ]
    },
    ...(departments.length > 0
      ? [{
        name: 'Setores',
        role: ['Administrador', 'Gerente'],
        children: departments.map(department => ({
          id: department.id,
          name: department.name,
          path: selectedHotelId  ?  `/admin/setores/${department.id}/${selectedHotelId}` : `/setores/${department.id}`, 
        }))
      }]
      : []),
    {
      name: 'Manutenção de Contas',
      role: ['Administrador', 'Gerente'],
      children: [
        { id: 301, name: 'Contas', icon: <FolderSharedIcon style={{ fontSize: '1rem', color: '#FFF' }}/>, path: selectedHotelId  ?  `/admin/contas/${selectedHotelId}` : '/contas' },
        { id: 302, name: 'Relatórios', icon: <AiOutlineBarChart />, path: selectedHotelId  ?  `/admin/relatorios/${selectedHotelId}` : '/relatorios' },
      ],
    },
  ]
}