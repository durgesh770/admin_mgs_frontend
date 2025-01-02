// react import
import React, { useEffect, useState } from "react";

//mui
import { Grid, Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//component
import Modal from "@/components/ui/Modal";
import ButtonCom from "@/components/ui/Button";
import { updateMember } from "@/hooks/TeamMembers";
import DropDownSelect from "@/components/ui/DropDownSelect";

// utils
import { getQueryFromUrl } from "@/utils/tools";
import { useSnackbar } from "@/context/GlobalContext";
import SideLabelInput from "@/components/ui/Input/SideLabelInput";

// interface for props
interface EditRoleProps {
  defaultRole?: {
    title: string;
    roleId: string;
  };
  target?: React.ReactNode;
  open: boolean;
  setOpen: any;
  title: string;
  user: any;
}

interface QueryResult {
  memberId?: string;
}

const EditJobCompensation: React.FC<EditRoleProps> = ({
  defaultRole,
  target,
  setOpen,
  open,
  title,
  user,
}) => {
  const queryResult: QueryResult = getQueryFromUrl();
  const memberId = queryResult?.memberId || "";

  //integration
  const handleUpdateMember = updateMember(memberId);
  const alert = useSnackbar();

  const [select, setSelect] = useState("none");
  const existingData = user?.wages;
  
  // drop down
  const [form, setForm] = useState({
    jobId: title,
    wages: existingData,
  });

  useEffect(() => {
    if(select != "none"){
      setForm((pre) => ({
        ...pre,
        jobId: select,
      }));
    }
  }, [select]);

  // Sample data to pass to the DropDownSelect component
  const dropdownData = {
    placeHolder: title,
    data: [
      {
        title: "Team Member",
        id: "team-member",
      },
      {
        title: "Technician",
        id: "technician",
      },
    ],
  };

  // remove if title matched with dropdownData data title
  dropdownData.data = dropdownData.data.filter((item) => item.title !== title);

  console.log("form  =======>>>>>>>", form)

  const handleUpadate = () => {
    if (!form.jobId.trim()) {
      alert.SnackbarHandler(true, "error", "Primary Job Required");
    } else if (form.jobId == "none") {
      alert.SnackbarHandler(true, "error", "Primary Job Required");
    } else if(form.wages < 0 ) {
      alert.SnackbarHandler(true, "error", "Wage should not be nagative");
    }else{
      handleUpdateMember.submit(form);
    }
  };

  return (
    <>
      <Modal customOpen={open} customClose={setOpen} target={target}>
        <div className="flex py-4 items-center">
          <div className="float-left">
            <Button onClick={()=>setOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
          <div className="flex-grow text-center">
            <span className="font-bold text-md sm:text-xl">
              Edit Job and Compensation
            </span>
          </div>
        </div>
        <Divider />
        <div className="max-h-[50vh] overflow-y-auto">

        <div className="mx-4 my-8">
          <div className="block sm:border sm:border-gray-200 sm:flex">
            <span
              style={{ width: "240px" }}
              className={`inline-flex items-center sm:pl-2 pl-2 text-md text-black font-bold sm:bg-[--brand-pastel-color] sm:border sm:border-gray-200 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600`}
            >
              Primary Job
            </span>
            <DropDownSelect
              data={dropdownData}
              setData={setSelect}
              value={select}
              resetData={[]}
            />
          </div>
        </div>

        <div className="mx-4 my-8">
          <SideLabelInput
            label="Wages per hour"
            placeholder="wages"
            type="number"
            value={form.wages}
            handleChange={(e: any) =>
              setForm((pre) => ({ ...pre, wages: parseInt(e.target.value) }))
            }
          />
        </div>
        <Divider />
        <Grid className="px-2 py-4 StaffMemberCss">
          <Grid>
            <ButtonCom
              loading={handleUpdateMember.loading}
              onClick={() => {
                handleUpadate();
              }}
              btnType={"secondary"}
            >
              Save
            </ButtonCom>
          </Grid>
        </Grid>
        </div>
      </Modal>
    </>
  );
};

export default EditJobCompensation;
