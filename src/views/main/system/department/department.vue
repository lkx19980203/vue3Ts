<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <div>{{ scope.row[scope.prop] }}</div>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>
<script></script>
<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { computed, ref } from 'vue'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})

// 对content组件的操作

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 对modal组件的操作
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>
<style lang="less" scoped>
.department {
  width: 100%;
}
</style>
