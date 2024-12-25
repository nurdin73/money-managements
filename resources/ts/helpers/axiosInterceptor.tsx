// import { getCookie } from "@/actions";
import axios from 'axios'

import { getCurrentToken, setCurrentToken, setCurrentUser } from './utils'

let isRefreshing = false
let failedQueue: any = [] // Menyimpan request yang gagal

// Fungsi untuk menghandle request yang gagal
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const axiosInterceptorInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const axiosRefresh = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

axios.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    if (error.response?.data) {
      return Promise.reject(Error(error.response.data.message))
    }

    if (error.response?.message) {
      return Promise.reject(Error(error.response.message))
    }

    return Promise.reject(Error(error.message))
  }
)

axiosInterceptorInstance.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const originalRequest = error.config

    // Jika error adalah 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Tandai bahwa kita akan coba ulangi request ini
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const res = await axiosRefresh.post('/auth/refresh', null, {
            headers: {
              Authorization: `Bearer ${getCurrentToken().access_token}`,
            },
          })

          setCurrentToken(res.data.data)

          // Set token baru di header Authorization
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.access_token}`
          originalRequest.headers['Authorization'] = `Bearer ${res.data.data.access_token}`
          // Proses antrian request yang gagal
          processQueue(null, res.data.data.access_token)

          isRefreshing = false

          if (originalRequest.headers['Content-Type'] === 'multipart/form-data') {
            const formData = new FormData()
            for (let [key, value] of Object.entries(originalRequest.data)) {
              formData.append(key, value as any)
            }
            originalRequest.data = formData
          }

          // Kirim ulang request yang gagal dengan token baru
          return axios(originalRequest)
        } catch (refreshError) {
          // Jika refresh token gagal, handle logout atau error lain
          processQueue(refreshError, null)
          isRefreshing = false
          setCurrentToken(null)
          setCurrentUser(null)
          window.location.href = '/auth'
          return Promise.reject(refreshError)
        }
      }

      // Jika sudah dalam proses refresh token, tambahkan request ini ke antrian
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          if (originalRequest.headers['Content-Type'] === 'multipart/form-data') {
            const formData = new FormData()
            for (let [key, value] of Object.entries(originalRequest.data)) {
              formData.append(key, value as any)
            }
            originalRequest.data = formData
          }

          return axios(originalRequest)
        })
        .catch((err) => {
          if (err.response?.data) {
            return Promise.reject(Error(err.response.data.message))
          }

          if (err.response?.message) {
            return Promise.reject(Error(err.response.message))
          }

          return Promise.reject(Error(err.message))
        })
    }

    if (error.response?.data) {
      return Promise.reject(Error(error.response.data.message))
    }

    if (error.response?.message) {
      return Promise.reject(Error(error.response.message))
    }

    return Promise.reject(Error(error.message))
  }
)
// createAuthRefreshInterceptor(axios, refreshAuthLogic, {
//     pauseInstanceWhileRefreshing: true,
//     interceptNetworkError: true,
// })

export default axiosInterceptorInstance
