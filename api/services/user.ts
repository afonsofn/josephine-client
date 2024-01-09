import api from '@/api/axiosInstance'

export const getUserContacts = async () => {
  const { data } = await api.get('users/me/contacts')

  return data
}

export const getUserInfo = async () => {
  const { data } = await api.get('users/me')

  return data
}

export const getChatInfo = async (id: number) => {
  const { data } = await api.get(`users/${id}`)

  return data
}
