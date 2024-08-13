// import { getCookie } from "@/actions";
import axios from 'axios'

import { getCurrentToken, setCurrentToken, setCurrentUser } from './utils'

const axiosInterceptorInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const axiosRefresh = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const refreshAuthLogic = (failedRequest) =>
  axiosRefresh
    .post('/auth/refresh', null, {
      headers: {
        Authorization: `Bearer ${getCurrentToken().access_token}`,
      },
    })
    .then((tokenRefreshResponse) => {
      setCurrentToken(tokenRefreshResponse.data)
      // eslint-disable-next-line no-param-reassign
      failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.token}`
      return Promise.resolve()
    })
    .catch(() => {
      setCurrentToken(null)
      setCurrentUser(null)
      // window.location.reload()
    })

// request interceptor
axiosInterceptorInstance.interceptors.request.use(async (config: any) => {
  let token = getCurrentToken()
  const location = window?.location.pathname ?? ''
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token?.access_token}`,
      Accept: 'application/json',
      'x-platform': 'cms',
      'x-refer-url': location,
    },
    baseURL: `${import.meta.env.VITE_API_URL}/`,
  }
})

axiosInterceptorInstance.interceptors.response.use(
  (response: any) => response,
  async (error) => {
    if (error.response?.status == 401) {
      setCurrentToken(null)
      setCurrentUser(null)
      window.location.href = '/#/auth'
    }

    if (error.response?.data) {
      return Promise.reject(Error(error.response.data.message))
    }

    return Promise.reject(Error(error.message))
  }
)

export default axiosInterceptorInstance
