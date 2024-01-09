export enum MessageStatus {
  SENT = 'sent',
  RECEIVED = 'received',
  READED = 'readed',
}

export enum ChatStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
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
  status: MessageStatus
}

export interface ChatBoxInfo {
  firstName: string
  lastName: string
  imageUrl: string
  userId: number
  contactId: number
  lastMessage: ChatMessage
}

export interface UserInfo {
  createdAt: string
  updatedAt: string
  email: string
  firstName: string
  lastName: string
  nickname: string
  id: number
  imageUrl?: string
  phoneNumber?: string
  provider?: string
  status: ChatStatus
  verified: boolean
}
