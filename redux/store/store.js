import {configureStore} from '@reduxjs/toolkit'
import menuReducer from '../slice/menuSlice'
import departmentSlice from '../slice/departments/departmentSlice'
import serviceSlice from '../slice/departments/servicesSlice'
import hotelSlice from '../slice/register/registerSlice'


export const store = configureStore({
    reducer:{
        menu: menuReducer,
        hotel: hotelSlice,
        departments: departmentSlice,
        services: serviceSlice,
    },
})