<template>
  <el-form
    ref="formRef"
    label-width="70px"
    size="large"
    :model="formData"
    :rules="formRules"
    status-icon
  >
    <el-form-item label="帐号" prop="name">
      <el-input v-model="formData.name" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, FormInstance, ElForm } from 'element-plus'
// import { login } from '@/service/modules/login'
import useLoginStore from '@/store/login'

import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'cache_name'
const CACHE_PASSWORD = 'cache_password'

const formData = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
const formRules = reactive<FormRules<typeof formData>>({
  name: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { message: '必须是6-20位数字或字母', pattern: /^[a-zA-Z0-9]{6,20}$/, trigger: 'change' }
  ]
})

const formRef = ref<FormInstance>()
// const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid, fields) => {
    if (valid) {
      const { name, password } = formData
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('请输入正确的帐号和密码')
    }
  })
}

defineExpose({
  loginAction
})
</script>
