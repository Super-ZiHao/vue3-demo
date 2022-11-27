import { defineStore } from 'pinia';
import client from '../utils/api';

const tokenName = 'user-token'
const useTokenStore = defineStore('token', {
  state: () => ({
    token: localStorage.getItem(tokenName)
  }),
  actions: {
    setToken(token: string) {
      localStorage.setItem(tokenName, token)
      this.token = token;
    },
    removeToken() {
      localStorage.removeItem(tokenName)
      this.token = null;
    }
  }
})

export default useTokenStore;