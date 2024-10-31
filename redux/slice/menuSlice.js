import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
    name: 'menu',
    initialState:{
        itemName: 'Home',
        selectedTabLabel: '',
    },
    reducers: {
        setItemName: (state, action) => {
            state.itemName = action.payload
        },
        setSelectedTabLabel: (state, action) => {
            state.selectedTabLabel = action.payload
        },
    },
})

export const { setItemName, setSelectedTabLabel } =  menuSlice.actions
export default menuSlice.reducer