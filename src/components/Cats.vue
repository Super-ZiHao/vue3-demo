<script lang='ts' setup>
import axios from 'axios';
import {  reactive, ref } from 'vue';
const labelPosition = ref<string>('right');

const formLabelAlign = reactive({
  name: "",
  password: "",
  code: ""
})

const codeUrl = ref<string>("http://localhost:3000/cats/code");

const resetCode = () => {
  codeUrl.value = codeUrl.value + '?' + Math.round(Math.random())
};

const submit = () => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/cats/create',
    withCredentials: true,
    data: JSON.stringify(formLabelAlign),
    headers: {
      'content-type': 'application/json',
    }
  }).then(res => res.data).then(res => {
    console.log(document.cookie)
  })
}
</script>

<template>
  <div class="box">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="code">
          <el-input v-model="formLabelAlign.code" />
          <img @click="resetCode" :src="codeUrl">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .code {
    display: flex;
    gap: 8px;
  }
</style>