<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

function handleSearch(event: Event) {
  const target = event.target as HTMLInputElement
  chatStore.setSearchQuery(target.value)
}
</script>

<template>
  <nav class="global-nav">
    <div class="nav-left">
      <div class="logo">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="currentColor" opacity="0.9"/>
          <path d="M8 12L11 15L16 9" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="nav-center">
      <div class="search-box">
        <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
          <path d="M20 20L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="搜索"
          :value="chatStore.searchQuery"
          @input="handleSearch"
          class="search-input"
        />
      </div>
    </div>

    <div class="nav-right">
      <div class="user-avatar">
        <img :src="chatStore.currentUser.avatar" :alt="chatStore.currentUser.name" />
      </div>
      <button class="settings-btn" title="设置">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.global-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 var(--spacing-3xl);
  background: var(--color-surface-black);
  backdrop-filter: saturate(180%) blur(var(--blur-md));
  -webkit-backdrop-filter: saturate(180%) blur(var(--blur-md));
  color: var(--color-on-dark);
  position: relative;
  z-index: var(--z-sticky);
}

.global-nav::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.5px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent);
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-on-dark);
  opacity: 0.95;
  transition: opacity var(--transition-fast);
}

.logo:hover {
  opacity: 1;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 var(--spacing-3xl);
  max-width: 480px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 320px;
  height: 32px;
  padding: 0 var(--spacing-md);
  background: rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-pill);
  border: 0.5px solid rgba(255, 255, 255, 0.08);
  transition: all var(--transition-normal);
}

.search-box:focus-within {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.3);
}

.search-icon {
  color: var(--color-on-dark);
  opacity: 0.5;
  flex-shrink: 0;
  transition: opacity var(--transition-fast);
}

.search-box:focus-within .search-icon {
  opacity: 0.7;
}

.search-input {
  flex: 1;
  margin-left: var(--spacing-sm);
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-on-dark);
  font-size: var(--font-size-footnote);
  font-family: var(--font-text);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--letter-spacing-caption);
}

.search-input::placeholder {
  color: var(--color-on-dark);
  opacity: 0.5;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 0.5px solid rgba(255, 255, 255, 0.15);
  transition: all var(--transition-fast);
}

.user-avatar:hover {
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.settings-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--color-on-dark);
  opacity: 0.7;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.settings-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  opacity: 1;
}

.settings-btn:active {
  transform: scale(0.92);
}
</style>
