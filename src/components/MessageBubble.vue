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
    <!-- Sender info for group chat (non-mine messages) -->
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
        {{ message.content }}
      </div>
      <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
    </div>
  </div>
</template>

<style scoped>
.message-bubble {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-sm);
  max-width: 70%;
}

/* Incoming message (others) - left aligned */
.message-bubble.incoming {
  align-self: flex-start;
}

.message-bubble.incoming .message-content {
  align-items: flex-start;
}

.message-bubble.incoming .bubble {
  background-color: var(--color-canvas);
  border-radius: 18px 18px 18px 4px;
  color: var(--color-ink);
}

.message-bubble.incoming .timestamp {
  align-self: flex-start;
  margin-left: var(--spacing-xs);
}

/* Outgoing message (mine) - right aligned */
.message-bubble.outgoing {
  align-self: flex-end;
}

.message-bubble.outgoing .message-content {
  align-items: flex-end;
}

.message-bubble.outgoing .bubble {
  background-color: var(--color-primary);
  border-radius: 18px 18px 4px 18px;
  color: var(--color-on-primary);
}

.message-bubble.outgoing .timestamp {
  align-self: flex-end;
  margin-right: var(--spacing-xs);
}

/* Sender info */
.sender-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: 4px;
}

.sender-avatar {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-pill);
  object-fit: cover;
}

.sender-name {
  font-size: var(--font-size-fine-print);
  color: var(--color-ink-muted-48);
  font-weight: var(--font-weight-semibold);
}

/* Message content */
.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bubble {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-body);
  line-height: var(--line-height-normal);
  word-wrap: break-word;
  box-shadow: var(--shadow-message);
}

.timestamp {
  font-size: var(--font-size-fine-print);
  color: var(--color-ink-muted-48);
}
</style>
