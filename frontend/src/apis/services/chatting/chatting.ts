import { instance, loginInstance } from '../../utils/axiosInstance';

const chatUrl = '/history';
const coupleUrl = '/couple';
export const getMessages = async (chatNumber: number) => {
  const response = await loginInstance.get(`${chatUrl}/room?cnt=${chatNumber}`);
  return response.data;
};

export const getCoupleName = async () => {
  const response = await loginInstance.get(`${coupleUrl}/info`);
  return response.data;
};
