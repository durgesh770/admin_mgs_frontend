import fetcher from "@/helper/fetcher";

const getReferral = () => {
  return fetcher.get(`/referral/`).then((response) => {
    return response.data;
  });
};

const ApproveReferral = (referralId: string) => {
  return fetcher.post(`/referral/approve/${referralId}`).then((response) => {
    return response.data;
  });
};

const RejectReferral = (referralId: string) => {
  return fetcher.post(`referral/reject/${referralId}`).then((response) => {
    return response.data;
  });
};

const CreateReferral = (formateData: {}) => {
  return fetcher.post(`/referral/`, formateData).then((response) => {
    return response.data;
  });
};

const updateReferral = (customerId: string, formateData: {}) => {
  return fetcher
    .put(`/referral/${customerId}`, formateData)
    .then((response) => {
      return response.data;
    });
};

const DeleteReferral = (customerId: string) => {
  return fetcher.delete(`/referral/${customerId}`).then((response) => {
    return response.data;
  });
};

export const Referral = {
  getReferral,
  ApproveReferral,
  RejectReferral,
  CreateReferral,
  DeleteReferral,
  updateReferral,
};
