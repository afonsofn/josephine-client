import axios, { AxiosError } from 'axios'
import { router } from 'expo-router'
import { useAuthToken } from '@/utils'
import { API_PORT } from '@/utils/constants'

const api = axios.create({ baseURL: API_PORT })

api.interceptors.request.use(async (config) => {
  const { getToken } = useAuthToken()

  const token = await getToken()

  if (!token) {
    router.push('/')

    return config
  }

  config.headers.Authorization = `Bearer ${token}`

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.request.status === 401) {
      const { clearToken } = useAuthToken()

      clearToken()

      router.push('/')
    }

    return error
  },
)

export default api
