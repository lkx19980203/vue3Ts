<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">KKLLXX</h2>
    </div>
    <div class="menu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        :collapse="isFold"
        :default-active="defaultActive"
        text-color="#fff"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="clickSubItem(subItem)">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
// import router from '@/router'
import useLoginStore from '@/store/login'
import { mapPathToMenu } from '@/utils/mapMenus'
import { useRoute, useRouter } from 'vue-router'
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
const route = useRoute()
const router = useRouter()

const props = defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

function clickSubItem(item: any) {
  router.push(item.url)
}

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu?.id + ''
})
</script>
<style lang="less" scoped>
.main-menu {
  width: 100%;
}

.logo {
  display: flex;
  height: 30px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    // background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    // background-color: #0a60bd;
  }
}
</style>
