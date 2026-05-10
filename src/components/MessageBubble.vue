<script setup lang="ts">
import type { Message } from '@/types'
import { formatTime } from '@/utils/format'

defineProps<{
  message: Message
  showSender?: boolean
}>()
</script>

<template>
  <div class="bubble" :class="{ outgoing: message.isMine }">
    <div v-if="showSender && !message.isMine" class="sender">
      <span class="sender-name">{{ message.senderName }}</span>
    </div>
    <div class="body">
      <div class="text">{{ message.content }}</div>
      <div class="meta">
        <span class="time">{{ formatTime(message.timestamp) }}</span>
        <span v-if="message.isMine" class="read-status" :class="{ read: message.isRead }">
          <svg v-if="message.isRead" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bubble {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  max-width: 60%;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.bubble:not(.outgoing) {
  align-self: flex-start;
}

.bubble.outgoing {
  align-self: flex-end;
}

.sender {
  padding-left: var(--space-4);
}

.sender-name {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.bubble:not(.outgoing) .body {
  align-items: flex-start;
}

.bubble.outgoing .body {
  align-items: flex-end;
}

.text {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  line-height: 1.45;
  word-wrap: break-word;
}

.bubble:not(.outgoing) .text {
  background: var(--bg-elevated);
  border-radius: var(--radius-2xl) var(--radius-2xl) var(--radius-2xl) var(--radius-sm);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}

.bubble.outgoing .text {
  background: var(--bubble-outgoing);
  border-radius: var(--radius-2xl) var(--radius-2xl) var(--radius-sm) var(--radius-2xl);
  color: var(--text-on-dark);
}

.meta {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.time {
  font-size: var(--text-xs);
  color: var(--text-muted);
  padding: 0 var(--space-2);
}

.read-status {
  display: flex;
  align-items: center;
  color: var(--text-muted);
}

.read-status.read {
  color: var(--accent);
}
</style>