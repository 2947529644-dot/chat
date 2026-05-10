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
  isRead?: boolean
  readAt?: Date
  // Media message metadata
  fileName?: string
  fileSize?: number
  fileUrl?: string
  thumbnailUrl?: string
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large'
  notifications: NotificationSettings
}

export interface NotificationSettings {
  messageSound: boolean
  desktopNotification: boolean
  mentionAlert: boolean
}

export interface User {
  id: string
  name: string
  avatar: string
  bio?: string
  phone?: string
  email?: string
  location?: string
}