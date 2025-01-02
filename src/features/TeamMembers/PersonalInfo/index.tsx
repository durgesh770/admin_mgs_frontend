// component
import PersonalInfoCard from "@/components/ui/TeamMember/Personalnfo";
import { TeamMembers } from "@/interface/TeamMembers";

const index = ({ user }: { user: TeamMembers }) => {
  return (
    <>
      {/*personal information card  */}

      <PersonalInfoCard
        data={{
          name: user.name,
          email: user.email,
          phone: user.telephone,
          id: user.id,
          teamMemberId: user.teamMemberId,
          color: user.color,
          active: user.active
        }}
      />
    </>
  );
};

export default index;
