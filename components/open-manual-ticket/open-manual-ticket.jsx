import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function OpenManualTicket({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 1,
            right: 1,
            color: 'red',
          }}
        >
          <CloseIcon style={{ fontSize: 18 }} />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 4 }}>
          Criar Chamado Manual
        </Typography>
        <TextField label="Apartamento" variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: 14 } }} />
        <TextField label="Setor" variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: 14 } }} />
        <TextField label="Solicitação" variant="standard" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: 14 } }} />
        <TextField label="Quantidade" variant="standard" type="number" sx={{ m: 1 }} InputLabelProps={{ style: { fontSize: 14 } }} />

        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 4 }}>
          <Button variant="contained" sx={{ fontSize: 10 }}>
            Enviar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
