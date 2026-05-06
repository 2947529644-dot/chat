<script setup lang="ts">
import type { Message } from '@/types'
import { formatTime } from '@/utils/format'

defineProps<{
  message: Message
  showSender?: boolean
}>()
</script>

<template>
  <div
    class="message-bubble"
    :class="message.isMine ? 'outgoing' : 'incoming'"
  >
    <!-- Sender info for group chat -->
    <div v-if="showSender && !message.isMine" class="sender-info">
      <img
        :src="message.senderAvatar"
        :alt="message.senderName"
        class="sender-avatar"
      />
      <span class="sender-name">{{ message.senderName }}</span>
    </div>

    <!-- Message content -->
    <div class="message-content">
      <div class="bubble">
        <span class="text">{{ message.content }}</span>
      </div>
      <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
    </div>
  </div>
</template>

<style scoped>
.message-bubble {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-xs);
  max-width: 65%;
  position: relative;
}

/* Incoming message - left aligned */
.message-bubble.incoming {
  align-self: flex-start;
}

.message-bubble.incoming .message-content {
  align-items: flex-start;
}

.message-bubble.incoming .bubble {
  background: var(--color-surface-pearl);
  border-radius: var(--radius-4xl) var(--radius-4xl) var(--radius-4xl) var(--radius-md);
  color: var(--color-ink);
  border: 0.5px solid var(--color-hairline);
}

.message-bubble.incoming .timestamp {
  align-self: flex-start;
  padding-left: var(--spacing-md);
}

/* Outgoing message - right aligned */
.message-bubble.outgoing {
  align-self: flex-end;
}

.message-bubble.outgoing .message-content {
  align-items: flex-end;
}

.message-bubble.outgoing .bubble {
  background: var(--color-primary);
  border-radius: var(--radius-4xl) var(--radius-4xl) var(--radius-md) var(--radius-4xl);
  color: var(--color-on-primary);
}

.message-bubble.outgoing .timestamp {
  align-self: flex-end;
  padding-right: var(--spacing-md);
}

/* Sender info */
.sender-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: 6px;
  padding-left: var(--spacing-lg);
}

.sender-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 0.5px solid var(--color-divider);
}

.sender-name {
  font-family: var(--font-text);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink-secondary);
  letter-spacing: var(--letter-spacing-caption);
}

/* Message content */
.message-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bubble {
  padding: var(--spacing-sm) var(--spacing-lg);
  position: relative;
  max-width: 100%;
}

.text {
  font-family: var(--font-text);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.35;
  letter-spacing: var(--letter-spacing-body);
  word-wrap: break-word;
  white-space: pre-wrap;
}

.timestamp {
  font-family: var(--font-text);
  font-size: var(--font-size-caption2);
  font-weight: var(--font-weight-regular);
  color: var(--color-ink-muted);
  letter-spacing: var(--letter-spacing-caption);
  margin-top: 2px;
}

/* Hover effect */
.message-bubble.outgoing .bubble {
  box-shadow: 0 1px 2px rgba(0, 113, 227, 0.15);
}

.message-bubble.incoming .bubble {
  box-shadow: var(--shadow-subtle);
}
</style>
