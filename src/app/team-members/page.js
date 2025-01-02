'use client'
// next
import { useRouter, useSearchParams } from 'next/navigation';

// component
import PageTitle from '@/components/ui/PageTitle';
import TeamMembersTable from '@/features/TeamMembers/TeamMembersTable';
import ViewTeamMember from '@/features/TeamMembers/ViewTeamMember';
import Button from '@/components/ui/Button';
import { PermissionAccess, SecurePageByPackage } from '@/middleware/PermissionAccess';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function TeamMembers() {
    const searchParams = useSearchParams()
    const memberId = searchParams.get('memberId');
    const router = useRouter()

    const handleNavigate = () => {
        router.push(`/team-members/create-member`)
    }

    return (
        <div className='min-h-screen container-full'>
            <div className='flex flex-row justify-between gap-5 py-2 ' >
                <PageTitle title="Team Members" />
                <PermissionAccess requiredPermissions={["create_member"]}>
                    <div className='md:block hidden'>
                        <Button onClick={handleNavigate} btnType='secondary' >Create Team Member</Button>
                    </div>
                    <div className='block md:hidden'>
                        <AddCircleOutlineIcon className='transform scale-125' onClick={handleNavigate} />
                    </div>
                </PermissionAccess>
            </div>
            <TeamMembersTable />
            <ViewTeamMember memberId={memberId} key={memberId} />
        </div>
    );
}

export default SecurePageByPackage(TeamMembers, ["view_member"])
