import fetcher from "@/helper/fetcher";
import moment from "moment";


const getAllLeaveRequests = () => {
  return fetcher.get(`/leave-request`, {}).then((response) => {
    return response.data;
  });
};

const RejectLeaveRequests = (id: string, adminComment: any) => {
  return fetcher
    .post(`/leave-request/reject/${id}`, { adminComment })
    .then((response) => {
      return response.data;
    });
};

const ApprovedLeaveRequests = (id: string) => {
  return fetcher.post(`/leave-request/approve/${id}`, {}).then((response) => {
    return response.data;
  });
};

const createLeaveRequest = (body: any) => {
  let newData = { ...body };
  newData['dates'] = newData['dates'].map((date) => moment(date).format("YYYY-MM-DD"))

  return fetcher.post(`/leave-request`, newData).then((response) => {
    return response.data;
  });
};

const updateLeaveRequest = (id: string, body: any) => {
  let newData = { ...body };
  newData['dates'] = newData['dates'].map((date) => moment(date).format("YYYY-MM-DD"))

  return fetcher.put(`/leave-request/${id}`, newData).then((response) => {
    return response.data;
  });
};

const DeleteLeaveRequest = (id: string) => {
  return fetcher.delete(`/leave-request/${id}`).then((response) => {
    return response.data;
  });
};

const LeaveDatesbyTeamMember = (teamMemberId: string) => {
  return fetcher
    .get(`/leave-request/dates/${teamMemberId}`)
    .then((response) => {
      return response.data;
    });
};

export const LeaveRequest = {
  getAllLeaveRequests,
  RejectLeaveRequests,
  ApprovedLeaveRequests,
  createLeaveRequest,
  DeleteLeaveRequest,
  updateLeaveRequest,
  LeaveDatesbyTeamMember,
};
