<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const { settings } = settingsStore

const themes = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
  { value: 'system', label: '跟随系统' }
] as const

const fontSizes = [
  { value: 'small', label: '小' },
  { value: 'medium', label: '中' },
  { value: 'large', label: '大' }
] as const
</script>

<template>
  <div class="modal-overlay" @click.self="settingsStore.closeSettings">
    <div class="modal">
      <header class="header">
        <h2>设置</h2>
        <button class="close-btn" @click="settingsStore.closeSettings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </header>

      <div class="content">
        <!-- Appearance -->
        <section class="section">
          <h3 class="section-title">外观</h3>

          <div class="setting-item">
            <span class="label">主题</span>
            <div class="options">
              <button
                v-for="theme in themes"
                :key="theme.value"
                class="option-btn"
                :class="{ active: settings.theme === theme.value }"
                @click="settingsStore.updateTheme(theme.value)"
              >
                {{ theme.label }}
              </button>
            </div>
          </div>

          <div class="setting-item">
            <span class="label">字体大小</span>
            <div class="options">
              <button
                v-for="size in fontSizes"
                :key="size.value"
                class="option-btn"
                :class="{ active: settings.fontSize === size.value }"
                @click="settingsStore.updateFontSize(size.value)"
              >
                {{ size.label }}
              </button>
            </div>
          </div>
        </section>

        <!-- Notifications -->
        <section class="section">
          <h3 class="section-title">通知</h3>

          <div class="setting-item toggle">
            <div class="toggle-info">
              <span class="label">消息提示音</span>
              <span class="desc">收到新消息时播放声音</span>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                :checked="settings.notifications.messageSound"
                @change="settingsStore.updateMessageSound(($event.target as HTMLInputElement).checked)"
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="toggle-info">
              <span class="label">桌面通知</span>
              <span class="desc">收到消息时显示桌面通知</span>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                :checked="settings.notifications.desktopNotification"
                @change="settingsStore.updateDesktopNotification(($event.target as HTMLInputElement).checked)"
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="toggle-info">
              <span class="label">@提及提醒</span>
              <span class="desc">群聊中有人@你时特别提醒</span>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                :checked="settings.notifications.mentionAlert"
                @change="settingsStore.updateMentionAlert(($event.target as HTMLInputElement).checked)"
              />
              <span class="slider"></span>
            </label>
          </div>
        </section>

        <!-- About -->
        <section class="section">
          <h3 class="section-title">关于</h3>
          <div class="about-info">
            <p>微信桌面版</p>
            <p class="version">版本 1.0.0</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 480px;
  max-height: 80vh;
  background: var(--bg-elevated);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--border);
}

.header h2 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.close-btn:hover {
  background: var(--bg-muted);
  color: var(--text-primary);
}

.content {
  padding: var(--space-4) var(--space-6) var(--space-6);
  overflow-y: auto;
  max-height: calc(80vh - 72px);
}

.section {
  margin-bottom: var(--space-6);
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-3);
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) 0;
}

.setting-item.toggle {
  padding: var(--space-4) 0;
}

.label {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.options {
  display: flex;
  gap: var(--space-1);
  background: var(--bg-muted);
  padding: 3px;
  border-radius: var(--radius-lg);
}

.option-btn {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.option-btn:hover {
  color: var(--text-primary);
}

.option-btn.active {
  background: var(--bg-elevated);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}

.toggle-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.switch {
  position: relative;
  width: 48px;
  height: 28px;
  cursor: pointer;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: var(--bg-muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.slider::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 22px;
  height: 22px;
  background: var(--bg-elevated);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.switch input:checked + .slider {
  background: var(--accent);
  border-color: var(--accent);
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}

.about-info {
  padding: var(--space-3) 0;
}

.about-info p {
  font-size: var(--text-base);
  color: var(--text-primary);
  margin: 0;
}

.version {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: var(--space-1);
}
</style>
