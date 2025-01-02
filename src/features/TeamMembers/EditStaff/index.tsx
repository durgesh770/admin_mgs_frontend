// editstaff
import EditStaff from '@/components/ui/TeamMember/EditStaff'
import { TeamMembers } from '@/interface/TeamMembers';

const EditStaffComponent = ({ user }: { user: TeamMembers }) => {

    return (
        <>
            {/* edit staff component */}
            <EditStaff user={user} />
        </>
    )
}

export default EditStaffComponent
