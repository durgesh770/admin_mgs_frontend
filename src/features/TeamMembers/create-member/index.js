'use client'
// react 
import React, { useState } from 'react'

//component
import Header from '@/components/ui/Header';

// mui
import { Grid } from '@mui/material';

import CreateMemberForm from '@/components/ui/TeamMember/CreateMemberForm';
import SelectRole from '../SelectRole';
import { createMember } from '@/hooks/TeamMembers';
import ColorSelectorfeature from '@/features/ColorSelectorfeature/ColorSelectorfeature';
import ButtonCom from '@/components/ui/Button';

const CreateMember = () => {
    const [formData, setFormData] = useState({});
    const createMemberHooks = createMember();
    return (
        <>
            <div className='  bg-[--brand-white-color] border border-[--brand-light-gray-color]  p-5 lg:w-fit  m-auto  min-h-screen'>
                <Grid
                    sx={{
                        width: "46rem",
                        margin: "auto",
                        paddingBottom: "70px",
                        '@media (max-width: 1060px)': {
                            width: "100%",
                        },
                    }}
                >
                    {/* header component*/}
                    <div className='sticky top-20 bg-[--brand-white-color] z-50 w-full' >
                        <Header
                            title="Create Team Member"
                            rightSide={
                                <ButtonCom loading={createMemberHooks.loading} onClick={() => createMemberHooks.submit(formData)} btnType="secondary">
                                    Save
                                </ButtonCom>}
                            path={'team-members'}
                        />
                    </div>
                    <div className='pt-8' >

                        <CreateMemberForm setFormData={setFormData} />

                        <SelectRole setRole={(role) => setFormData((old) => ({ ...old, role }))} />

                        <span className='text-xl font-bold ' >Select Color</span>
                        <ColorSelectorfeature setData={(color) => setFormData((old) => ({ ...old, color }))} />

                    </div>
                </Grid>
            </div>
        </>
    )
}

export default CreateMember