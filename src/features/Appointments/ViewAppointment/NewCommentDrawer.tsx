// react
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Textarea } from "flowbite-react";
// component
import Button from "@/components/ui/Button";
import SideDrawer from "@/components/ui/SideDrawer";
// hooks
import {
  getAppointmentById,
  useCreateChangeRequest,
} from "@/hooks/Appointment";
// moment
import moment from "moment";

const NewCommentDrawer = ({ drawerOpen, setDrawerOpen }: any) => {
  const [value, setValue] = useState("");

  const { id } = useParams();
  const singleAppointment = getAppointmentById(id) as any;
  const { handleSubmitComment, loading } = useCreateChangeRequest(id, {
    comment: value,
  });

  return (
    <>
      <SideDrawer
        headerHidden={true}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Reschedule Request"
      >
        <div className="px-6 py-4 sm:px-11">
          <p className="text-xl font-bold">Comments</p>

          {singleAppointment.data?.reschedule?.comments.map(
            (item: any, index: number) => {
              return (
                <p className="py-2" key={index}>
                  <span>{moment(item.date).format("DD MMM YYYY ")}</span>
                  <br />
                  <span>{item.comment}</span>
                </p>
              );
            }
          )}

          <div className="py-4">
            <span className="text-lg font-bold ">New Comments</span>
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={5}
            />
          </div>

          <div className="my-4 text-center ">
            <Button
              loading={loading}
              onClick={handleSubmitComment}
              btnType={value ? "secondary" : "disabled"}
              className="text-xs "
            >
              Submit
            </Button>
          </div>
        </div>
      </SideDrawer>
    </>
  );
};

export default NewCommentDrawer;
