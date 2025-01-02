"use client";
import Modal from "@/components/ui/Modal";
import { Grid } from "@mui/material";
// mui
import { useState } from "react";
import ButtonCom from "../../Button/index";
import Divider from "@mui/material/Divider";
import EditCreateInputs from "../EditCreateInputs/EditCreateInputs";
import PopUpHeader from "../../PopUpHeader/PopUpHeader";
import { useUpdateCustomer } from "@/hooks/Customer";

interface editdetailsProps {
  data: any;
}

const EditDetails = ({ data }: editdetailsProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFromData] = useState({
    name: data?.name,
    phone: data?.telephone,
    email: data?.email,
    address: data?.address,
    RefId: data?.referenceId,
    dob: data?.dob,
  });
  const { submit, loading } = useUpdateCustomer(data?.id, formData);

  return (
    <>
      <Modal customOpen={open} customClose={setOpen} target={<span>Edit</span>}>
        <div className="px-3 py-2">
          <PopUpHeader
            handleChangeOpen={()=>setOpen(false)}
            title={"Edit Customers"}
          />
          <Divider />
          <div className="max-h-[80vh] xl:w-[32vw] overflow-y-auto  ">
            <EditCreateInputs setFromData={setFromData} formData={formData} />

            <Divider />
            <Grid
              className="mt-4 "
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid>
                <ButtonCom
                  loading={!loading}
                  btnType={"secondary"}
                  onClick={submit}
                >
                  Save
                </ButtonCom>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditDetails;
