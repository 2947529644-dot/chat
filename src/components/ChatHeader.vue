<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { useSettingsStore } from '@/stores/settings'

const chatStore = useChatStore()
const settingsStore = useSettingsStore()

function openProfile() {
  if (chatStore.activeContact) {
    settingsStore.openProfile(chatStore.activeContact.id)
  }
}
</script>

<template>
  <header class="header">
    <div v-if="chatStore.activeContact" class="content">
      <div class="info" @click="openProfile">
        <div class="avatar">
          <img :src="chatStore.activeContact.avatar" :alt="chatStore.activeContact.name" />
        </div>
        <div class="meta">
          <h2 class="name">{{ chatStore.activeContact.name }}</h2>
          <span v-if="chatStore.activeContact.isGroup" class="members">
            {{ chatStore.activeContact.members?.length || 0 }} 位成员
          </span>
        </div>
      </div>
      <div class="actions">
        <button class="btn" title="搜索">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="btn" title="更多">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="placeholder">
      选择一个对话开始聊天
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 72px;
  background: var(--bg-glass);
  backdrop-filter: blur(var(--blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--blur)) saturate(180%);
  border-bottom: 1px solid var(--border);
}

.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
}

.info {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.info:hover {
  opacity: 0.8;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.members {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.actions {
  display: flex;
  gap: var(--space-2);
}

.btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn:hover {
  background: var(--bg-muted);
  color: var(--text-primary);
}

.placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: var(--text-sm);
}
</style>