import { defineStore } from 'pinia'
import { getMenusByRoleId, getUserInfoById, login } from '@/service/modules/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRouters, mapMenusToPermissions } from '@/utils/mapMenus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}
const useLoginStore = defineStore('loginStore', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await login(account)
      const id = res.data.id
      this.token = res.data.token
      // 先设置token
      localCache.setCache(LOGIN_TOKEN, this.token)

      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      const menusRes = await getMenusByRoleId(this.userInfo.role.id)
      this.userMenus = menusRes.data

      localCache.setCache('userInfo', userInfoRes.data)
      localCache.setCache('userMenus', menusRes.data)

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      const permissions = mapMenusToPermissions(this.userMenus)
      this.permissions = permissions

      const dynamicRoutes = mapMenusToRouters(this.userMenus)
      dynamicRoutes.forEach((route) => router.addRoute('main', route))

      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userMenus = localCache.getCache('userMenus')
      const userInfo = localCache.getCache('userInfo')

      if (token && userMenus && userInfo) {
        this.token = token
        this.userMenus = userMenus
        this.userInfo = userInfo

        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        const permissions = mapMenusToPermissions(this.userMenus)
        this.permissions = permissions

        const dynamicRoutes = mapMenusToRouters(this.userMenus)
        dynamicRoutes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
