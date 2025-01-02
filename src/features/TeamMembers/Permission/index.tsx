// component
import PermissionInfoCard from '@/components/ui/TeamMember/Permissions'
import { TeamMembers } from '@/interface/TeamMembers'

const index = ({ user }: { user: TeamMembers }) => {
    // data for props  
    const data = {
        permissionSet: user.role?.title,
        access: "All access points",
        passcode: "Show Passcode",
        permissions: "View Access",
    }

    return (
        <>
            {/* permission info card  */}
            <PermissionInfoCard data={data} role={user.role} memberId={user.id} />
        </>
    )
}

export default index
