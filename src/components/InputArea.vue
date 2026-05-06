<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import EmojiPicker from './EmojiPicker.vue'

const chatStore = useChatStore()
const inputValue = ref('')
const showEmojiPicker = ref(false)

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
  console.log('Attachment clicked')
}

function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value
}

function handleEmojiSelect(emoji: string) {
  inputValue.value += emoji
  showEmojiPicker.value = false
}

function closeEmojiPicker() {
  showEmojiPicker.value = false
}
</script>

<template>
  <div class="input-area">
    <div class="input-container">
      <div class="toolbar">
        <button
          class="tool-btn"
          @click="handleAttachment"
          :disabled="!chatStore.activeContact"
          title="添加附件"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="emoji-wrapper">
          <button
            class="tool-btn"
            @click="toggleEmojiPicker"
            :disabled="!chatStore.activeContact"
            title="表情"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 9C8.5 9 9 8.5 9 8C9 7.5 8.5 7 8 7C7.5 7 7 7.5 7 8C7 8.5 7.5 9 8 9Z" fill="currentColor"/>
              <path d="M16 9C16.5 9 17 8.5 17 8C17 7.5 16.5 7 16 7C15.5 7 15 7.5 15 8C15 8.5 15.5 9 16 9Z" fill="currentColor"/>
              <path d="M8 14C8 14 9.5 17 12 17C14.5 17 16 14 16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <EmojiPicker
            v-if="showEmojiPicker"
            @select="handleEmojiSelect"
          />
        </div>
      </div>

      <input
        v-model="inputValue"
        type="text"
        class="input-field"
        placeholder="信息"
        :disabled="!chatStore.activeContact"
        @keydown="handleKeydown"
        @focus="closeEmojiPicker"
      />

      <button
        class="send-btn"
        @click="handleSend"
        :disabled="!inputValue.trim() || !chatStore.activeContact"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-area {
  padding: var(--spacing-md) var(--spacing-2xl) var(--spacing-xl);
  background: var(--color-canvas);
  position: relative;
}

.input-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: var(--spacing-3xl);
  right: var(--spacing-3xl);
  height: 0.5px;
  background: var(--color-divider);
}

.input-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--color-surface-pearl);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-xs);
  border: 0.5px solid var(--color-divider);
  transition: all var(--transition-normal);
}

.input-container:focus-within {
  background: var(--color-canvas);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.15);
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding-left: var(--spacing-xs);
}

.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--color-ink-secondary);
  cursor: pointer;
  border-radius: 50%;
  transition: all var(--transition-fast);
}

.tool-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.04);
  color: var(--color-ink);
}

.tool-btn:active:not(:disabled) {
  transform: scale(0.92);
}

.tool-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.emoji-wrapper {
  position: relative;
}

.input-field {
  flex: 1;
  height: 36px;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-text);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  color: var(--color-ink);
  letter-spacing: var(--letter-spacing-body);
}

.input-field::placeholder {
  color: var(--color-ink-muted);
}

.input-field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-on-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: scale(1.05);
}

.send-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.send-btn:disabled {
  background: var(--color-surface-elevated);
  color: var(--color-ink-muted);
  cursor: not-allowed;
}
</style>
