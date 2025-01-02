"use";
import React, { useState } from "react";
import { Textarea } from "flowbite-react";
import SideDrawer from "@/components/ui/SideDrawer";
import Button from "@/components/ui/Button";
import { useSnackbar } from "@/context/GlobalContext";
import { useRejectLeaveRequests } from "@/hooks/LeaveCalender/LeaveRequest";

//component
interface ShowDatesModalprops {
  commentAdmin: boolean;
  setCommentAdmin: any;
  currentbtn: any;
}

const AddAdminComments = ({
  commentAdmin,
  setCommentAdmin,
  currentbtn,
}: ShowDatesModalprops) => {
  const { handleRejectLeave, loading } = useRejectLeaveRequests();
  const [comment, setComment] = useState("");
  const alert = useSnackbar();

  const handleAddComment = () => {
    if (!comment.trim()) {
      alert.SnackbarHandler(true, "error", "Add Comment");
    } else {
      handleRejectLeave(currentbtn.id, comment);
    }
  };

  return (
    <>
      <SideDrawer
        open={commentAdmin}
        onClose={() => setCommentAdmin(false)}
        headerHidden={true}
        title={"Add Admin Comment"}
      >
        <div className="pt-7 text-center font-semibold pb-9 px-4 ">
          <Textarea
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            onClick={handleAddComment}
            loading={loading}
            btnType="secondary"
            className="mt-6"
          >
            Reject
          </Button>
        </div>
      </SideDrawer>
    </>
  );
};
export default AddAdminComments;
