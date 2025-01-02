import fetcher from "@/helper/fetcher";

const getAllTimeTracker = (params: any) => {
  return fetcher.get(`/accounts/time-tracker`, { params }).then((response) => {
    return response.data;
  });
};

const createTimeTracker = (formateData = {}) => {
  return fetcher
    .post(`/accounts/time-tracker`, formateData)
    .then((response) => {
      return response.data;
    });
};

const UpdateStatusTimeTracker = (id: string, body = {}) => {
  return fetcher
    .put(`/accounts/time-tracker/update-status/${id}`, body)
    .then((response) => {
      return response.data;
    });
};

const UpdateInsideDataTimeTracker = (trackerId: string, body = {}) => {
  return fetcher
    .put(`/accounts/time-tracker/update-time-tracker/${trackerId}`, body)
    .then((response) => {
      return response.data;
    });
};

const deleteTimeTracker = (id: string) => {
  return fetcher
    .delete(`/accounts/time-tracker/delete-time-tracker/${id}`)
    .then((response) => {
      return response.data;
    });
};

const deleteInsideTimeTracker = (trackerId: string, entryId: string) => {
  return fetcher
    .delete(`/accounts/time-tracker/delete-entry/${trackerId}/${entryId}`)
    .then((response) => {
      return response.data;
    });
};

const getTotalAmount = (params: any) => {
  return fetcher
    .get(`/accounts/time-tracker/total-amount`, { params })
    .then((response) => {
      return response.data;
    });
};

const getTodayAppointment = (teamMemberId: string) => {
  return fetcher
    .get(`/appointment/today-appointments/${teamMemberId}`)
    .then((response) => {
      return response.data;
    });
};

const updateInsideTimeTracker = (
  trackerId: string,
  entryId: string,
  body = {}
) => {
  return fetcher
    .put(`/accounts/time-tracker/update-entry/${trackerId}/${entryId}`, body)
    .then((response) => {
      return response.data;
    });
};



export const TimeTracker = {
  getAllTimeTracker,
  createTimeTracker,
  UpdateStatusTimeTracker,
  getTotalAmount,
  deleteTimeTracker,
  deleteInsideTimeTracker,
  UpdateInsideDataTimeTracker,
  updateInsideTimeTracker,
  getTodayAppointment,
};
