<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'
import MessageBubble from './MessageBubble.vue'

const chatStore = useChatStore()
const container = ref<HTMLElement | null>(null)

watch(
  () => chatStore.activeMessages.length,
  async () => {
    await nextTick()
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight
    }
  }
)

watch(
  () => chatStore.activeContactId,
  async () => {
    await nextTick()
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight
    }
  }
)
</script>

<template>
  <div ref="container" class="message-list">
    <div class="messages">
      <MessageBubble
        v-for="message in chatStore.activeMessages"
        :key="message.id"
        :message="message"
        :show-sender="chatStore.activeContact?.isGroup && !message.isMine"
      />

      <div v-if="chatStore.activeMessages.length === 0" class="empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <p>暂无消息</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
  background: var(--bg-secondary);
}

.messages {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.empty p {
  margin: 0;
}
</style>