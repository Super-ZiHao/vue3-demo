<script lang='ts' setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { get, post } from '../utils/api';
import { UserInformationType } from '../utils/types/user';
import useTokenStore from '../store/token';

const tokenStore = useTokenStore();

interface UserType {
  username: string;
  password: string;
}
const formLabelAlign = reactive<UserType>({
  username: "",
  password: "",
})

const handeleGetUser = () => {
  get("profile").then(res => {
    ElMessage.success('获取成功')
  })
  .catch(err => {
    ElMessage.error('对不起，你的账户已过期，请从重新登陆')
    tokenStore.removeToken()
  })
}

const handleLogin = () => {
  post<UserInformationType>('auth/login', formLabelAlign)
  .then(res => {
    ElMessage.success("已成功登录😊")
    tokenStore.setToken(res.access_token)
  })
  .catch(() => {
    ElMessage.error("账号或密码错误")
  })
}
</script>

<template>
  <div>
    <el-form
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handeleGetUser">获取用户信息</el-button>
        <el-button @click="handleLogin">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang='scss' scoped>

</style>