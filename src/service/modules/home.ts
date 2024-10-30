import myRequest from '..'

// 发送网络请求
interface IHomeData {
  data: any
  returnCode: string
  success: boolean
}

export const aa = () => {
  return myRequest.get<IHomeData>({
    url: '/home/multidata'
  })
}
