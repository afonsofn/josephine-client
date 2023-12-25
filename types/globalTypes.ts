export interface ChatBoxInfo {
  firstName: string,
  lastName: string,
  imageUrl: string,
  status: string,
  userId: number,
  contactId: number,
  lastMessage: ChatMessage
}

export interface ChatMessage {
  id: number
  receiverId: number
  senderId: number
  contactId: number
  groupId?: number
  content: string
  createdAt: string
  updatedAt: string
  status: string
}

export interface ChatInfo {
  chatName: string
  firstName: string
  lastName: string
  messages: ChatMessage[]
  status: boolean
  imageUrl?: string
  id: number
}
