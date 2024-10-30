import type { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface IInterceptors<T, R> {
  requestSuccessFn?: (config: T) => T
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (config: R) => R
  responseFailureFn?: (err: any) => any
}
export interface kkRequestConfig<T = AxiosRequestConfig, R = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: IInterceptors<T, R>
}
