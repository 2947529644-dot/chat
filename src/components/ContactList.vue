<script setup lang="ts">
import ContactCard from './ContactCard.vue'
import { useChatStore } from '@/stores/chat'
import { useSettingsStore } from '@/stores/settings'

const chatStore = useChatStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="title">消息</h1>
      <button class="new-btn" title="新建对话" @click="settingsStore.openAddContact">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="contacts">
      <ContactCard
        v-for="contact in chatStore.filteredContacts"
        :key="contact.id"
        :contact="contact"
        :is-active="contact.id === chatStore.activeContactId"
        @click="chatStore.selectContact(contact.id)"
      />

      <div v-if="chatStore.filteredContacts.length === 0" class="empty">
        <p>没有找到对话</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 340px;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  background: var(--bg-elevated);
  border-right: 1px solid var(--border);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) var(--space-6) var(--space-4);
}

.title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.new-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-muted);
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.new-btn:hover {
  background: var(--primary);
  color: var(--text-on-dark);
  transform: scale(1.05);
}

.contacts {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2);
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  color: var(--text-muted);
  font-size: var(--text-sm);
}
</style>
