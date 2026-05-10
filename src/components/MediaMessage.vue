<script setup lang="ts">
import type { Message } from '@/types'
import { formatTime } from '@/utils/format'

defineProps<{
  message: Message
  showSender?: boolean
}>()

const emit = defineEmits<{
  preview: [url: string, type: 'image' | 'video']
}>()

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function getFileIcon(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  const iconMap: Record<string, string> = {
    pdf: '📄',
    doc: '📝', docx: '📝',
    xls: '📊', xlsx: '📊',
    ppt: '📽️', pptx: '📽️',
    zip: '📦', rar: '📦', '7z': '📦',
    mp3: '🎵', wav: '🎵',
    mp4: '🎬', avi: '🎬', mov: '🎬'
  }
  return iconMap[ext] || '📎'
}
</script>

<template>
  <div class="bubble" :class="{ outgoing: message.isMine }">
    <div v-if="showSender && !message.isMine" class="sender">
      <span class="sender-name">{{ message.senderName }}</span>
    </div>
    <div class="body">
      <!-- Image Message -->
      <div v-if="message.type === 'image'" class="media-content image-content">
        <img
          :src="message.fileUrl || message.content"
          :alt="message.fileName || '图片'"
          class="image-preview"
          @click="emit('preview', message.fileUrl || message.content, 'image')"
        />
      </div>

      <!-- Video Message -->
      <div v-else-if="message.type === 'video'" class="media-content video-content">
        <div class="video-thumbnail" @click="emit('preview', message.fileUrl || message.content, 'video')">
          <img v-if="message.thumbnailUrl" :src="message.thumbnailUrl" alt="视频封面" />
          <div class="video-placeholder" v-else>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <path d="M10 9L15 12L10 15V9Z" fill="currentColor"/>
            </svg>
          </div>
          <div class="play-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z"/>
            </svg>
          </div>
        </div>
        <span v-if="message.fileName" class="video-name">{{ message.fileName }}</span>
      </div>

      <!-- File Message -->
      <div v-else-if="message.type === 'file'" class="media-content file-content">
        <div class="file-icon">{{ getFileIcon(message.fileName || '') }}</div>
        <div class="file-info">
          <span class="file-name">{{ message.fileName || '未知文件' }}</span>
          <span v-if="message.fileSize" class="file-size">{{ formatFileSize(message.fileSize) }}</span>
        </div>
        <button class="download-btn" title="下载">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Text Message -->
      <div v-else class="text">{{ message.content }}</div>

      <div class="meta">
        <span class="time">{{ formatTime(message.timestamp) }}</span>
        <span v-if="message.isMine" class="read-status" :class="{ read: message.isRead }">
          <svg v-if="message.isRead" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bubble {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  max-width: 60%;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.bubble:not(.outgoing) {
  align-self: flex-start;
}

.bubble.outgoing {
  align-self: flex-end;
}

.sender {
  padding-left: var(--space-4);
}

.sender-name {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.bubble:not(.outgoing) .body {
  align-items: flex-start;
}

.bubble.outgoing .body {
  align-items: flex-end;
}

.text {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  line-height: 1.45;
  word-wrap: break-word;
}

.bubble:not(.outgoing) .text {
  background: var(--bg-elevated);
  border-radius: var(--radius-2xl) var(--radius-2xl) var(--radius-2xl) var(--radius-sm);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}

.bubble.outgoing .text {
  background: var(--bubble-outgoing);
  border-radius: var(--radius-2xl) var(--radius-2xl) var(--radius-sm) var(--radius-2xl);
  color: var(--text-on-dark);
}

/* Media Content Styles */
.media-content {
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.bubble:not(.outgoing) .media-content {
  background: var(--bg-elevated);
  box-shadow: var(--shadow-sm);
}

.bubble.outgoing .media-content {
  background: var(--bubble-outgoing);
}

/* Image */
.image-content {
  cursor: pointer;
}

.image-preview {
  max-width: 280px;
  max-height: 280px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  display: block;
}

/* Video */
.video-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-2);
}

.video-thumbnail {
  position: relative;
  width: 280px;
  height: 160px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-muted);
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all var(--transition-base);
}

.video-thumbnail:hover .play-button {
  background: rgba(0, 0, 0, 0.8);
  transform: translate(-50%, -50%) scale(1.1);
}

.video-name {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  padding: 0 var(--space-2);
}

/* File */
.file-content {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  min-width: 240px;
}

.file-icon {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-muted);
  border-radius: var(--radius-lg);
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.file-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.download-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-muted);
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.download-btn:hover {
  background: var(--bg-base);
  color: var(--text-primary);
}

.meta {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.time {
  font-size: var(--text-xs);
  color: var(--text-muted);
  padding: 0 var(--space-2);
}

.read-status {
  display: flex;
  align-items: center;
  color: var(--text-muted);
}

.read-status.read {
  color: var(--accent);
}
</style>
