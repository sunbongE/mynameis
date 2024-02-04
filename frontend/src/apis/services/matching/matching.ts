import { loginInstance } from '../../utils/axiosInstance';

const matchingUrl = 'matching';

export const matchingStart = async () => {
  const response = await loginInstance.post(`${matchingUrl}/join`);
  return response;
};

export const matchingCancel = async () => {
  const response = await loginInstance.post(`${matchingUrl}/cancle`);
  return response;
};
