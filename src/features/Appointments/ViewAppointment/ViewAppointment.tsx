"use client";
// react
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// moment
import moment from "moment";

//component
import { Textarea } from "flowbite-react";
import ViewHeaderUI from "@/components/ui/Appointments/ViewAppointment/ViewHeaderUI";
import PageTitle from "@/components/ui/PageTitle";
import SideDrawer from "@/components/ui/SideDrawer";
import Button from "@/components/ui/Button";
import ViewPatientNotefeature from "./ViewPatientNotefeature";
import ConfirmAppointment from "../ConfirmAppointment/ConfirmAppointment";
import WarningModal from "@/components/ui/Modal/Warning";
import CollectPaymentModal from "../AppointmentsPopup/CollectPayment";
import PaymentDetails from "@/components/ui/Appointments/confirmAppointment/PaymentDetails";
import Tab from "@/components/ui/Tabs/Tab";

// mui
import GridViewIcon from "@mui/icons-material/GridView";
import { Description } from "@mui/icons-material";
import { Appointment } from "@/interface/Appointment";

// hooks
import {
  appointmentActionOptions,
  formatAppointmentIntoConfirmAppointmentHook,
} from "@/hooks/Appointment/hooks";
import { useActionHooks } from "@/hooks/Appointment/ActionHooks";
// utils
import { chips, formatTime, getQueryFromUrl } from "@/utils/tools";

// context
import { useAuth } from "@/context/AuthContext";

// middleware
import { PermissionAccess } from "@/middleware/PermissionAccess";
import NewCommentDrawer from "./NewCommentDrawer";
import { useTimeTracker } from "@/context/TimeTrackerContext";

const ViewAppointment = ({ data }: { data: Appointment }) => {
  const state: any = getQueryFromUrl();
  const currenttab: number = state.notes ? 1 : 0;
  const [drawerOpen, setDrawerOpen] = useState(state.reschedule_request);
  const [activeTab, setActiveTab] = useState(currenttab);
  const { setIsDrawerOpen, setSelect, select } = useTimeTracker();

  const tabs = [
    { label: "View", icon: <GridViewIcon /> },
    { label: "Patient Notes", icon: <Description /> },
  ];
  const { permissions } = useAuth();

  // Function to handle tab change
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const {
    collectPayment,
    setCollectPayment,
    dynamicModal,
    handleModalClose,
    handleConfirmbtn,
    handleRightbtn,
    handleActionClick,
  } = useActionHooks({ appointments: [data] });

  return (
    <>
      <div className=" bg-white border border-[--brand-light-gray-color] m-auto lg:w-[60vw] min-h-screen p-4 ">
        <div className="flex justify-center my-4">
          <PageTitle title={"View Appointment"} />
        </div>
        <div className="bg-white" onClick={()=>setSelect(data?.customerId.id)} >
          <ViewHeaderUI
            client={{
              name: data?.customerId.name,
            }}
            appointment={{
              date: moment(data?.date).format("DD MMM YYYY"),
              start_time: formatTime(data?.start_time_range),
              status: chips(data, data?.date),
            }}
            payment={{
              status: data?.paymentId.paymentStatus,
            }}
            options={appointmentActionOptions(
              data?.status,
              data?.paymentId?.paymentStatus == "pending",
              data?.notes.data.length > 0,
              permissions,
              data,
              true
            )}
            handleOptions={(option: any) =>
              handleActionClick(
                data.id,
                option,
                data.paymentId.id,
                setIsDrawerOpen
              )
            }
            timestamp={moment(data.createdAt).format("DD MMM YYYY h:mm a")}
          />
        </div>
        <div className="py-4">
          <Tab value={activeTab} setValue={handleTabChange} tabs={tabs} />
        </div>

        {activeTab == 0 && (
          <>
            <ConfirmAppointment
              {...formatAppointmentIntoConfirmAppointmentHook(data)}
            />

            <PermissionAccess requiredPermissions={["view_payments"]}>
              <PaymentDetails data={data} />
            </PermissionAccess>
          </>
        )}
        {activeTab == 1 && (
          <ViewPatientNotefeature customerId={data?.customerId.id} />
        )}

        {/* Action Modal  */}
        {dynamicModal.open && (
          <WarningModal
            open={dynamicModal.open}
            updateOpen={handleModalClose}
            title={dynamicModal.title}
            handleLeftbtn={handleConfirmbtn}
            btnfirst={dynamicModal.btnfirst}
            btnSec={dynamicModal.btnsec}
            handleRightbtn={handleRightbtn}
          />
        )}

        {collectPayment.open && (
          <CollectPaymentModal
            open={collectPayment.open}
            setOpen={() =>
              setCollectPayment((old) => ({ ...old, open: false }))
            }
            customerId={collectPayment.customerId}
            appointmentId={collectPayment.appointmentId}
            amount={collectPayment.amount}
            appointmentData={collectPayment.appointmentData}
          />
        )}

        <NewCommentDrawer
          setDrawerOpen={setDrawerOpen}
          drawerOpen={drawerOpen}
        />
      </div>
    </>
  );
};

export default ViewAppointment;
