import axios, { Axios, AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('user-token')}`
  }
})

// 响应拦截
client.interceptors.response.use(res => res.data)

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
