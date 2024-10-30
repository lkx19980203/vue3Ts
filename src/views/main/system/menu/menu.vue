<template>
  <div class="menu">
    <page-content :content-config="contentConfig" ref="contentRef">
      <template #leader="scope">
        <div>{{ scope.row[scope.prop] }}</div>
      </template>
    </page-content>
  </div>
</template>
<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'

import contentConfig from './config/content.config'

import usePageContent from '@/hooks/usePageContent'

// 对content组件的操作
</script>
<style lang="less" scoped>
.menu {
  width: 100%;
}
</style>
