import request from '..'
import type { IAccount } from '@/types'

export const login = (data: IAccount) => {
  return request.post({ url: '/login', data })
}

export const getUserInfoById = (id: number) => {
  return request.get({ url: `/users/${id}` })
}

export const getMenusByRoleId = (id: number) => {
  return request.get({ url: `/role/${id}/menu` })
}
