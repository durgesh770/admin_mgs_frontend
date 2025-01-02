import fetcher from "@/helper/fetcher";

const TopCustomers = (params: any) => {
  return fetcher
    .get(`/reports/top-customers?limit=5`, { params })
    .then((response) => {
      return response.data;
    });
};

const TopMembers = (params: any) => {
  return fetcher
    .get(`/reports/top-members?limit=5`, { params })
    .then((response) => {
      return response.data;
    });
};

const GrossingServices = (params: any) => {
  return fetcher
    .get(`/reports/gross-service?limit=5`, { params })
    .then((response) => {
      return response.data;
    });
};

const TopPopularServices = (params: any) => {
  return fetcher
    .get(`/reports/top-selling-service?limit=5`, { params })
    .then((response) => {
      return response.data;
    });
};

const LowServices = (params: any) => {
  return fetcher
    .get(`/reports/low-selling-service?limit=5`, { params })
    .then((response) => {
      return response.data;
    });
};

const MostBookableTimeslots = (params: any) => {
  return fetcher
    .get(`/reports/most-bookable-timeslots?limit=5`, { params })
    .then((response) => {
      return response.data;
    });
};

const MostBookableDays = (params: any) => {
  return fetcher
    .get(`/reports/most-bookable-days?limit=2`, { params })
    .then((response) => {
      return response.data;
    });
};

// income-vs-expense
const getExpenseRevenue = (params:any) => {
  return fetcher.get(`/accounts/income-vs-expense`, { params }).then((response) => {
    return response.data;
  });
};
const getExpenseRevenueChart = (params:any) => {
  return fetcher.get(`/accounts/income-vs-expense/charts`, { params }).then((response) => {
    return response.data;
  });
};

const getProfitLossExpenseRevenue = (params: any) => {
  return fetcher
    .get(`/accounts/income-vs-expense/profit-lost`, { params })
    .then((response) => {
      return response.data;
    });
};

export const Reports = {
  TopCustomers,
  TopMembers,
  GrossingServices,
  TopPopularServices,
  LowServices,
  MostBookableTimeslots,
  MostBookableDays,
  getProfitLossExpenseRevenue,
  getExpenseRevenue,
  getExpenseRevenueChart
};
