<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <header class="header">
    <div v-if="chatStore.activeContact" class="content">
      <div class="info">
        <span class="name">{{ chatStore.activeContact.name }}</span>
        <span v-if="chatStore.activeContact.isGroup" class="members">
          {{ chatStore.activeContact.members?.length || 0 }} 人
        </span>
      </div>
      <div class="actions">
        <button class="btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <button class="btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="12" cy="19" r="2"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="placeholder">
      选择联系人开始聊天
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  background: var(--bg-primary);
  border-bottom: 0.5px solid var(--border);
}

.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
}

.members {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.actions {
  display: flex;
  gap: var(--space-2);
}

.btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: var(--text-secondary);
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition);
}

.btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.placeholder {
  width: 100%;
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--text-sm);
}
</style>
