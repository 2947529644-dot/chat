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
    <div class="avatar">
      <img :src="contact.avatar" :alt="contact.name" />
      <span v-if="contact.isGroup" class="badge">群</span>
    </div>

    <div class="content">
      <div class="row top">
        <span class="name">{{ contact.name }}</span>
        <span class="time">{{ formatLastMessageTime(contact.lastMessageTime) }}</span>
      </div>
      <div class="row bottom">
        <span class="message">{{ contact.lastMessage }}</span>
        <span v-if="contact.unreadCount > 0" class="unread">
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
  margin: var(--space-1) 0;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--accent);
  border-radius: 0 2px 2px 0;
  transition: height var(--transition-base);
}

.card:hover {
  background: var(--bg-muted);
}

.card.active {
  background: var(--bg-muted);
}

.card.active::before {
  height: 24px;
}

.avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar .badge {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: var(--font-semibold);
  color: var(--text-on-dark);
  background: var(--secondary);
  border-radius: var(--radius-sm);
  border: 2px solid var(--bg-elevated);
}

.content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.name {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time {
  font-size: var(--text-xs);
  color: var(--text-muted);
  flex-shrink: 0;
}

.message {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--text-on-dark);
  background: var(--accent);
  padding: 2px 7px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}
</style>
