"use client";
import IntakeFormUI from "@/components/ui/Customers/Intakeform/IntakeFormUI";
import PageTitle from "@/components/ui/PageTitle";
import { getBtnIntakeForm, getIntakeform } from "@/hooks/Customer";
import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "next/navigation";
import { Data } from "@/interface/Customer";
import Button from "@mui/material/Button";
import moment from "moment";

const IntakeForm = () => {
  const { id } = useParams();
  const { data } = getIntakeform(id);
  const {
    personal_details: personalDetails,
    form,
    edit_request_status,
  } = data as Data;

  const { handleReject, handleAccept } = getBtnIntakeForm(id);

  const Step1data = personalDetails
    ? [
        {
          title: "Name",
          name: personalDetails.name || "N/A",
        },
        {
          title: "Email Address",
          name: personalDetails.email || "N/A",
        },
        {
          title: "Age",
          name: personalDetails.age || "N/A",
        },
        {
          title: "Date of Birth",
          name: moment(personalDetails.dob).format("DD MMM YYYY") || "N/A",
        },
        {
          title: "Areas to be treated",
          name: personalDetails.areas || "N/A",
        },
      ]
    : [];

  return (
    <>
      <div className=" bg-white border border-[#BCBCBC]  p-5 w-fit  m-auto  min-h-screen">
        <Grid
          sx={{
            width: "46rem",
            margin: "auto",
            paddingBottom: "70px",
            "@media (max-width: 1060px)": {
              width: "100%",
            },
          }}
        >
          <div className="justify-between lg:flex lg:pb-8 block items-center">
            <PageTitle
              title={`Intake Form: ${
                personalDetails?.name ? personalDetails?.name : ""
              }`}
            />
            {edit_request_status == "change_request" && (
              <>
                <div>
                  <p className="pb-1">Edit Request</p>
                  <div className="flex justify-between items-center, gap-2">
                    <div>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={handleAccept}
                      >
                        ACCEPT
                      </Button>
                    </div>
                    <div>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={handleReject}
                      >
                        REJECT
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <IntakeFormUI Step1data={Step1data} Step2data={form} />
        </Grid>
      </div>
    </>
  );
};

export default IntakeForm;
