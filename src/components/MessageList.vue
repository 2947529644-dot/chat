<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'
import MessageBubble from './MessageBubble.vue'

const chatStore = useChatStore()
const messageContainer = ref<HTMLElement | null>(null)

// Auto-scroll to bottom when new messages arrive
watch(
  () => chatStore.activeMessages.length,
  async () => {
    await nextTick()
    if (messageContainer.value) {
      messageContainer.value.scrollTo({
        top: messageContainer.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  }
)

// Also scroll when changing contacts
watch(
  () => chatStore.activeContactId,
  async () => {
    await nextTick()
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  }
)
</script>

<template>
  <div ref="messageContainer" class="message-list">
    <div class="messages-wrapper">
      <div class="messages-content">
        <MessageBubble
          v-for="message in chatStore.activeMessages"
          :key="message.id"
          :message="message"
          :show-sender="chatStore.activeContact?.isGroup && !message.isMine"
        />
      </div>

      <div v-if="chatStore.activeMessages.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="empty-title">暂无消息</p>
        <p class="empty-hint">发送一条消息开始聊天</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient(180deg, var(--color-canvas) 0%, var(--color-canvas-parchment) 100%);
  position: relative;
}

.message-list::-webkit-scrollbar {
  width: 8px;
}

.message-list::-webkit-scrollbar-track {
  background: transparent;
}

.message-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

.message-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.messages-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: var(--spacing-2xl);
}

.messages-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-5xl);
  gap: var(--spacing-lg);
}

.empty-icon {
  color: var(--color-ink-muted);
  opacity: 0.3;
}

.empty-title {
  font-family: var(--font-text);
  font-size: var(--font-size-headline);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink-secondary);
  margin: 0;
  letter-spacing: var(--letter-spacing-headline);
}

.empty-hint {
  font-family: var(--font-text);
  font-size: var(--font-size-subhead);
  color: var(--color-ink-muted);
  margin: 0;
}
</style>
