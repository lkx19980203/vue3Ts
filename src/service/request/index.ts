import axios from 'axios'
import type { kkRequestConfig } from './type'

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

class Request {
  instance: AxiosInstance

  constructor(config: kkRequestConfig<InternalAxiosRequestConfig>) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (error) => {
        return error
      }
    )

    // if (config.interceptors) {
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
    // }
  }

  request<R = any>(config: kkRequestConfig<any, R>) {
    if (config.interceptors?.requestSuccessFn) {
      config.interceptors.requestSuccessFn(config)
    }
    return new Promise<R>((resolve, reject) => {
      this.instance
        .request<any, R>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<R = any>(config: kkRequestConfig<any, R>) {
    return this.request<R>({ ...config, method: 'GET' })
  }
  post<R = any>(config: kkRequestConfig<any, R>) {
    return this.request<R>({ ...config, method: 'POST' })
  }
  patch<R = any>(config: kkRequestConfig<any, R>) {
    return this.request<R>({ ...config, method: 'PATCH' })
  }
  delete<R = any>(config: kkRequestConfig<any, R>) {
    return this.request<R>({ ...config, method: 'DELETE' })
  }
}

export default Request
