// component
import PersonalInfo from "@/components/ui/TeamMember/Personalnfo";
import Permission from "@/components/ui/TeamMember/Permissions";
import StaffMemberHoursComponent from "@/components/ui/TeamMember/StaffMemberHours";
import React from "react";
import JobInfoCard from "@/components/ui/TeamMember/JobInfoCard/JobInfoCard"

//hooks
import { useAuth } from "@/context/AuthContext";
import ServicesProvided from "@/features/MyProfile/ServicesProvided";

const MyProfile = () => {
  // state
  const { user } = useAuth();
  return (
    <>
      <div className="relative px-3 mb-6">
        <PersonalInfo data={user} />
        <Permission data={user} role={user.role} memberId={user.id} />

        <JobInfoCard user={user}/>
        <ServicesProvided user={user} />
        <StaffMemberHoursComponent user={user} />

      </div>
    </>
  );
};
export default MyProfile;
