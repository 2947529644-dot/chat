import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserSettings } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<UserSettings>({
    theme: 'light',
    fontSize: 'medium',
    notifications: {
      messageSound: true,
      desktopNotification: true,
      mentionAlert: true
    }
  })

  const showSettings = ref(false)
  const showProfile = ref(false)
  const showAddContact = ref(false)
  const selectedProfileContactId = ref<string | null>(null)

  function updateTheme(theme: UserSettings['theme']): void {
    settings.value.theme = theme
  }

  function updateFontSize(fontSize: UserSettings['fontSize']): void {
    settings.value.fontSize = fontSize
  }

  function updateMessageSound(enabled: boolean): void {
    settings.value.notifications.messageSound = enabled
  }

  function updateDesktopNotification(enabled: boolean): void {
    settings.value.notifications.desktopNotification = enabled
  }

  function updateMentionAlert(enabled: boolean): void {
    settings.value.notifications.mentionAlert = enabled
  }

  function openSettings(): void {
    showSettings.value = true
  }

  function closeSettings(): void {
    showSettings.value = false
  }

  function openProfile(contactId?: string): void {
    selectedProfileContactId.value = contactId || null
    showProfile.value = true
  }

  function closeProfile(): void {
    showProfile.value = false
    selectedProfileContactId.value = null
  }

  function openAddContact(): void {
    showAddContact.value = true
  }

  function closeAddContact(): void {
    showAddContact.value = false
  }

  return {
    settings,
    showSettings,
    showProfile,
    showAddContact,
    selectedProfileContactId,
    updateTheme,
    updateFontSize,
    updateMessageSound,
    updateDesktopNotification,
    updateMentionAlert,
    openSettings,
    closeSettings,
    openProfile,
    closeProfile,
    openAddContact,
    closeAddContact
  }
})
