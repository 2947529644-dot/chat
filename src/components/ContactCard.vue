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
    :class="{ 'contact-card--active': isActive }"
    @click="$emit('click')"
  >
    <div class="contact-card__avatar-wrapper">
      <img
        :src="contact.avatar"
        :alt="contact.name"
        class="contact-card__avatar"
      />
      <span v-if="contact.isGroup" class="contact-card__group-badge">群</span>
    </div>

    <div class="contact-card__content">
      <div class="contact-card__header">
        <span class="contact-card__name">{{ contact.name }}</span>
        <span class="contact-card__time">{{ formatLastMessageTime(contact.lastMessageTime) }}</span>
      </div>
      <div class="contact-card__footer">
        <span class="contact-card__message">{{ contact.lastMessage }}</span>
        <span
          v-if="contact.unreadCount > 0"
          class="contact-card__unread"
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
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  background-color: var(--bg-secondary, #f5f5f5);
  border-left: 3px solid transparent;
  transition: background-color 0.2s ease;
}

.contact-card:hover {
  background-color: var(--bg-hover, #ebebeb);
}

.contact-card--active {
  background-color: var(--bg-active, #d9d9d9);
  border-left-color: var(--primary-color, #07c160);
}

.contact-card__avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.contact-card__avatar {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  object-fit: cover;
}

.contact-card__group-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  padding: 1px 4px;
  font-size: 10px;
  color: var(--text-primary, #fff);
  background-color: var(--primary-color, #07c160);
  border-radius: 2px;
}

.contact-card__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.contact-card__name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary, #191919);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-card__time {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--text-secondary, #b2b2b2);
  margin-left: 8px;
}

.contact-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.contact-card__message {
  flex: 1;
  font-size: 13px;
  color: var(--text-secondary, #b2b2b2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-card__unread {
  flex-shrink: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  margin-left: 8px;
  font-size: 11px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  color: var(--text-primary, #fff);
  background-color: var(--danger-color, #f55858);
  border-radius: 9px;
}
</style>
