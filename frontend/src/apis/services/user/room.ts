import { loginInstance } from '../../utils/axiosInstance';

const authUrl = 'couple';

export const getCoupleRoomToken = async (params: { coupleId: number }) => {
  console.log('axios 통신 ', params);
  // instance.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('accessToken')}`;
  // instance.defaults.headers.common['Content-Type'] = 'application/json';
  const response = await loginInstance.get(`${authUrl}/video`, { params });

  console.log('axios 통신 결과', response);
  return response.data;
};
