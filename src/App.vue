<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import GlobalNav from './components/GlobalNav.vue'
import ContactList from './components/ContactList.vue'
import ChatWindow from './components/ChatWindow.vue'
import SettingsModal from './components/SettingsModal.vue'
import ProfileModal from './components/ProfileModal.vue'
import AddContactModal from './components/AddContactModal.vue'
import { useSettingsStore } from './stores/settings'

const settingsStore = useSettingsStore()

// Compute theme class
const themeClass = computed(() => {
  const theme = settingsStore.settings.theme
  if (theme === 'dark') return 'dark'
  if (theme === 'light') return ''
  // System preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return ''
})

// Compute font size class
const fontClass = computed(() => {
  const size = settingsStore.settings.fontSize
  if (size === 'small') return 'font-small'
  if (size === 'large') return 'font-large'
  return ''
})

// Apply classes to html element
function applyTheme() {
  const html = document.documentElement
  html.classList.remove('dark', 'font-small', 'font-large')
  if (themeClass.value) html.classList.add(themeClass.value)
  if (fontClass.value) html.classList.add(fontClass.value)
}

// Watch for changes
watch([themeClass, fontClass], applyTheme)

// Apply on mount
onMounted(() => {
  applyTheme()
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (settingsStore.settings.theme === 'system') {
      applyTheme()
    }
  })
})
</script>

<template>
  <div class="app-container">
    <GlobalNav />
    <div class="main-content">
      <ContactList />
      <ChatWindow />
    </div>

    <!-- Modals -->
    <SettingsModal v-if="settingsStore.showSettings" />
    <ProfileModal v-if="settingsStore.showProfile" />
    <AddContactModal v-if="settingsStore.showAddContact" />
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  min-height: 0;
}

@media (max-width: 767px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
