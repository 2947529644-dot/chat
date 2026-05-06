<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  select: [emoji: string]
}>()

// 常用表情列表
const emojis = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊',
  '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘',
  '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝',
  '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐',
  '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌',
  '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢',
  '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠',
  '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️',
  '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨',
  '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞',
  '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬',
  '👍', '👎', '👏', '🙌', '🤝', '💪', '🎉', '❤️'
]

function handleSelect(emoji: string) {
  emit('select', emoji)
}
</script>

<template>
  <div class="emoji-picker">
    <div class="emoji-grid">
      <button
        v-for="emoji in emojis"
        :key="emoji"
        class="emoji-btn"
        @click="handleSelect(emoji)"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.emoji-picker {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background: var(--color-canvas);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px;
  z-index: 100;
  width: 320px;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  max-height: 280px;
  overflow-y: auto;
}

.emoji-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color 0.15s, transform 0.1s;
}

.emoji-btn:hover {
  background: var(--color-surface-pearl);
  transform: scale(1.1);
}

.emoji-btn:active {
  transform: scale(0.95);
}
</style>
