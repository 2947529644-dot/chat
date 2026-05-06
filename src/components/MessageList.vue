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
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
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
      <MessageBubble
        v-for="message in chatStore.activeMessages"
        :key="message.id"
        :message="message"
        :show-sender="chatStore.activeContact?.isGroup && !message.isMine"
      />

      <div v-if="chatStore.activeMessages.length === 0" class="empty-state">
        <p>暂无消息</p>
        <p class="hint">发送一条消息开始聊天</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.messages-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-ink-muted-48);
}

.empty-state p {
  margin: 0;
}

.empty-state .hint {
  font-size: var(--font-size-caption);
  margin-top: var(--spacing-xs);
}
</style>
