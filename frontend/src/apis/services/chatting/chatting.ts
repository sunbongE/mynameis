import { instance, loginInstance } from '../../utils/axiosInstance';

const chatUrl = 'history';
export const getMessages = async (chatNumber: number) => {
  const response = await loginInstance.get(`${chatUrl}/room?cnt=${chatNumber}`);
  return response.data;
};
