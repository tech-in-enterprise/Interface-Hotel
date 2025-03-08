import React from 'react'
import { Grid } from '@mui/material'
import CheckInCard from './card-check-ins'
import CheckOutCard from './card-check-outs'
import InHouseCard from './card-in-hotel'
import OthersBriefingCard from './card-others-briefing'


export default function DashboardCard() {
  return (
    <Grid container spacing={1}>
      <Grid item md={3}>
        <InHouseCard />
      </Grid>
      <Grid item md={3}>
        <CheckInCard />
      </Grid>
      <Grid item md={3}>
        <CheckOutCard />
      </Grid>
      <Grid item md={3}>
        <OthersBriefingCard />
      </Grid>
      <Grid item md={6}>
        <OthersBriefingCard />
      </Grid>
    </Grid>
  )
}