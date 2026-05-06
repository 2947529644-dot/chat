<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  select: [emoji: string]
}>()

// 分类标签
const categories = [
  { id: 'smileys', icon: '😀', label: '笑脸' },
  { id: 'gestures', icon: '👍', label: '手势' },
  { id: 'hearts', icon: '❤️', label: '爱心' },
  { id: 'objects', icon: '🎉', label: '物品' }
]

const activeCategory = ref('smileys')

// 分类表情
const emojiData: Record<string, string[]> = {
  smileys: [
    '😀', '😃', '😄', '😁', '😊', '🙂', '🙃', '😉',
    '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋',
    '😛', '😜', '🤪', '😝', '🤗', '🤭', '🤫', '🤔',
    '😐', '😑', '😶', '😏', '🙄', '😬', '🤥', '😌',
    '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮',
    '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰',
    '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓',
    '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈'
  ],
  gestures: [
    '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️',
    '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕',
    '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜',
    '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪',
    '🦵', '🦶', '👂', '👃', '🧠', '🫀', '🦷', '🦴',
    '👀', '👁️', '👅', '👄', '💋', '🩸', '👣', '🗣️',
    '👤', '👥', '🐵', '🙈', '🙉', '🙊', '🐒', '🦍',
    '🦧', '🐶', '🐕', '🦮', '🐩', '🐺', '🦊', '🦝'
  ],
  hearts: [
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤',
    '🤍', '💯', '❣️', '💕', '💞', '💓', '💗', '💖',
    '💘', '💝', '💟', '♥️', '❤️‍🔥', '❤️‍🩹', '💌', '😘',
    '😍', '🥰', '💑', '👩‍❤️‍👨', '💏', '👩‍❤️‍💋‍👨', '👨‍❤️‍💋‍👨', '👩‍❤️‍💋‍👩',
    '.family', '👫', '👭', '👬', '💏', '💑', '🎁', '🎀',
    '🎈', '🎉', '🎊', '🎉', '🎇', '🎆', '✨', '🌟',
    '⭐', '🌟', '✨', '💫', '✳️', '❇️', '❎', '⁉️',
    '‼️', '⁉️', '❓', '❔', '❕', '❌', '⭕', '✅'
  ],
  objects: [
    '🎉', '🎊', '🎈', '🎁', '🎄', 'Santa', '🎆', '🎇',
    '✨', '💫', '⭐', '🌟', '🔥', '💥', '☄️', '🌈',
    '☀️', '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️',
    '🌩️', '🌨️', '❄️', '☃️', '⛄', '🌬️', '💨', '💧',
    '☔', '☕', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹',
    '🍺', '🍻', '🥂', '🥃', '🥤', '🧋', '🧃', '🧉',
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓',
    '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥑'
  ]
}

function handleSelect(emoji: string) {
  emit('select', emoji)
}

function selectCategory(id: string) {
  activeCategory.value = id
}
</script>

<template>
  <div class="emoji-picker">
    <!-- 分类导航 -->
    <div class="category-bar">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-btn"
        :class="{ active: activeCategory === cat.id }"
        @click="selectCategory(cat.id)"
        :title="cat.label"
      >
        {{ cat.icon }}
      </button>
    </div>

    <!-- 表情网格 -->
    <div class="emoji-grid">
      <button
        v-for="emoji in emojiData[activeCategory]"
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
  left: 0;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 12px;
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.12);
  z-index: 100;
  width: 328px;
  overflow: hidden;
}

.category-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px 4px;
  background: rgba(245, 245, 247, 0.6);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
}

.category-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 28px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.15s ease;
  opacity: 0.6;
}

.category-btn:hover {
  background: rgba(0, 0, 0, 0.04);
  opacity: 0.8;
}

.category-btn.active {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08);
  opacity: 1;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
  padding: 8px;
  max-height: 264px;
  overflow-y: auto;
}

.emoji-grid::-webkit-scrollbar {
  width: 4px;
}

.emoji-grid::-webkit-scrollbar-track {
  background: transparent;
}

.emoji-grid::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.emoji-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  border-radius: 6px;
  transition: transform 0.12s ease, background-color 0.15s ease;
}

.emoji-btn:hover {
  background: rgba(0, 0, 0, 0.04);
  transform: scale(1.15);
}

.emoji-btn:active {
  transform: scale(0.9);
  background: rgba(0, 0, 0, 0.08);
}
</style>
