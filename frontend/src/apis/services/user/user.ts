import instance from '../../utils/axiosInstance';

const authUrl = 'api/v1/auth';
export const userLogin = async (params: { id: string; password: string }) => {
  const response = await instance.post(`${authUrl}/login`, params);
  return response.data;
};

const userUrl = 'api/v1/users';
export const userJoin = async (params: { id: string; name: string; password: string; department?: string; position?: string }) => {
  const response = await instance.post(`${userUrl}`, params);
  return response.data;
};

// export const getUserInfo = async (params: { id: string }) => {
//   const response = await instance.get(`${userUrl}/me`, params);
//   return response;
// };
