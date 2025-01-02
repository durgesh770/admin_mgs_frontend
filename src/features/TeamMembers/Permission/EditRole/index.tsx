// react import
import React, { useState } from "react";

//component
import Modal from "@/components/ui/Modal";
import SelectRoleFeature from "../../SelectRole";
import { Grid, Button } from "@mui/material";
import ButtonCom from "@/components/ui/Button";
import { updateMember } from "@/hooks/TeamMembers";
import CloseIcon from "@mui/icons-material/Close";

// interface for props
interface EditRoleProps {
  defaultRole?: {
    title: string;
    roleId: string;
  };
  memberId: string;
}

const EditRole: React.FC<EditRoleProps> = ({ defaultRole, memberId }) => {
  //integration
  const handleUpdateMember = updateMember(memberId);

  const [formData, setFormData] = useState({
    role: defaultRole,
  });
  // state
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal customOpen={open} customClose={setOpen} target={<span>Edit</span>}>
        <Grid className="ModalbgCss">
          <div className="flex py-4 items-center">
            <div className="float-left">
              <Button onClick={()=>setOpen(false)}>
                <CloseIcon />
              </Button>
            </div>
            <div className="flex-grow text-center">
              <span className="font-bold text-xl">Permission set</span>
            </div>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="mx-4">
              <SelectRoleFeature
                defaultRole={defaultRole?.roleId}
                setRole={(role: Object) =>
                  setFormData((old: any) => ({ ...old, role }))
                }
              />
            </div>

            <Grid className="px-2 py-2 StaffMemberCss">
              <Grid>
                {/* <ButtonCom btnType='delete'>Delete</ButtonCom> */}
              </Grid>

              <Grid>
                <ButtonCom
                  loading={false}
                  onClick={() => handleUpdateMember.submit(formData)}
                  btnType={
                    formData?.role?.roleId != defaultRole?.roleId
                      ? "secondary"
                      : "disabled"
                  }
                >
                  Update
                </ButtonCom>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Modal>
    </>
  );
};

export default EditRole;
