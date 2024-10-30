<template>
  <div class="chart-card">
    <el-card :header="header">
      <!-- <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template> -->
      <slot />
      <!-- <template #footer>Footer content</template> -->
    </el-card>
  </div>
</template>
<script setup lang="ts">
interface IProps {
  header?: string
}
const props = withDefaults(defineProps<IProps>(), {
  header: 'kkpp'
})
</script>
<style lang="less" scoped>
.chart-card {
  // width: 100%;
}
</style>
