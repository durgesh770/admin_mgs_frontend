// component
import StaffMemberHours from '@/components/ui/TeamMember/StaffMemberHours'
import { TeamMembers } from '@/interface/TeamMembers'

const StaffMemberHoursComponent =  ({ user }: { user: TeamMembers })=> {
    return (
        <>
            <StaffMemberHours user={user}  />
        </>
    )
}

export default StaffMemberHoursComponent
