<script setup lang="ts">
import ContactCard from './ContactCard.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <div class="contact-list">
    <div class="header">
      <h2 class="title">信息</h2>
    </div>

    <div class="list">
      <ContactCard
        v-for="contact in chatStore.filteredContacts"
        :key="contact.id"
        :contact="contact"
        :is-active="contact.id === chatStore.activeContactId"
        @click="chatStore.selectContact(contact.id)"
      />

      <div v-if="chatStore.filteredContacts.length === 0" class="empty">
        没有找到联系人
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-list {
  width: 280px;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border-right: 0.5px solid var(--border);
}

.header {
  padding: var(--space-4);
  border-bottom: 0.5px solid var(--border);
}

.title {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
}

.list {
  flex: 1;
  overflow-y: auto;
}

.empty {
  padding: var(--space-8);
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--text-sm);
}
</style>
