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
  receiverId: string
  senderId: string
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
  userId: string
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
  id: string
  imageUrl?: string
  phoneNumber?: string
  provider?: string
  status: ChatStatus
  verified: boolean
}

export interface ChatInfo {
  createdAt: string
  updatedAt: string
  email: string
  firstName: string
  lastName: string
  nickname: string
  id: string
  imageUrl?: string
  phoneNumber?: string
  provider?: string
  status: ChatStatus
  verified: boolean
  contactId: number
}
