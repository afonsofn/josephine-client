import api from '@/api/axiosInstance'

export const getMyContacts = async () => {
  const { data } = await api.get('users/me/contacts')

  return data
}
