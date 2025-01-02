// react 
import React from 'react';
import { useEffect, useState } from 'react';

// mui
import { Button, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// component
import PersonalInfo from '../PersonalInfo/index'
import Permission from '../Permission/index'
import EditStaffComponent from '../EditStaff';
import StaffMemberHoursComponent from '../TeamMemberHours';
import SideDrawer from '@/components/ui/SideDrawer';
import TeamMemberLeave from '../LeaveCalender/TeamMemberLeave/TeamMemberLeave';

//hooks
import { getSingleMember } from '@/hooks/TeamMembers';
import { removeQuery } from '@/utils/tools';
import { useRouter } from 'next/navigation';
import JobInfoCard from '@/components/ui/TeamMember/JobInfoCard/JobInfoCard';

export default function GetData({ memberId }) {
    let memberDetail = getSingleMember(memberId);

    return !memberDetail.loading && memberDetail.data != null ? <ViewTeamMember memberId={memberId} user={memberDetail.data} /> : ''
}

function ViewTeamMember({ memberId, user }) {
    let router = useRouter();

    // state 
    const [viewMember, setviewMember] = useState(false);

    // handle close
    const handleClose = () => {
        setviewMember(false)
        removeQuery(router, ["memberId"]);
    }

    // handle side effect
    useEffect(() => {
        setviewMember(Boolean(memberId))
    }, [memberId]);

    return (

        <SideDrawer open={viewMember} onClose={handleClose} headerHidden={false}  >
            <div className=' sticky top-0 z-30 w-full grid grid-cols-3 items-center  bg-[--brand-white-color] py-3 px-2'  >
                <div>
                    <Button onClick={handleClose} ><CloseIcon /></Button>
                </div>
                <Grid
                    sx={{
                        textAlign: "center",
                        paddingLeft: "7%",
                        '@media (max-width:600px)': {
                            paddingLeft: "25%",
                        },
                    }}>
                    <Typography sx={{
                        fontWeight: 600,
                    }} >{user.name}</Typography>
                </Grid>
            </div>

            <div className="relative px-3 mb-6">
                {/* personal Information component */}
                <PersonalInfo user={user} />
                {/* Permission component */}
                <Permission user={user} />

                {/* Job Edit component */}
                <JobInfoCard user={user}/>
                
                {/* Edit Staff Component*/}
                <EditStaffComponent user={user} />
                {/*Staff Member Hours Component */}
                <StaffMemberHoursComponent user={user} />
                 {/* leave */}
                <TeamMemberLeave user={user} />
            </div>
        </SideDrawer>
    )
}