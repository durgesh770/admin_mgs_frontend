import React, { useState } from 'react'

import { FormControlLabel, Grid, Radio, Typography } from '@mui/material'

interface Role {
    _id: string;
    title: string;
    roleId: string;
    totalMember: number;
};

interface SelectRoleProps {
    roles: Role[],
    setRole: (e: any) => any;
    defaultRole?: string;
}

function SelectRole({ roles, setRole, defaultRole }: SelectRoleProps) {


    const [selectedRole, setSelectedRole] = useState<string>(defaultRole || '');
    const handleSelectRole = (role: Role) => {
        setSelectedRole(role._id);
        setRole && setRole({
            roleId: role.roleId,
            title: role.title
        });
    }

    return (
        <>
            <div className="flex w-full justify-between border border-slate-400 my-4 items-start bg-[--brand-pastel-color] dark:bg-gray-700">
                <div className='pt-2 pr-0 '>
                    <Typography className='px-4'>Permission set</Typography>
                </div>

                <div className='pb-32 pl-4 sm:pr-24 pr-2 bg-white'>
                    {roles.map((role) => {
                        let checked = selectedRole.includes(role.roleId) || selectedRole.includes(role._id);
                        return <Grid className='pt-2' >
                            <FormControlLabel value="other" control={<Radio checked={checked} onChange={(e) => handleSelectRole(role)} />} label={role.title} />
                            <Typography sx={{ paddingLeft: "5% ", color: "#939393" }} >{role.totalMember} team member</Typography>
                        </Grid>;
                    })}
                </div>
            </div>

        </>
    )
}

export default SelectRole