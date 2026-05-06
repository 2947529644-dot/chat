<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <header class="chat-header">
    <div v-if="chatStore.activeContact" class="header-content">
      <div class="contact-info">
        <img :src="chatStore.activeContact.avatar" :alt="chatStore.activeContact.name" class="avatar" />
        <div class="info-text">
          <span class="contact-name">{{ chatStore.activeContact.name }}</span>
          <span v-if="chatStore.activeContact.isGroup" class="member-count">
            {{ chatStore.activeContact.members?.length || 0 }} 位成员
          </span>
        </div>
      </div>
      <div class="actions">
        <button class="action-btn" title="搜索">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M20 20L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="action-btn" title="更多">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="placeholder">
      <span class="placeholder-text">选择联系人开始聊天</span>
    </div>
  </header>
</template>

<style scoped>
.chat-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-3xl);
  background: var(--color-canvas);
  backdrop-filter: saturate(180%) blur(var(--blur-md));
  -webkit-backdrop-filter: saturate(180%) blur(var(--blur-md));
  position: relative;
}

.chat-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--spacing-3xl);
  right: var(--spacing-3xl);
  height: 0.5px;
  background: var(--color-divider);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 0.5px solid var(--color-divider);
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-name {
  font-family: var(--font-display);
  font-size: var(--font-size-headline);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
  letter-spacing: var(--letter-spacing-headline);
  line-height: var(--line-height-headline);
}

.member-count {
  font-family: var(--font-text);
  font-size: var(--font-size-footnote);
  font-weight: var(--font-weight-regular);
  color: var(--color-ink-secondary);
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
  border-radius: 50%;
  background: transparent;
  color: var(--color-ink-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.04);
  color: var(--color-ink);
}

.action-btn:active {
  transform: scale(0.92);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.placeholder-text {
  font-family: var(--font-text);
  font-size: var(--font-size-subhead);
  font-weight: var(--font-weight-regular);
  color: var(--color-ink-muted);
}
</style>