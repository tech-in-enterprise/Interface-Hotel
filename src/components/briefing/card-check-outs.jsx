import React from 'react'
import { Card, Grid, Typography, Box } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Stack from '@mui/material/Stack'
import { Gauge } from '@mui/x-charts/Gauge'



const briefingInHouse = [
    { name: 'Check-outs', actualCheckOut: 20, expectedCheckOuts: 40, lastWeek: '+14% Since last week' }
]


export default function CheckOutCard() {
    return (
        <Grid container spacing={2} md={12} xs={12}>
            {briefingInHouse.map((briefingOut, index) => (
                <Grid item>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <Grid container item xs={12}>
                            <Grid item xs={6}>
                                <Typography sx={{ml:2}} variant="subtitle1" color="textSecondary">
                                    {briefingOut.name}
                                </Typography>
                                <Typography variant="h4" color="textPrimary" sx={{ ml: 4, mt:2 }}>
                                    {briefingOut.expectedCheckOuts}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                                    <Gauge width={130} height={130} value={briefingOut.actualCheckOut} valueMin={0} valueMax={briefingOut.expectedCheckOuts} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <ArrowUpwardIcon fontSize="small" sx={{ color: 'red' }} />
                                    <Typography variant="body2" sx={{ fontSize: 12, color: 'red', ml: 0.5 }}>
                                        {briefingOut.lastWeek}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
