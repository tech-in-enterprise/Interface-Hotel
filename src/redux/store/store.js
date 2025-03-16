import {configureStore} from '@reduxjs/toolkit'
import loginSlice from '../slice/auth/loginSlice'
import menuReducer from '../slice/menuSlice'
import departments from '../slice/managment/departments'
import services from '../slice/managment/serviceSlice'
import hotelEntity from '../slice/admin/register-entity-hotel'
import roleSlice from '../slice/roles/roleSlice'
import allUsers from '../slice/admin/users'
import hotelById from '../slice/managment/profile-info-hotel'
import amenities from '../slice/managment/hotel_amenities'


export const store = configureStore({
    reducer:{
        auth: loginSlice,
        menu: menuReducer,
        roles: roleSlice,
        users: allUsers,
        entityHotel: hotelEntity,
        hotelProfileById: hotelById,
        departments: departments,
        services: services,
        amenities: amenities,
    },

})