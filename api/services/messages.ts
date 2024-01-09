import api from '@/api/axiosInstance'

export const joinChatRoom = async ({
  userId,
  targetUserId,
}: {
  userId: number
  targetUserId: number
}) => {
  await api.post('messages/join-chat', {
    userId,
    targetUserId,
  })
}
