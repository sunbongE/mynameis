import { loginInstance } from '../../utils/axiosInstance';

const authUrl = 'couple';

export const getCoupleRoomToken = async (params: { coupleId: number }) => {
  console.log('axios 통신 ', params);
  const response = await loginInstance.get(`${authUrl}/video`, { params });

  console.log('axios 통신 결과', response);
  return response.data;
};

export const getCoupleBreakUp = async (params: {token: string}) => {
  console.log('헤어지기 로직 들어가기전에',params)
  const response = await loginInstance.delete(`${authUrl}/break-up`, { params });
  return response.data;
}
