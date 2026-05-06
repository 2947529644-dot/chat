<script setup lang="ts">
import ChatHeader from './ChatHeader.vue'
import MessageList from './MessageList.vue'
import InputArea from './InputArea.vue'
</script>

<template>
  <main class="chat">
    <ChatHeader />
    <MessageList />
    <InputArea />
  </main>
</template>

<style scoped>
.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
  min-width: 0;
}
</style>