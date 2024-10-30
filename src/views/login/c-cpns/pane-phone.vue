<template>
  <div class="pane-hone">
    <el-form label-width="70px" size="large">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="flex">
          <el-input />
          <el-button class="verify-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.pane-hone {
  width: 100%;
}
.flex {
  display: flex;
}
.verify-btn {
  margin-left: 10px;
}
</style>
