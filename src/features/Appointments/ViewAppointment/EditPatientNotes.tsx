import AddCommntsUI from "@/components/ui/Appointments/ViewAppointment/EditCommntsUI";
import SideDrawer from "@/components/ui/SideDrawer";
import { addAllNotes } from "@/hooks/Appointment";
import { useRouter } from "next/navigation";
import React from "react";

const EditPatientNotes = ({
  formData,
  appointment,
  setFormData,
  drawerOpen,
  setDrawerOpen,
}: any) => {
  const { submit, loading, setLoading } = addAllNotes();
  // formate data to send api
  const router = useRouter();
  let inputdata = {
    description: formData.customerComment,
    adminDescription: formData.adminComment,
    data: [
      {
        title: "area-tested",
        desc: formData.areaTested,
      },
      {
        title: "spot-size",
        desc: formData.spotSize,
      },
      {
        title: "energy-pluse",
        desc: formData.energyPulse,
      },
      {
        title: "offpluse",
        desc: formData.numOfPulse,
      },
      {
        title: "dcd",
        desc: formData.dcdSprayDelay,
      },
    ],
  };

  // handle change
  const handleInputChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // handle save
  const handleSave = async () => {
    const result = await submit(appointment, inputdata).finally(() => {
      setLoading(false);

    });
    if (result?.success) {
      window.location.reload()
    }
  };

  return (
    <>
      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Edit Comment`}
        headerHidden={true}
      >
        <AddCommntsUI
          formData={formData}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          loading={loading}
        />
      </SideDrawer>
    </>
  );
};

export default EditPatientNotes;
