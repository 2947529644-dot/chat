<script setup lang="ts">
import type { Message } from '@/types'
import { formatTime } from '@/utils/format'

defineProps<{
  message: Message
  showSender?: boolean
}>()
</script>

<template>
  <div class="bubble" :class="message.isMine ? 'outgoing' : 'incoming'">
    <div v-if="showSender && !message.isMine" class="sender">
      <span class="sender-name">{{ message.senderName }}</span>
    </div>
    <div class="content">
      <div class="text">{{ message.content }}</div>
      <span class="time">{{ formatTime(message.timestamp) }}</span>
    </div>
  </div>
</template>

<style scoped>
.bubble {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 65%;
}

.incoming {
  align-self: flex-start;
}

.outgoing {
  align-self: flex-end;
}

.sender {
  padding-left: var(--space-3);
}

.sender-name {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.incoming .content {
  align-items: flex-start;
}

.outgoing .content {
  align-items: flex-end;
}

.text {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  line-height: 1.4;
  word-wrap: break-word;
}

.incoming .text {
  background: var(--bg-primary);
  border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm);
  color: var(--text-primary);
}

.outgoing .text {
  background: var(--bubble-outgoing);
  border-radius: var(--radius-xl) var(--radius-xl) var(--radius-sm) var(--radius-xl);
  color: white;
}

.time {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  padding: 0 var(--space-2);
}
</style>
