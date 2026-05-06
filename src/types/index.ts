export interface Contact {
  id: string
  name: string
  avatar: string
  isGroup: boolean
  members?: string[]
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

export interface Message {
  id: string
  contactId: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  type: 'text' | 'image' | 'video' | 'file'
  timestamp: Date
  isMine: boolean
}

export interface User {
  id: string
  name: string
  avatar: string
}