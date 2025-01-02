//hooks
import { getRoles } from '@/hooks/Role'
import SelectRole from '@/components/ui/TeamMember/SelectRole';

function SelectRoleFeature({ setRole, defaultRole }) {
    const data = getRoles({});
    const roles = data.data;

    return (
        <>
            <SelectRole roles={roles} setRole={setRole} defaultRole={defaultRole} />
        </>
    )
}

export default SelectRoleFeature