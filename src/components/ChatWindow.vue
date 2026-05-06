<script setup lang="ts">
import ChatHeader from './ChatHeader.vue'
import MessageList from './MessageList.vue'
import InputArea from './InputArea.vue'
</script>

<template>
  <main class="chat-window">
    <ChatHeader />
    <MessageList />
    <InputArea />
  </main>
</template>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-canvas);
  min-width: 0;
}
</style>
