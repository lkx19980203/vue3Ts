<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in breadCrumbs" :key="item.path" :to="item.path">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import useLoginStore from '@/store/login'
import { mapPathToBreadCrumbs } from '@/utils/mapMenus'
import { computed } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadCrumbs = computed(() => {
  return mapPathToBreadCrumbs(route.path, userMenus)
})
</script>
<style lang="less" scoped>
.header-crumb {
  // width: 100%;
}
</style>
