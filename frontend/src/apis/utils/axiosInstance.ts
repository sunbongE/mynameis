import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
});

const AfterLoginInstance = axios.create({
  baseURL: 'http://i10c207.p.ssafy.io:8081/',
  withCredentials: true,
  // headers: {
  //   'Authorization':`Bearer ${Cookies.get('accessToken')}`
  // }
});

const setCommonHeaders = async (config: any) => {
  config.headers['Content-Type'] = 'application/json';
  // config.headers['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;

  return config;
};

const handleResponseError = async (error: AxiosError) => {
  if (!error.response) return Promise.reject(error);
  const { status, data } = error.response as { status: number; data: any };
  console.log('status :', status, data);

  switch (status) {
    case 400:
      if (data['data_header']) alert(data['data_header'].result_message);
      // else alert('잘못된 정보를 입력하셨습니다.\n다시 확인해주세요');
      break;
    case 401:
    // TODO
    // 로그아웃 로직타기
    case 500:
      alert('시스템 에러, 관리자에게 문의 바랍니다.');
      break;
    default:
      console.error(error);
      return Promise.reject(error);
  }
};

const handleResponseSuccess = (response: AxiosResponse<any>) => {
  console.log('Success response: ' + response.config.url);
  return response;
};

const handleRequestError = (error: AxiosError) => {
  console.error('handleRequestError :', error);
  return Promise.reject(error);
};

instance.interceptors.request.use(setCommonHeaders, handleRequestError);
instance.interceptors.response.use(handleResponseSuccess, handleResponseError);


AfterLoginInstance.interceptors.request.use(setCommonHeaders, handleRequestError);
AfterLoginInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);




export default instance;
