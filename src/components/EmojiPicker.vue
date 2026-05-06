<script setup lang="ts">
const emit = defineEmits<{
  select: [emoji: string]
}>()

const emojis = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊',
  '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘',
  '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝',
  '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐',
  '😑', '😶', '😏', '😒', '🙄', '😬', '😔', '😪',
  '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵',
  '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓',
  '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲',
  '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢',
  '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫',
  '🥱', '😤', '😡', '😠', '🤬', '👍', '👎', '👏',
  '🙌', '🤝', '💪', '🎉', '❤️', '💔', '💕', '💖'
]

function select(emoji: string) {
  emit('select', emoji)
}
</script>

<template>
  <div class="picker">
    <div class="grid">
      <button
        v-for="emoji in emojis"
        :key="emoji"
        class="emoji"
        @click="select(emoji)"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.picker {
  position: absolute;
  bottom: calc(100% + var(--space-2));
  left: 0;
  background: var(--bg-glass);
  backdrop-filter: blur(var(--blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--blur)) saturate(180%);
  border: var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-glass);
  padding: var(--space-3);
  width: 328px;
  z-index: 100;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--space-1);
  max-height: 280px;
  overflow-y: auto;
}

.emoji {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.emoji:hover {
  background: var(--bg-muted);
  transform: scale(1.15);
}
</style>