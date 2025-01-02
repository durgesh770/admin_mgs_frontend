import React from 'react'
import { Button, Grid } from "@mui/material"
// mui
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface PopUpHeaderprops {
    handleChangeOpen: any
    title: any
}

const PopUpHeader = ({ handleChangeOpen, title }: PopUpHeaderprops) => {
    return (
        <>
            <Grid className='pt-0 mb-0'
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingBottom: "1rem" }}>
                <Grid><Button onClick={handleChangeOpen} ><ClearOutlinedIcon /></Button></Grid>
                <Grid sx={{
                    paddingLeft: "20%",
                    '@media (max-width: 700px)': {
                        paddingLeft: "12%",
                    },
                    '@media (max-width: 400px)': {
                        paddingLeft: "5%",
                    }
                }}>
                    <span className=" font-extrabold text-xl sm:text-2xl">{title}</span>
                </Grid>
            </Grid>
        </>
    )
}

export default PopUpHeader
