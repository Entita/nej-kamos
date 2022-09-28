import axios, { AxiosError, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';
import { Icons, toast } from 'react-toastify';
import { getServerUrl, handleCookies } from './utils';

axios.defaults.baseURL = `${getServerUrl()}/api`;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = getCookie('accountId');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const cookies = response.data.custom_cookies;
    if (cookies) handleCookies(cookies);
    if (response.data.toast) {
      toast.dismiss('agentPromise');
      if (response.data.failed) {
        toast.error(response.data.toast, {
          icon: Icons.error,
          delay: 250,
        });
      } else {
        toast.success(response.data.toast, {
          icon: Icons.success,
          delay: 250,
        });
      }
    }
    return response;
  },
  (error: AxiosError) => {
    const { status } = error.response! || {};
    let errorMessage = '';

    switch (status) {
      case 400:
        errorMessage = 'Bad request';
        break;
      case 401:
        errorMessage = 'Unauthorized';
        break;
      case 403:
        errorMessage = 'Forbidden';
        break;
      case 500:
        errorMessage = 'Server error';
        break;
      case 0:
        errorMessage = 'Server not responding';
        break;
      default:
        errorMessage = 'Unknown error';
        break;
    }

    toast.dismiss('agentPromise');
    toast.error(`${errorMessage} [${status}]`, {
      icon: Icons.error,
      delay: 250,
    });
    return Promise.reject(error.response);
  },
);

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody), // prettier-ignore
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) => axios.post(url, data, { headers: { 'Content-type': 'multipart/form-data' }}).then(responseBody), // prettier-ignore
  putForm: (url: string, data: FormData) => axios.put(url, data, { headers: { 'Content-type': 'multipart/form-data' }}).then(responseBody), // prettier-ignore
};

function createFormData(item: any) {
  let formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Admin = {
  createProduct: (product: any) => requests.postForm('products', createFormData(product)), // prettier-ignore
  updateProduct: (product: any) => requests.putForm('products', createFormData(product)), // prettier-ignore
  deleteProduct: (id: number) => requests.delete(`products/${id}`),
};

const Category = {
  get: () => requests.get('category'),
  add: (values: any) => requests.post(`category`, values),
  edit: (values: any) => requests.put(`category`, values),
  delete: () => requests.delete('category'),
};

const Subcategory = {
  get: () => requests.get('subcategory'),
  add: (values: any) => requests.post(`subcategory`, values),
  edit: (values: any) => requests.put(`subcategory`, values),
  delete: () => requests.delete('subcategory'),
};

const Product = {
  get: () => requests.get('product'),
  add: (values: any) => requests.postForm(`product`, values),
  delete: () => requests.delete('product'),
};

const Basket = {
  get: () => requests.get('basket'),
  setItem: (productId: number, quantity = 1) => requests.put(`basket?productId=${productId}&quantity=${quantity}`, {}), // prettier-ignore
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}), // prettier-ignore
  deleteItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`), // prettier-ignore
};

const Coupon = {
  apply: (code: string) => requests.post(`coupon?code=${code}`, {}), // prettier-ignore
  unapply: () => requests.delete('coupon'), // prettier-ignore
  add: (values: any) => requests.post('coupon/add', values),
  activate: (code: string) => requests.post(`coupon/activate?code=${code}`, {}),
  deactivate: (code: string) => requests.delete(`coupon/deactivate?code=${code}`),
};

const Account = {
  get: () => requests.get('account'),
  logout: () => requests.delete('account'),
  login: (values: any) => requests.post('account', values),
  register: (values: any) => requests.put('account', values),
  favorite: (values: any) => requests.post('account/favorite', values),
  unfavorite: (values: any) => requests.put('account/favorite', values),
  replaceBasket: (values: any) => requests.post('account/replaceBasket', values),
  // isUsernameInUse: (values: any) => requests.post('account/isUsernameInUse', values),
  // isEmailInUse: (values: any) => requests.post('account/isEmailInUse', values),
  // resendVerification: (values: any) => requests.post('account/resendVerification', values),
  // verify: (values: any) => requests.post('account/verify', values),
  resetPassword: (values: any) => requests.post('account/forgotten_password', values),
  // resetPasswordVerify: (values: any) => requests.post('account/resetPasswordVerify', values),
  // changePassword: (values: any) => requests.post('account/changePassword', values),
  // update: (values: any) => requests.post('account/update', values),
};

const Payment = {
  create: (values: any) => requests.post('payment', values),
};

const Support = {
  get: () => requests.get('support_chat'),
  add: (values: any) => requests.post('support_chat', values),
};

const Transaction = {
  get: (params: any) => requests.get('transaction', params),
  create: (values: any) => requests.post('transaction', values),
};

const agent = {
  Category,
  Subcategory,
  Product,
  Basket,
  Account,
  Payment,
  Admin,
  Coupon,
  Transaction,
  Support,
};

export default agent;
