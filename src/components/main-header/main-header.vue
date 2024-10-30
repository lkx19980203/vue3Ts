<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import headerCrumb from './cpns/header-crumb.vue'
import headerInfo from './cpns/header-info.vue'

const emits = defineEmits(['isFoldChange'])
const isFold = ref(false)
function handleMenuIconClick() {
  isFold.value = !isFold.value
  emits('isFoldChange', isFold.value)
}
</script>
<style lang="less" scoped>
.main-header {
  height: 100%;
  display: flex;
  align-items: center;
  .menu-icon {
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
