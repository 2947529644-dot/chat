<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  url: string
  type: 'image' | 'video'
}>()

const emit = defineEmits<{
  close: []
}>()

const show = ref(false)

watch(() => props.url, (newUrl) => {
  show.value = !!newUrl
}, { immediate: true })

function close() {
  show.value = false
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="preview-overlay" @click.self="close" @keydown.esc="close">
        <button class="close-btn" @click="close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="preview-content">
          <img v-if="type === 'image'" :src="url" alt="预览图片" class="preview-image" />
          <video v-else :src="url" controls autoplay class="preview-video"></video>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: var(--space-8);
}

.close-btn {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all var(--transition-base);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.preview-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
}

.preview-video {
  max-width: 100%;
  max-height: 90vh;
  border-radius: var(--radius-lg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
