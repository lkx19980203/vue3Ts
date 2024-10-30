import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  // require.context()
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    // 立即加载文件
    eager: true
  })

  for (const key in files) {
    const fileModule = files[key]
    localRoutes.push(fileModule.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRouters(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()

  const dynamicRoutes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subItemMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subItemMenu.url)
      if (route) {
        if (!dynamicRoutes.find((item) => item.path === menu.url)) {
          dynamicRoutes.push({ path: menu.url, redirect: route })
        }
        dynamicRoutes.push(route)
      }
      if (route && !firstMenu) {
        firstMenu = subItemMenu
      }
    }
  }

  return dynamicRoutes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any) {
  for (const submenu of userMenus) {
    if (submenu.url === path) {
      return submenu
    }
    if (submenu.children) {
      const menu: any = mapPathToMenu(path, submenu.children)
      if (menu) return menu
    }
  }
}

interface IbreadCrumb {
  name: string
  path: string
}
export function mapPathToBreadCrumbs(path: string, userMenus: any) {
  const breadCrumbs: IbreadCrumb[] = []
  for (const menu of userMenus) {
    for (const subItemMenu of menu.children) {
      if (subItemMenu.url === path) {
        breadCrumbs.push({ name: menu.name, path: menu.url })
        breadCrumbs.push({ name: subItemMenu.name, path: subItemMenu.url })
      }
    }
  }

  return breadCrumbs
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}
/**
 * 菜单映射到id的列表
 * @param menus 菜单
 * @returns 权限列表
 */
export function mapMenusToPermissions(menuLists: any[]) {
  const permissions: string[] = []

  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermissions(item.children ?? [])
      }
    }
  }
  recurseGetPermissions(menuLists)

  return permissions
}
