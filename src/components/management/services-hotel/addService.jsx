import React, { useState, useEffect } from "react"
import Paper from '@mui/material/Paper'
import { Button, Box, TextField } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import { createService, getAllServices } from "../../../redux/slice/managment/serviceSlice"


export default function AddService() {
    const dispatch = useDispatch()
    const selectedDepartment = useSelector((state) => state.departments.selectedDepartment)
    const [ newService, setNewService ] = useState('')

    //criar serviço
    const handleAddService = () => {
        if (newService.trim){
            dispatch(createService({name: newService.trim(), department_id: selectedDepartment.id}))
            setNewService('')
            dispatch(getAllServices())
        }
    }


    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ padding: 2, mt: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                        variant="outlined"
                        size="medium"
                        sx={{ ml: 0.5 }}
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        fullWidth placeholder={`Associar novo serviço à ${selectedDepartment?.name}`}
                        InputProps={{
                            style: { height: '40px', padding: '0' }
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: '0.9rem',
                                lineHeight: '15px',
                                paddingRight: 2
                            }
                        }} />
                    <Box sx={{ display: 'flex', ml: 2, mr: 0.5 }}>
                        <Button variant="contained" color="primary" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none', mr: 1 }} onClick={handleAddService}>
                            Adicionar
                        </Button>
                        <Button variant="contained" color="error" sx={{ fontSize: '0.8rem', padding: '6px 12px', textTransform: 'none' }}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
           
        </React.Fragment>
    )
}
