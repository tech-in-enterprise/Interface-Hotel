import React from "react"
import { Typography } from "@mui/material"


export default function Title({ Title }) {
    return (
        <Typography sx={{ mb: 2, fontFamily: "'Roboto Condensed', Arial, sans-serif" }}>{Title}</Typography>
    )
}