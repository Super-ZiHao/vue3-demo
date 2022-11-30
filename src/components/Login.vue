<script lang='ts' setup>
import { reactive, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { loginApi } from '@/utils/api/user';
import { ElMessage, ElForm, ElFormItem, ElButton, ElInput } from 'element-plus';

interface UserType {
  username: string;
  password: string;
}
const router = useRouter();
const formLabelAlign = reactive<UserType>({
  username: "",
  password: "",
})

const handeleGetUser = () => {
}

onBeforeMount(() => {
  const token = localStorage.getItem('user-token')
  if (token) router.push('/list')
})

const handleLogin = () => {
  if (formLabelAlign.username.length === 0) {
    return ElMessage.warning('请输入账号')
  }
  if (formLabelAlign.password.length === 0) {
    return ElMessage.warning('请输入密码')
  }
  loginApi<{data: {access_token:string}}>({...formLabelAlign}).then((res) => {
    ElMessage.success('恭喜你登陆成功')
    router.push('/list');
    localStorage.setItem('user-token', res.data.access_token)
  }).catch(err => {
    ElMessage.error(err.response.data.message);
  })
}
</script>

<template>
  <div class="loginBox">
    <ElForm label-position="right" label-width="80px" :model="formLabelAlign" style="max-width: 460px;">
      <ElFormItem label="账号" color="white">
        <ElInput class="login-input" v-model="formLabelAlign.username" />
      </ElFormItem>
      <ElFormItem label="密码">
        <ElInput v-model="formLabelAlign.password" />
      </ElFormItem>
      <ElFormItem>
        <ElButton @click="handleLogin">登陆</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang='scss' scoped>
.loginBox {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to right bottom, #d16ba5, #b66ba9, #996aa7, #7e68a1, #656597, #5b6fa1, #5079a8, #4683ad, #3ca1c7, #35bfdb, #3fdde9, #5ffbf1);
}

::v-deep .el-form-item__label{
  color: white;
}
</style>