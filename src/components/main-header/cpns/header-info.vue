<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <div class="user-info">
          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span class="name">{{ loginStore.userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">
              <el-icon><CircleClose /></el-icon>
              退出登录
            </el-dropdown-item>
            <el-dropdown-item divided>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import useLoginStore from '@/store/login'
import router from '@/router'
import { localCache } from '@/utils/cache'
const loginStore = useLoginStore()

function loginOut() {
  localCache.clearCache()
  router.push('/login')
}
</script>
<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  .operation {
    display: inline-flex;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 40px;
      height: 35px;

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
  .info {
    margin-left: 10px;

    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;

      .name {
        margin-left: 10px;
      }
    }
  }
}
:deep(.el-dropdown-menu__item) {
  line-height: 36px !important;
  padding: 6px 22px;
}
</style>
