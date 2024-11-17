import React from 'react'
import { Card, Grid, Typography, Box } from '@mui/material'

const briefingInHouse = [
  { type: 'Limpos', count: 30, color: 'green' },
  { type: 'Sujos', count: 40, color: 'red' },
  { type: 'Ocupados', count: 55, color: 'blue' },
  { type: 'Manutenção', count: 20, color: 'orange' },
  { type: 'Total de U.H.', count: 125, color: 'purple' },
]

const totalUH = briefingInHouse.find(item => item.type === 'Total de U.H.').count

export default function OthersBriefingCard() {
  return (
    <Grid container spacing={2} md={12}>
      <Grid item>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: '0.8rem' }}>Status</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: '0.8rem', ml: 1 }}>Uhs</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: '0.8rem' }}>Qntd</Typography>
            </Grid>
            {briefingInHouse.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ fontSize: '0.8rem' }} color="textSecondary">
                      {item.type}:
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontSize: '0.8rem', ml: 2 }} color="textSecondary">
                      {item.count}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 15,
                        bgcolor: '#e0e0e0',
                        borderRadius: '4px',
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${(item.count / totalUH) * 100}%`,
                          height: '100%',
                          bgcolor: item.color,
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}
