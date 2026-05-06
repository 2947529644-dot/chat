<script setup lang="ts">
import ContactCard from './ContactCard.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <div class="contact-list">
    <div class="contact-list__header">
      <div class="header-content">
        <span class="header-title">信息</span>
        <span class="header-count">{{ chatStore.filteredContacts.length }}</span>
      </div>
      <button class="new-chat-btn" title="新建聊天">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="contact-list__content">
      <template v-if="chatStore.filteredContacts.length > 0">
        <div class="contacts-scroll">
          <ContactCard
            v-for="contact in chatStore.filteredContacts"
            :key="contact.id"
            :contact="contact"
            :is-active="contact.id === chatStore.activeContactId"
            @click="chatStore.selectContact(contact.id)"
          />
        </div>
      </template>

      <div v-else class="contact-list__empty">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <path d="M20 20L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
          </svg>
        </div>
        <span class="empty-text">没有找到联系人</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-list {
  width: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  background: var(--color-canvas-parchment);
  border-right: 0.5px solid var(--color-divider);
  position: relative;
}

.contact-list::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent, var(--color-divider) 20%, var(--color-divider) 80%, transparent);
  pointer-events: none;
}

.contact-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xl) var(--spacing-2xl) var(--spacing-lg);
  background: var(--color-canvas-parchment);
  position: relative;
}

.header-content {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
}

.header-title {
  font-family: var(--font-display);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  color: var(--color-ink);
  letter-spacing: var(--letter-spacing-title);
  line-height: var(--line-height-title);
}

.header-count {
  font-family: var(--font-text);
  font-size: var(--font-size-footnote);
  font-weight: var(--font-weight-regular);
  color: var(--color-ink-muted);
  letter-spacing: var(--letter-spacing-caption);
}

.new-chat-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--color-primary-light);
  border: none;
  border-radius: 50%;
  color: var(--color-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.new-chat-btn:hover {
  background: var(--color-primary);
  color: var(--color-on-primary);
  transform: scale(1.05);
}

.new-chat-btn:active {
  transform: scale(0.95);
}

.contact-list__content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.contacts-scroll {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 var(--spacing-sm);
}

.contacts-scroll::-webkit-scrollbar {
  width: 6px;
}

.contacts-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.contacts-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.contacts-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

.contact-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-5xl) var(--spacing-2xl);
  gap: var(--spacing-lg);
}

.empty-icon {
  color: var(--color-ink-muted);
  opacity: 0.5;
}

.empty-text {
  font-family: var(--font-text);
  font-size: var(--font-size-subhead);
  color: var(--color-ink-muted);
  text-align: center;
}
</style>
