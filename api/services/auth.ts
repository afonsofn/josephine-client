import api from '@/api/axiosInstance'

export const registerByEmail = async (payload: {
  email: string
  password: string
  firstName: string
  lastName: string
  nickname: string
}) => {
  const { data } = await api.post('auth/register/email', payload)

  return data
}

export const verifyEmail = async (payload: {
  email: string
  verificationCode: string
}) => {
  const { data } = await api.post('auth/register/email/verify', payload)

  return data
}

export const loginByEmail = async (payload: {
  email: string
  password: string
}) => {
  const { data } = await api.post('auth/login/email', payload)

  return data
}
