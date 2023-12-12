export interface ChatBoxInfo {
  chatName: string
  lastMessage: string
  lastMessageTime: string
  isChatOnline: boolean
  chatImage?: string
  chatId: number
}

export interface ChatMessage {
  id: number
  receiverId: number
  senderId: number
  content: string
  createdAt: string
  updatedAt: string
  status: string
}

export interface ChatInfo {
  chatName: string
  messages: ChatMessage[]
  isChatOnline: boolean
  chatImage?: string
  chatId: number
}
