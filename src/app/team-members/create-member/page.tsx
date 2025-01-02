"use client";

// component
import CreateMember from "@/features/TeamMembers/create-member";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const page = () => {
  return (
    <>
      <CreateMember />
    </>
  );
};

export default SecurePageByPackage(page, ["create_member"]);
