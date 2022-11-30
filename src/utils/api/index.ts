import axios, { Axios, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
})

client.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    "Authorization": `Bearer ${localStorage.getItem('user-token')}`
  }
  return config
})
// 响应拦截
client.interceptors.response.use(res => {
  return res.data
}, err => {
  if (err.response.data.message === 'Unauthorized') {
    window.location.href="/#/login"
    localStorage.removeItem('user-token')
    ElMessage.warning('对不起，您的账号已失效，请重新登录')
  }
})

export const get: <T>(url: string) => Promise<T> = (url) => {
  return client(url, {
    method: 'get'
  })
}

export const post: <T, D = any>(url: string, data: D) => Promise<T>  = (url, data) => {
  return client(url, {
    method: 'post',
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

export default client
