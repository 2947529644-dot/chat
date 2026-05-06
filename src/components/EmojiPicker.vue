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
  bottom: 100%;
  left: 0;
  margin-bottom: var(--space-2);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: var(--space-2);
  width: 320px;
  z-index: 100;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--space-1);
  max-height: 260px;
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
  background: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);
}

.emoji:hover {
  background: var(--bg-secondary);
  transform: scale(1.15);
}
</style>
