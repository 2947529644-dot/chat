<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const inputValue = ref('')

function handleSend() {
  if (!inputValue.value.trim() || !chatStore.activeContact) return

  chatStore.sendMessage(inputValue.value)
  inputValue.value = ''
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}

function handleAttachment() {
  // TODO: Implement attachment functionality
  console.log('Attachment clicked')
}

function handleEmoji() {
  // TODO: Implement emoji picker functionality
  console.log('Emoji clicked')
}
</script>

<template>
  <div class="input-area">
    <button
      class="icon-btn"
      @click="handleAttachment"
      :disabled="!chatStore.activeContact"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V20M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <button
      class="icon-btn"
      @click="handleEmoji"
      :disabled="!chatStore.activeContact"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M8 9C8.5 9 9 8.5 9 8C9 7.5 8.5 7 8 7C7.5 7 7 7.5 7 8C7 8.5 7.5 9 8 9Z" fill="currentColor"/>
        <path d="M16 9C16.5 9 17 8.5 17 8C17 7.5 16.5 7 16 7C15.5 7 15 7.5 15 8C15 8.5 15.5 9 16 9Z" fill="currentColor"/>
        <path d="M8 14C8 14 9.5 17 12 17C14.5 17 16 14 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <input
      v-model="inputValue"
      type="text"
      class="input-field"
      placeholder="输入消息..."
      :disabled="!chatStore.activeContact"
      @keydown="handleKeydown"
    />

    <button
      class="send-btn"
      @click="handleSend"
      :disabled="!inputValue.trim() || !chatStore.activeContact"
    >
      发送
    </button>
  </div>
</template>

<style scoped>
.input-area {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  background: var(--color-canvas);
  border-top: 1px solid var(--color-divider-soft);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--color-ink-muted-48);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color 0.2s, color 0.2s, opacity 0.2s;
}

.icon-btn:hover:not(:disabled) {
  background: var(--color-surface-pearl);
  color: var(--color-ink);
}

.icon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-field {
  flex: 1;
  height: 44px;
  padding: 0 16px;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  font-family: var(--font-text);
  font-size: var(--font-size-body);
  color: var(--color-ink);
  background: var(--color-surface-pearl);
  transition: border-color 0.2s, background-color 0.2s, opacity 0.2s;
}

.input-field::placeholder {
  color: var(--color-ink-muted-48);
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-canvas);
}

.input-field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn {
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-family: var(--font-text);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: var(--color-primary-focus);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
