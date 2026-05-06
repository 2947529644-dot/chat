<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import EmojiPicker from './EmojiPicker.vue'

const chatStore = useChatStore()
const input = ref('')
const showEmoji = ref(false)

function send() {
  if (!input.value.trim() || !chatStore.activeContact) return
  chatStore.sendMessage(input.value)
  input.value = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

function selectEmoji(emoji: string) {
  input.value += emoji
  showEmoji.value = false
}
</script>

<template>
  <div class="input-area">
    <button class="btn" :disabled="!chatStore.activeContact" title="附件">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </button>

    <div class="emoji-wrap">
      <button class="btn" @click="showEmoji = !showEmoji" :disabled="!chatStore.activeContact" title="表情">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <circle cx="9" cy="9" r="1" fill="currentColor"/>
          <circle cx="15" cy="9" r="1" fill="currentColor"/>
        </svg>
      </button>
      <EmojiPicker v-if="showEmoji" @select="selectEmoji" />
    </div>

    <input
      v-model="input"
      type="text"
      placeholder="信息"
      :disabled="!chatStore.activeContact"
      @keydown="onKeydown"
      @focus="showEmoji = false"
    />

    <button
      class="send-btn"
      :disabled="!input.trim() || !chatStore.activeContact"
      @click="send"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.input-area {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-primary);
  border-top: 0.5px solid var(--border);
}

.btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: var(--text-secondary);
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition);
}

.btn:hover:not(:disabled) {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.emoji-wrap {
  position: relative;
}

input {
  flex: 1;
  height: 36px;
  padding: 0 var(--space-3);
  border: none;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  font-size: var(--text-base);
  color: var(--text-primary);
  outline: none;
  transition: all var(--transition);
}

input:focus {
  background: var(--bg-tertiary);
}

input::placeholder {
  color: var(--text-secondary);
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  cursor: pointer;
  transition: all var(--transition);
}

.send-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: scale(1.05);
}

.send-btn:disabled {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  cursor: not-allowed;
}
</style>
