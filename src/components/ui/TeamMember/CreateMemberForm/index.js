// react 
import React from 'react'

//component
import Input from '@/components/ui/Input';

// mui
import { Grid } from '@mui/material';

const CreateMemberForm = ({ setFormData }) => {

    return (
        <>
            <Grid sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                '@media (max-width: 1024px)': {
                    gridTemplateColumns: "1fr "
                },
            }} >
                <Input
                    borderline={true}
                    className="mb-3 w-full"
                    label="FULL NAME"
                    placeholder="Enter your full name"
                    onChange={(e) => setFormData((old) => ({ ...old, "name": e.target.value }))}
                />

                <Input
                    borderline={true}
                    label="PHONE-NUMBER (optional)"
                    placeholder="Phone number "
                    className="mb-3 w-full  "
                    onChange={(e) => setFormData((old) => ({ ...old, "telephone": e.target.value }))}
                />

                <Input
                    borderline={true}
                    className="mb-3 w-full] "
                    label="EMAIL ADDRESS"
                    placeholder="Enter your email address"
                    onChange={(e) => setFormData((old) => ({ ...old, "email": e.target.value }))}
                />

                <Input
                    borderline={true}
                    label="Team member Id(optional)"
                    className="mb-3 w-full"
                    placeholder="Team member Id"
                    onChange={(e) => setFormData((old) => ({ ...old, "teamMemberId": e.target.value }))}
                />
            </Grid>
        </>
    )
}

export default CreateMemberForm