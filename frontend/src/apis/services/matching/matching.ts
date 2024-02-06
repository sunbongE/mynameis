import { instance, loginInstance } from '../../utils/axiosInstance';

const matchingUrl = 'matching';

export const matchingStart = async (params: { type: string }) => {
  const response = await loginInstance.post(`${matchingUrl}/join`, params);
  return response.data;
};

export const matchingCheck = async () => {
  const response = await loginInstance.get(`${matchingUrl}/check`);
  return response;
};

export const matchingCancel = async () => {
  const response = await loginInstance.post(`${matchingUrl}/cancle`);
  return response;
};

export const getBalanceGame = async () => {
  const response = await instance.get(`${matchingUrl}/questions`);
  return response;
};
