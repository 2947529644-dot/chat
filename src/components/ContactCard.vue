<script setup lang="ts">
import type { Contact } from '@/types'
import { formatLastMessageTime } from '@/utils/format'

defineProps<{
  contact: Contact
  isActive: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="contact-card"
    :class="{ 'is-active': isActive }"
    @click="$emit('click')"
  >
    <div class="avatar-wrapper">
      <img
        :src="contact.avatar"
        :alt="contact.name"
        class="avatar"
      />
      <span v-if="contact.isGroup" class="group-badge">群</span>
    </div>

    <div class="content">
      <div class="header">
        <span class="name">{{ contact.name }}</span>
        <span class="time">{{ formatLastMessageTime(contact.lastMessageTime) }}</span>
      </div>
      <div class="footer">
        <span class="message">{{ contact.lastMessage }}</span>
        <span
          v-if="contact.unreadCount > 0"
          class="unread-badge"
        >
          {{ contact.unreadCount > 99 ? '99+' : contact.unreadCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-card {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-md);
  margin: var(--spacing-xs) 0;
  cursor: pointer;
  background: transparent;
  border-radius: var(--radius-lg);
  position: relative;
  transition: all var(--transition-fast);
}

.contact-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--color-primary);
  border-radius: 0 2px 2px 0;
  transition: height var(--transition-normal);
}

.contact-card:hover {
  background: rgba(0, 0, 0, 0.03);
}

.contact-card.is-active {
  background: rgba(0, 113, 227, 0.08);
}

.contact-card.is-active::before {
  height: 24px;
}

.contact-card:active {
  transform: scale(0.98);
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-xl);
  object-fit: cover;
  background: var(--color-surface-elevated);
}

.group-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  padding: 2px 5px;
  font-family: var(--font-text);
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-on-dark);
  background: var(--color-surface-dark);
  border-radius: var(--radius-xs);
  border: 2px solid var(--color-canvas-parchment);
}

.content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 2px;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.name {
  font-family: var(--font-text);
  font-size: var(--font-size-subhead);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.time {
  flex-shrink: 0;
  font-family: var(--font-text);
  font-size: var(--font-size-caption2);
  font-weight: var(--font-weight-regular);
  color: var(--color-ink-muted);
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.message {
  flex: 1;
  font-family: var(--font-text);
  font-size: var(--font-size-footnote);
  color: var(--color-ink-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-badge {
  flex-shrink: 0;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-family: var(--font-text);
  font-size: var(--font-size-caption2);
  font-weight: var(--font-weight-semibold);
  line-height: 20px;
  text-align: center;
  color: var(--color-on-primary);
  background: var(--color-primary);
  border-radius: 10px;
}
</style>
