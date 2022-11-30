import { post } from "./index";

type loginParam = {username: string; password: string}
export const loginApi: <T>(data: loginParam) => Promise<T> = ({ username, password }) => post('auth/login', {
  password,
  username,
})