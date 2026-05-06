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
    // Clear unread count when selecting a contact
    const contact = contacts.value.find(c => c.id === contactId)
    if (contact) {
      contact.unreadCount = 0
    }
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

    // Add message to the conversation
    if (!messages.value[activeContactId.value]) {
      messages.value[activeContactId.value] = []
    }
    messages.value[activeContactId.value].push(newMessage)

    // Update last message in contact
    const contact = contacts.value.find(c => c.id === activeContactId.value)
    if (contact) {
      contact.lastMessage = content.trim()
      contact.lastMessageTime = new Date()
    }
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
    setSearchQuery
  }
})
