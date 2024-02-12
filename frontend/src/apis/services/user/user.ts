import instance from '../../utils/axiosInstance';
import { loginInstance, fileInstance } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

const authUrl = 'auth';
const userUrl = 'users';

export const userLogin = async (params: { userId: string; password: string }) => {
  const response = await instance.post(`${authUrl}/sign-in`, params);
  return response.data;
};

export const userSignUp = async (params: { userId: string; password: string; email: string; name: string; gender: boolean; birth: string; area: string; job: string; tags: string[]; religion: string }) => {
  const response = await instance.post(`${authUrl}/sign-up`, params);
  return response.data;
};

export const userPhoneNumberSubmit = async (params: { phoneId: string }) => {
  console.log('userPhoneNumberSubmit 들어옴');
  const response = await instance.post(`${authUrl}/phone-certification`, params);
  console.log('userPhoneNumberSubmit response이후', response);
  console.log(params);
  return response.data;
};

export const userPhoneAuthentication = async (params: { phoneId: string; certificationNumber: string }) => {
  const response = await instance.post(`${authUrl}/check-phonecertification`, params);
  return response.data;
};

export const userEmailAuthentication = async (params: { userId: string; email: string }) => {
  const response = await instance.post(`${authUrl}/change`, params);
  return response.data;
};

export const userPasswordReset = async (params: { password: string }, query: string) => {
  const response = await instance.patch(`${authUrl}/change${query}`, params);
  return response.data;
};

export const userCoinPaymentRequest = async (params: { partner_user_id: string | undefined; partner_order_id: number; item_name: string; total_amount: number; approval_url: string; cancel_url: string; fail_url: string; }) => {
  const response = await instance.post(`${authUrl}/pay`, params);
  return response.data;
};

export const userCoinPaymentConfirm = async (params: { tid:string | null, partner_user_id:string | undefined, partner_order_id:number, pg_token:string }) => {
  const response = await instance.post(`${authUrl}/approve`, params);
  return response.data
}


export const getUserInfo = async () => {
  try {
    const token = Cookies.get('accessToken');
    const response = await instance.post(
      `${userUrl}/get-user-info`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('유저 정보를 가져오는데 실패했습니다.');
    throw error;
  }
};

export const userJoin = async (params: { name: string; coin: number; gender: boolean; birth: string; area: string; job: string; tag: []; religion: string; coupleId: null; isValud: boolean }) => {
  const response = await instance.post(`${userUrl}`, params);
  return response.data;
};

/**
 * 신고
 */
export const reportUser = async (fData: FormData) => {
  const response = await fileInstance.post(`${authUrl}/upload`, fData);
  return response.data;
};

// export const getUserInfo = async (params: { id: string }) => {
//   const response = await instance.get(`${userUrl}/me`, params);
//   return response;
// };
