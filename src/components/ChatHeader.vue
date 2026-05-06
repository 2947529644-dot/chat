<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <header class="chat-header">
    <div v-if="chatStore.activeContact" class="header-content">
      <div class="contact-info">
        <span class="contact-name">{{ chatStore.activeContact.name }}</span>
        <span v-if="chatStore.activeContact.isGroup" class="member-count">
          ({{ chatStore.activeContact.members?.length || 0 }} members)
        </span>
      </div>
      <div class="actions">
        <button class="action-btn" title="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
        <button class="action-btn" title="More options">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="placeholder">
      <span class="placeholder-text">Select a chat to start messaging</span>
    </div>
  </header>
</template>

<style scoped>
.chat-header {
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
  background-color: var(--color-canvas);
  border-bottom: 1px solid var(--color-divider-soft);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.contact-info {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.contact-name {
  font-family: var(--font-text);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
}

.member-count {
  font-family: var(--font-text);
  font-size: var(--font-size-caption);
  color: var(--color-ink-muted-48);
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-ink-muted-48);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.action-btn:hover {
  background-color: var(--color-divider-soft);
  color: var(--color-ink);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.placeholder-text {
  font-family: var(--font-text);
  font-size: var(--font-size-body);
  color: var(--color-ink-muted-48);
}
</style>
