<script setup lang="ts">
import ContactCard from './ContactCard.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <div class="contact-list">
    <div class="contact-list__header">
      <span class="contact-list__title">联系人</span>
      <span class="contact-list__count">{{ chatStore.filteredContacts.length }}</span>
    </div>

    <div class="contact-list__content">
      <template v-if="chatStore.filteredContacts.length > 0">
        <ContactCard
          v-for="contact in chatStore.filteredContacts"
          :key="contact.id"
          :contact="contact"
          :is-active="contact.id === chatStore.activeContactId"
          @click="chatStore.selectContact(contact.id)"
        />
      </template>

      <div v-else class="contact-list__empty">
        <span class="contact-list__empty-text">无搜索结果</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-list {
  width: 280px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-canvas-parchment);
}

.contact-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--color-border-default, #e5e5e5);
}

.contact-list__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary, #191919);
}

.contact-list__count {
  font-size: 12px;
  color: var(--text-secondary, #888);
}

.contact-list__content {
  flex: 1;
  overflow-y: auto;
}

.contact-list__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.contact-list__empty-text {
  font-size: 14px;
  color: var(--text-secondary, #b2b2b2);
}
</style>
