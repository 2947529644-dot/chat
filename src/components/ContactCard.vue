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
    class="card"
    :class="{ active: isActive }"
    @click="$emit('click')"
  >
    <img :src="contact.avatar" :alt="contact.name" class="avatar" />

    <div class="content">
      <div class="row">
        <span class="name">{{ contact.name }}</span>
        <span class="time">{{ formatLastMessageTime(contact.lastMessageTime) }}</span>
      </div>
      <div class="row">
        <span class="message">{{ contact.lastMessage }}</span>
        <span v-if="contact.unreadCount > 0" class="badge">
          {{ contact.unreadCount > 99 ? '99+' : contact.unreadCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  transition: background var(--transition);
}

.card:hover {
  background: var(--bg-secondary);
}

.card.active {
  background: var(--bg-tertiary);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.name {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  flex-shrink: 0;
}

.message {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: white;
  background: var(--accent);
  padding: 2px 6px;
  border-radius: 10px;
  flex-shrink: 0;
}
</style>
