<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon size="16"><UserFilled /></el-icon>
              <span>账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="2" label="手机登录">
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="loginClick">登录</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'
const ISREMPWD = 'isRemPwd'
const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache(ISREMPWD) ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache(ISREMPWD, newValue)
})
const accountRef = ref<InstanceType<typeof paneAccount>>()

const loginClick = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log(2)
  }
}
</script>
<style lang="less" scoped>
.login-panel {
  width: 333px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .tabs {
    .label {
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
      }
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    --el-button-size: 50px;
  }
}
</style>
