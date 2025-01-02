"use client";
// react
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
// mui
import { Grid, Divider } from "@mui/material";
// component
import Modal from "@/components/ui/Modal";
import ButtonCom from "../../../components/ui/Button/index";
import EditCreateInputs from "@/components/ui/Customers/EditCreateInputs/EditCreateInputs";
import PopUpHeader from "@/components/ui/PopUpHeader/PopUpHeader";
// utils
import { removeQuery } from "@/utils/tools";
// hooks
import { CreateCustomer } from "@/hooks/Customer";

const CreateCustomers = ({ setOpen, open }: any) => {
  // hooks use
  const searchParams = useSearchParams();
  const router = useRouter();
  const newCustomer = searchParams.get("new_customer");
  // state
  const { formData, setFromData, submit, loader } = CreateCustomer();

  const handleChangeOpen = () => {
    setOpen(false);
    removeQuery(router, ["new_customer"]);
  };

  // handle query to  open
  useEffect(() => {
    if (newCustomer) setOpen(true);
  }, [newCustomer]);

  return (
    <Modal customOpen={open} customClose={handleChangeOpen}>
      <>
        <div className="p-3  ">
          <PopUpHeader
            handleChangeOpen={handleChangeOpen}
            title={"Create Customer"}
          />
          <Divider />
          <div className="max-h-[80vh] xl:w-[32vw] overflow-y-auto  ">
            <EditCreateInputs setFromData={setFromData} formData={formData} />

            <Divider />
            <Grid
              className="mt-4"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div>
                <ButtonCom
                  className="mb-2"
                  loading={!loader}
                  btnType={"secondary"}
                  onClick={submit}
                >
                  Save
                </ButtonCom>
              </div>
            </Grid>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default CreateCustomers;
