<script setup lang="ts">
import ChatHeader from './ChatHeader.vue'
import MessageList from './MessageList.vue'
import InputArea from './InputArea.vue'
</script>

<template>
  <div class="chat-window">
    <ChatHeader />
    <MessageList />
    <InputArea />
  </div>
</template>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  min-width: 0;
}
</style>
