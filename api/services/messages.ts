import api from '@/api/axiosInstance'

export const joinChatRoom = async ({
  userId,
  targetUserId,
}: {
  userId: string
  targetUserId: string
}) => {
  await api.post('messages/join-chat', {
    userId,
    targetUserId,
  })
}
