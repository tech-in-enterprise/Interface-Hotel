import React from 'react'
import { Card, CardContent, Typography, Avatar } from '@mui/material'
import HotelIcon from '@mui/icons-material/Hotel'

export default function UserCard() {
    return (
        <Card sx={{ maxWidth: 250, borderRadius: 4, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: 2, display: 'flex', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <Avatar sx={{ bgcolor: '#3f51b5', width: 56, height: 56, marginRight: 2 }}>
                <HotelIcon fontSize="large" />
            </Avatar>

            <CardContent sx={{ padding: 0 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
                    Yuri
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Apartamento: 123
                </Typography>
            </CardContent>
        </Card>
    )
}


