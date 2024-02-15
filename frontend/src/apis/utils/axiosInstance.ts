import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// const BASEURL = 'https://i10c207.p.ssafy.io:8081/api';
const BASEURL = 'http://localhost:8080/api';

export const instance = axios.create({
  // baseURL: 'http://localhost:8080/',
  baseURL: `${BASEURL}`,
});

export const loginInstance = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: `${BASEURL}`,
});
export const fileInstance = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: `${BASEURL}`,
});

export const pgTokenInstance = axios.create({
  baseURL: 'http://lvh.me:8080',
});

const setCommonHeaders = async (config: any) => {
  config.headers['Content-Type'] = 'application/json';
  return config;
};

const setLoginCommonHeaders = async (config: any) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;

  return config;
};

const setFileCommonHeaders = async (config: any) => {
  config.headers['Content-Type'] = 'multipart/form-data';
  // config.headers['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;

  return config;
};

const handleResponseError = async (error: AxiosError) => {
  if (!error.response) return Promise.reject(error);
  const { status, data } = error.response as { status: number; data: any };
  console.log('status :', status, data);

  switch (status) {
    case 400:
      // alert('이미 매칭에 참여 중입니다');
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

loginInstance.interceptors.request.use(setLoginCommonHeaders, handleRequestError);
loginInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);

fileInstance.interceptors.request.use(setFileCommonHeaders, handleRequestError);
fileInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default instance;
