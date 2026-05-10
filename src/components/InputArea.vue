<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import EmojiPicker from './EmojiPicker.vue'

const chatStore = useChatStore()
const input = ref('')
const showEmoji = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

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

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !chatStore.activeContact) return

  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result as string

    // Determine file type
    let type: 'image' | 'video' | 'file' = 'file'
    if (file.type.startsWith('image/')) {
      type = 'image'
    } else if (file.type.startsWith('video/')) {
      type = 'video'
    }

    chatStore.sendMediaMessage({
      content: type === 'file' ? file.name : '',
      type,
      fileName: file.name,
      fileSize: file.size,
      fileUrl: result,
      thumbnailUrl: type === 'image' ? result : undefined
    })

    // Reset input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="input-area">
    <div class="input-wrapper">
      <button class="tool-btn" :disabled="!chatStore.activeContact" title="附件" @click="triggerFileInput">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59718 21.9983 8.005 21.9983C6.41282 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.33 3.18C13.0806 2.42975 14.0991 2.00629 15.16 2.00629C16.2209 2.00629 17.2394 2.42975 17.99 3.18C18.7403 3.93064 19.1637 4.94913 19.1637 6.01C19.1637 7.07087 18.7403 8.08936 17.99 8.84L9.41 17.41C9.03472 17.7853 8.52621 17.9956 7.995 17.9956C7.46379 17.9956 6.95528 17.7853 6.58 17.41C6.20472 17.0347 5.99443 16.5262 5.99443 15.995C5.99443 15.4638 6.20472 14.9553 6.58 14.58L15.07 6.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <input
        ref="fileInput"
        type="file"
        accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
        style="display: none"
        @change="handleFileSelect"
      />

      <div class="emoji-wrapper">
        <button class="tool-btn" @click="showEmoji = !showEmoji" :disabled="!chatStore.activeContact" title="表情">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
            <path d="M8 14C8.5 15.5 10 16.5 12 16.5C14 16.5 15.5 15.5 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="9" cy="9" r="1" fill="currentColor"/>
            <circle cx="15" cy="9" r="1" fill="currentColor"/>
          </svg>
        </button>
        <EmojiPicker v-if="showEmoji" @select="selectEmoji" />
      </div>

      <input
        v-model="input"
        type="text"
        placeholder="输入消息..."
        :disabled="!chatStore.activeContact"
        @keydown="onKeydown"
        @focus="showEmoji = false"
      />

      <button
        class="send-btn"
        :disabled="!input.trim() || !chatStore.activeContact"
        @click="send"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-area {
  padding: var(--space-4) var(--space-6) var(--space-6);
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--bg-muted);
  border-radius: var(--radius-full);
  padding: var(--space-2);
}

.tool-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.tool-btn:hover:not(:disabled) {
  background: var(--bg-base);
  color: var(--text-primary);
}

.tool-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.emoji-wrapper {
  position: relative;
}

input[type="text"] {
  flex: 1;
  height: 36px;
  background: transparent;
  border: none;
  font-size: var(--text-base);
  color: var(--text-primary);
  outline: none;
}

input[type="text"]::placeholder {
  color: var(--text-muted);
}

input[type="text"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  border: none;
  border-radius: 50%;
  color: var(--text-on-dark);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: var(--accent);
  transform: scale(1.05);
}

.send-btn:disabled {
  background: var(--bg-base);
  color: var(--text-muted);
  cursor: not-allowed;
}
</style>
