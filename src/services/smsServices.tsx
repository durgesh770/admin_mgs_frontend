import fetcher from "../helper/fetcher";

const sendSMS = (body: any) => {
  return fetcher.post(`/message/sendMsg`, body).then((response) => {
    return response.data;
  });
};

const getSMS = (params: any) => {
  return fetcher
    .get(`/message/receiveMsg?customerId=${params}`)
    .then((response) => {
      return response.data;
    });
};

export const SMSService = {
  getSMS,
  sendSMS,
};
