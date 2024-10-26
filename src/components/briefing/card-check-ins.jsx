import React from 'react'
import { Card, Grid, Typography, Box } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Stack from '@mui/material/Stack'
import { Gauge } from '@mui/x-charts/Gauge'



const briefings = [
    { name: 'Check-ins', actualCheckins: 0, expectedCheckins: 30, lastWeek: '+14% Since last week' }
]


export default function CheckInCard() {
    return (
        <Grid container spacing={2} md={12}>
            <Grid item>
                <Card sx={{ p: 2 }}>
                    {briefings.map((briefing, index) => (
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography sx={{ml:2}}  variant="subtitle1" color="textSecondary">
                                    {briefing.name}
                                </Typography>
                                <Typography sx={{ml:4, mt:2}}  variant="h4" color="textPrimary">
                                    {briefing.expectedCheckins}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                                    <Gauge width={130} height={130} value={briefing.actualCheckins} valueMin={0} valueMax={briefing.expectedCheckins} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <ArrowUpwardIcon fontSize="small" sx={{ color: 'green' }} />
                                    <Typography variant="body2" sx={{ fontSize: 12, color: 'green', ml: 0.5 }}>
                                        {briefing.lastWeek}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    ))}
                </Card>
            </Grid>
        </Grid>
    )
}
