import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login'

const pinia = createPinia()

export function registerStore(app: App<Element>) {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
