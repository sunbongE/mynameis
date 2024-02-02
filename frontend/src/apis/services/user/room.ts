import instance from '../../utils/axiosInstance';

const authUrl = 'couple';
export const getCoupleRoomToken = async (params: { coupleId: number }) => {
  const response = await instance.post(`${authUrl}/login`, params);
  return response.data;
};
