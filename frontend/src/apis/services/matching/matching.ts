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

export const matchingEnter = async (params: { roomId: string }) => {
  const response = await loginInstance.post(`${matchingUrl}/enter`, params);
  return response;
};

export const matchingExit = async (params: { roomId: string | undefined }) => {
  const response = await loginInstance.post(`${matchingUrl}/exit`, params);
  return response;
};

const coupleUrl = 'couple';

export const createCouple = async () => {
  const response = await loginInstance.post(`${coupleUrl}/create`);
  return response;
};

export const acceptCouple = async (params: { coupleId: number; answer: boolean }) => {
  const response = await loginInstance.post(`${coupleUrl}/accept`, params);
  return response;
};
