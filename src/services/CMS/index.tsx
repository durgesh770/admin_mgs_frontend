import fetcher from "@/helper/fetcher";

const getCMS = () => {
  return fetcher.get(`/cms`).then((response) => {
    return response.data;
  });
};

const manageCMS = (body = {}) => {
  return fetcher.put(`/cms/manage-cms`, body).then((response) => {
    return response.data;
  });
};

const deleteCMS = () => {
  return fetcher.delete(`/cms/delete-cms`).then((response) => {
    return response.data;
  });
};

export const CMSServices = {
  getCMS,
  manageCMS,
  deleteCMS,
};
