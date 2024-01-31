import instance from '../../utils/axiosInstance';

const authUrl = 'auth';

export const userLogin = async (params: { userId: string; password: string }) => {
  const response = await instance.post(`${authUrl}/sign-in`, params);
  return response.data;
}

export const userSignUp = async (params : {userId: string; password: string; email:string; name:string; gender:boolean; birth:string; area:string; job:string; tag:[]; religion:string}) => {
  const response = await instance.post(`${authUrl}/sign-up`, params);
  return response.data;
};



const userUrl = 'api/v1/users';
export const userJoin = async (params: { userId: string; password: string; email:string; name:string; gender:boolean; birth:string; area:string; job:string; tag:[]; religion:string }) => {
  const response = await instance.post(`${userUrl}`, params);
  return response.data;
};




// export const getUserInfo = async (params: { id: string }) => {
//   const response = await instance.get(`${userUrl}/me`, params);
//   return response;
// };
