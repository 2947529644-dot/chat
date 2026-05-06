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
    <div class="nav-left">
      <div class="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    </div>

    <div class="nav-center">
      <div class="search-box">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="搜索"
          :value="chatStore.searchQuery"
          @input="handleSearch"
        />
      </div>
    </div>

    <div class="nav-right">
      <div class="avatar">
        <img :src="chatStore.currentUser.avatar" :alt="chatStore.currentUser.name" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  background: var(--bg-primary);
  border-bottom: 0.5px solid var(--border);
}

.nav-left {
  width: 60px;
}

.logo {
  display: flex;
  align-items: center;
  color: var(--accent);
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 240px;
  height: 28px;
  padding: 0 var(--space-3);
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
}

.search-box input {
  flex: 1;
  border: none;
  background: none;
  font-size: var(--text-sm);
  color: var(--text-primary);
  outline: none;
}

.search-box input::placeholder {
  color: var(--text-secondary);
}

.nav-right {
  width: 60px;
  display: flex;
  justify-content: flex-end;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
