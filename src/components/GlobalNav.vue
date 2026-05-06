<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

function handleSearch(event: Event) {
  const target = event.target as HTMLInputElement
  chatStore.setSearchQuery(target.value)
}
</script>

<template>
  <nav class="nav">
    <div class="nav-inner">
      <div class="logo">
        <div class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="search-container">
        <div class="search">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="搜索对话..."
            :value="chatStore.searchQuery"
            @input="handleSearch"
          />
        </div>
      </div>

      <div class="user">
        <div class="avatar">
          <img :src="chatStore.currentUser.avatar" :alt="chatStore.currentUser.name" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  height: 64px;
  background: var(--bg-glass);
  backdrop-filter: blur(var(--blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--blur)) saturate(180%);
  border-bottom: var(--glass-border);
  position: relative;
  z-index: 50;
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  max-width: 1600px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  border-radius: var(--radius-lg);
  color: var(--text-on-dark);
}

.search-container {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 var(--space-8);
}

.search {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  max-width: 400px;
  height: 40px;
  padding: 0 var(--space-4);
  background: var(--bg-muted);
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  transition: all var(--transition-base);
}

.search:focus-within {
  background: var(--bg-elevated);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
}

.search-icon {
  color: var(--text-muted);
  flex-shrink: 0;
}

.search input {
  flex: 1;
  border: none;
  background: none;
  font-size: var(--text-sm);
  color: var(--text-primary);
  outline: none;
}

.search input::placeholder {
  color: var(--text-muted);
}

.user {
  display: flex;
  align-items: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--transition-base);
}

.avatar:hover {
  border-color: var(--accent);
  transform: scale(1.05);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
