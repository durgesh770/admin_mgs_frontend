// react
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// component
import DynamicTable from "@/components/ui/Table";
import { formatTime } from "@/utils/tools";
// mui
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
// hook
import { getPatientNotes } from "@/hooks/Appointment";
//component
import EditPatientNotes from "./EditPatientNotes";
import ViewNotesComments from "@/components/ui/Appointments/ViewAppointment/ViewNotesComment";
import moment from "moment";

interface TableRow {
  [key: string]: string | TableCell;
}

interface TableCell {
  type: "string" | "custom";
  bold?: boolean;
  value: string | JSX.Element;
}

// Component for consistent view button
const ViewButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) => (
  <button className="text-blue-600" onClick={onClick}>
    {text}
  </button>
);

const ViewPatientNotefeature = ({ customerId }: any) => {
  const { id } = useParams();
  const { data, getloading } = getPatientNotes({ customerId: customerId });

  const [rows, setRows] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appointment, setAppointment] = useState();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({ text: "", item: "" });
  const [formData, setFormData] = useState({
    areaTested: "",
    spotSize: "",
    energyPulse: "",
    numOfPulse: "",
    dcdSprayDelay: "",
    adminComment: "",
    customerComment: "",
  });

  const defaultData = [
    { title: "area-tested", desc: "-" },
    { title: "spot-size", desc: "-" },
    { title: "energy-pluse", desc: "-" },
    { title: "offpluse", desc: "-" },
    { title: "dcd", desc: "-" },
  ];

  // handle comments when user clicks to view
  const handleCommentView = (item: string, text: string) => {
    setComment({ item: item, text: text });
    setOpen(true);
  };

  // handle submit in side drawer
  const handleData = (item: any) => {
    setDrawerOpen(true);
    const data = item.data.reduce((acc: any, it: any) => {
      acc[it.title] = it.desc;
      return acc;
    }, {});
    setFormData({
      areaTested: data["area-tested"],
      spotSize: data["spot-size"],
      energyPulse: data["energy-pluse"],
      numOfPulse: data["offpluse"],
      dcdSprayDelay: data["dcd"],
      adminComment: item.adminDescription,
      customerComment: item.description,
    });
    setAppointment(item.appointmentId);
  };

  // custom logic
  useEffect(() => {
    if (!getloading) {
      const rowsData = Array.from(data.results).findIndex(
        (item: any) => item.appointmentId == id
      );
      setRows([rowsData]);
    }
  }, [data]);

  // handle format data for table
  let tableFormat: TableRow[] = data.results.map(
    (item: any, index: number) => ({
      "#": { type: "custom", bold: false, value: `${index + 1}` },
      "Start Date": {
        type: "string",
        value: (
          <div>
            <span>{moment(item.date).format("DD MMM YYYY") || "-"}</span>
            <span> {formatTime(item.start_time) || "-"}</span>
          </div>
        ),
      },
      ...(item.data && item.data.length > 0 ? item.data : defaultData).reduce(
        (acc: TableRow, dataItem: any) => {
          acc[dataItem.title] = {
            type: "string",
            value: (
              <div style={{ whiteSpace: "pre-line" }}>{dataItem.desc}</div>
            ),
          };
          return acc;
        },
        {}
      ),
      "Admin Comments": {
        type: "string",
        value: (
          <ViewButton
            onClick={() =>
              handleCommentView(item.adminDescription, "Admin Comment")
            }
            text="view"
          />
        ),
      },
      "Customer Comments": {
        type: "string",
        value: (
          <ViewButton
            onClick={() =>
              handleCommentView(item.description, "Customer Comment")
            }
            text="view"
          />
        ),
      },
      action: {
        type: "string",
        value: (
          <span className="cursor-pointer" onClick={() => handleData(item)}>
            <ModeEditOutlineTwoToneIcon />
          </span>
        ),
      },
    })
  );

  return (
    <>
      {rows.length > 0 && (
        <DynamicTable
          columns={[
            "#",
            "Appointment Date",
            "Area Tested",
            "Spot Size(mm)",
            "Energy/Pulse Width(J/cm2 & ms)",
            "# of Pulses",
            "DCD Spray/Delay",
            "Admin Comments",
            "Customer Comments",
            "Action",
          ]}
          data={tableFormat}
          defaultRowSelected={rows}
        />
      )}

      <EditPatientNotes
        formData={formData}
        drawerOpen={drawerOpen}
        appointment={appointment}
        setDrawerOpen={setDrawerOpen}
        setFormData={setFormData}
      />

      <ViewNotesComments comment={comment} open={open} setOpen={setOpen} />
    </>
  );
};

export default ViewPatientNotefeature;
