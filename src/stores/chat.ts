import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Contact, Message, User } from '@/types'
import { mockCurrentUser, mockContacts, mockMessages } from '@/mock/data'

export const useChatStore = defineStore('chat', () => {
  // State
  const currentUser = ref<User>(mockCurrentUser)
  const contacts = ref<Contact[]>(mockContacts)
  const messages = ref<Record<string, Message[]>>(mockMessages)
  const activeContactId = ref<string | null>(null)
  const searchQuery = ref<string>('')

  // Getters
  const activeContact = computed(() => {
    if (!activeContactId.value) return null
    return contacts.value.find(contact => contact.id === activeContactId.value) || null
  })

  const activeMessages = computed(() => {
    if (!activeContactId.value) return []
    return messages.value[activeContactId.value] || []
  })

  const filteredContacts = computed(() => {
    if (!searchQuery.value.trim()) return contacts.value
    const query = searchQuery.value.toLowerCase()
    return contacts.value.filter(contact =>
      contact.name.toLowerCase().includes(query)
    )
  })

  // Actions
  function selectContact(contactId: string): void {
    activeContactId.value = contactId
    // Clear unread count and mark messages as read
    const contact = contacts.value.find(c => c.id === contactId)
    if (contact) {
      contact.unreadCount = 0
      markMessagesAsRead(contactId)
    }
  }

  function markMessagesAsRead(contactId: string): void {
    const msgs = messages.value[contactId]
    if (msgs) {
      msgs.forEach(msg => {
        if (!msg.isMine && !msg.isRead) {
          msg.isRead = true
          msg.readAt = new Date()
        }
      })
    }
  }

  function addContact(contact: Omit<Contact, 'id' | 'lastMessage' | 'lastMessageTime' | 'unreadCount'>): void {
    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      name: contact.name,
      avatar: contact.avatar,
      isGroup: contact.isGroup,
      members: contact.members,
      lastMessage: '',
      lastMessageTime: new Date(),
      unreadCount: 0
    }
    contacts.value.unshift(newContact)
    messages.value[newContact.id] = []
  }

  function sendMessage(content: string): void {
    if (!activeContactId.value || !content.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      contactId: activeContactId.value,
      senderId: currentUser.value.id,
      senderName: currentUser.value.name,
      senderAvatar: currentUser.value.avatar,
      content: content.trim(),
      type: 'text',
      timestamp: new Date(),
      isMine: true
    }

    addMessage(newMessage)
  }

  function sendMediaMessage(options: {
    content: string
    type: 'image' | 'video' | 'file'
    fileName?: string
    fileSize?: number
    fileUrl?: string
    thumbnailUrl?: string
  }): void {
    if (!activeContactId.value) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      contactId: activeContactId.value,
      senderId: currentUser.value.id,
      senderName: currentUser.value.name,
      senderAvatar: currentUser.value.avatar,
      content: options.content,
      type: options.type,
      fileName: options.fileName,
      fileSize: options.fileSize,
      fileUrl: options.fileUrl,
      thumbnailUrl: options.thumbnailUrl,
      timestamp: new Date(),
      isMine: true
    }

    addMessage(newMessage)
  }

  function addMessage(message: Message): void {
    if (!messages.value[message.contactId]) {
      messages.value[message.contactId] = []
    }
    messages.value[message.contactId].push(message)

    // Update last message in contact
    const contact = contacts.value.find(c => c.id === message.contactId)
    if (contact) {
      contact.lastMessage = message.type === 'text' ? message.content : `[${getMessageTypeLabel(message.type)}]`
      contact.lastMessageTime = new Date()
    }
  }

  function getMessageTypeLabel(type: Message['type']): string {
    const labels: Record<string, string> = {
      image: '图片',
      video: '视频',
      file: '文件'
    }
    return labels[type] || '消息'
  }

  function setSearchQuery(query: string): void {
    searchQuery.value = query
  }

  return {
    // State
    currentUser,
    contacts,
    messages,
    activeContactId,
    searchQuery,
    // Getters
    activeContact,
    activeMessages,
    filteredContacts,
    // Actions
    selectContact,
    sendMessage,
    sendMediaMessage,
    setSearchQuery,
    addContact,
    markMessagesAsRead
  }
})
