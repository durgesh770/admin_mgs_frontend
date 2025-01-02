import fetcher from "@/helper/fetcher";

const GetBookingRevenue = (params: any) => {
  return fetcher
    .get(`/accounts/revenue/booking-revenue`, { params })
    .then((response) => {
      return response.data;
    });
};

const GetTotalRevenue = () => {
  return fetcher.get(`/accounts/revenue/total-revenue`).then((response) => {
    return response.data;
  });
};

const GetOtherRevenue = (params: any) => {
  return fetcher
    .get(`/accounts/revenue/other-revenue`, { params })
    .then((response) => {
      return response.data;
    });
};

const DeleteRevenue = (revenueId: string, entryId: string) => {
  return fetcher
    .delete(`/accounts/revenue/delete-entry/${revenueId}/${entryId}`)
    .then((response) => {
      return response.data;
    });
};

const createOtherRevenue = (form = {}) => {
  return fetcher.post(`/accounts/revenue`, form).then((response) => {
    return response.data;
  });
};

const updateOtherRevenue = (revenueId: string, entryId: string, form = {}) => {
  return fetcher
    .put(`/accounts/revenue/update-entry/${revenueId}/${entryId}`, form)
    .then((response) => {
      return response.data;
    });
};

/// expense api
const GetBookingExpense = (params: any) => {
  return fetcher
    .get(`/accounts/expense/booking-expense`, { params })
    .then((response) => {
      return response.data;
    });
};

const GetTotalExpense = () => {
  return fetcher.get(`/accounts/expense/total-expense`).then((response) => {
    return response.data;
  });
};

const GetOtherExpense = () => {
  return fetcher.get(`/accounts/expense/other-expense`).then((response) => {
    return response.data;
  });
};

const createOtherExpense = (form = {}) => {
  return fetcher.post(`/accounts/expense`, form).then((response) => {
    return response.data;
  });
};

const updateOtherExpense = (revenueId: string, entryId: string, form = {}) => {
  return fetcher
    .put(`/accounts/expense/update-entry/${revenueId}/${entryId}`, form)
    .then((response) => {
      return response.data;
    });
};

const DeleteExpense = (revenueId: string, entryId: string) => {
  return fetcher
    .delete(`/accounts/expense/delete-entry/${revenueId}/${entryId}`)
    .then((response) => {
      return response.data;
    });
};

const getRevenueChart = (params: any) => {
  return fetcher
    .get(`/accounts/revenue/reports?type=booking`, { params })
    .then((response) => {
      return response.data;
    });
};

const getOtherRevenueChart = (params: any) => {
  return fetcher
    .get(`/accounts/revenue/reports?type=other`, { params })
    .then((response) => {
      return response.data;
    });
};

const getExpenseChart = (params: any) => {
  return fetcher
    .get(`/accounts/expense/reports?type=booking`, { params })
    .then((response) => {
      return response.data;
    });
};

const getOtherExpenseChart = (params: any) => {
  return fetcher
    .get(`/accounts/expense/reports?type=other`, { params })
    .then((response) => {
      return response.data;
    });
};

export const Revenue = {
  GetBookingRevenue,
  GetTotalRevenue,
  GetOtherRevenue,
  DeleteRevenue,
  createOtherRevenue,
  updateOtherRevenue,
  GetBookingExpense,
  GetTotalExpense,
  createOtherExpense,
  updateOtherExpense,
  DeleteExpense,
  GetOtherExpense,
  getRevenueChart,
  getOtherRevenueChart,
  getExpenseChart,
  getOtherExpenseChart,
};
