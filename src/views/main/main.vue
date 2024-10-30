<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '64px' : '200px'">
        <main-menu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @isFoldChange="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}

.main-container {
  height: 100%;

  .el-aside {
    background-color: #545c64;
    overflow-x: hidden;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-header {
    background-color: #fff;
  }

  .el-main {
    background-color: #e5e5e5;
  }
}
</style>
