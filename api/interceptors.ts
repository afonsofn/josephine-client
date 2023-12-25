import api from '@/api/axiosInstance'
import { useAuthToken } from '@/utils'

api.interceptors.request.use(async (config) => {
  const { getToken } = useAuthToken()

  const token = await getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => error,
)
