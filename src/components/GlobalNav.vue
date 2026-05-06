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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
          <path d="M8 12L11 15L16 9" stroke="var(--color-surface-black)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="nav-center">
      <div class="search-box">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="搜索联系人..."
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M12 1V4M12 20V23M4.22 4.22L6.34 6.34M17.66 17.66L19.78 19.78M1 12H4M20 12H23M4.22 19.78L6.34 17.66M17.66 6.34L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
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
  height: 44px;
  padding: 0 var(--spacing-lg);
  background-color: var(--color-surface-black);
  color: var(--color-on-dark);
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
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 var(--spacing-lg);
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 28px;
  padding: 0 var(--spacing-sm);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-pill);
  transition: background-color 0.2s ease;
}

.search-box:focus-within {
  background-color: rgba(255, 255, 255, 0.15);
}

.search-icon {
  color: var(--color-on-dark);
  opacity: 0.6;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  margin-left: var(--spacing-xs);
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-on-dark);
  font-size: var(--font-size-caption);
  font-family: var(--font-text);
}

.search-input::placeholder {
  color: var(--color-on-dark);
  opacity: 0.6;
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
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.settings-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
