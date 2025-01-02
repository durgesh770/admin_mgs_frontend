"use client"
// mui
import { Button, Grid } from "@mui/material"
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// react 
import { useState } from "react"

// component
import ButtonCom from '../../Button/index'
import Modal from "@/components/ui/Modal"
import Divider from '@mui/material/Divider';
import Textarea from "../../Textarea/Textarea";


const AddNotes = ({ description, setDescription, submit }) => {
    // modal state
    const [open, setOpen] = useState(false)
    return (
        <>
            <Modal customOpen={open} customClose={setOpen} target={<span >Add/Edit</span>}>

                <div className="p-3 ">
                    <div className="flex flex-row items-center justify-between">

                        <Grid><Button onClick={() => setOpen(false)} ><ClearOutlinedIcon /></Button></Grid>

                        <span className="text-2xl font-extrabold text-[--brand-color] ">Add Notes</span>
                        <div></div>
                    </div>

                    <Divider />

                    <div className="py-6" >
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            textrows={6}
                            label="Notes"
                        />
                    </div>

                    <Divider />

                    <Grid
                        className="mt-4"
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "row",
                            alignItems: "center",
                        }} >
                        <Grid>
                            <ButtonCom btnType={'secondary'} onClick={submit} >Save</ButtonCom>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </>
    )
}

export default AddNotes