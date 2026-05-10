<script setup lang="ts">
import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useSettingsStore } from '@/stores/settings'

const chatStore = useChatStore()
const settingsStore = useSettingsStore()

const profile = computed(() => {
  const contactId = settingsStore.selectedProfileContactId
  if (contactId) {
    return chatStore.contacts.find(c => c.id === contactId)
  }
  return chatStore.currentUser
})

const isCurrentUser = computed(() => !settingsStore.selectedProfileContactId)
</script>

<template>
  <div class="modal-overlay" @click.self="settingsStore.closeProfile">
    <div class="modal" v-if="profile">
      <header class="header">
        <button class="close-btn" @click="settingsStore.closeProfile">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </header>

      <div class="content">
        <!-- Avatar & Name -->
        <div class="profile-header">
          <div class="avatar-large">
            <img :src="profile.avatar" :alt="profile.name" />
          </div>
          <h2 class="name">{{ profile.name }}</h2>
          <p v-if="'bio' in profile && profile.bio" class="bio">{{ profile.bio }}</p>
          <p v-if="'isGroup' in profile && profile.isGroup" class="group-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 21V19C22.9993 18.1637 22.7361 17.3542 22.25 16.6927C21.7639 16.0312 21.0796 15.5537 20.3 15.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 11C18.2091 11 20 9.20914 20 7C20 4.79086 18.2091 3 16 3C14.5 3 13.2 3.8 12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            群聊 · {{ ('members' in profile && profile.members?.length) || 0 }} 位成员
          </p>
        </div>

        <!-- Group Members -->
        <div v-if="'isGroup' in profile && profile.isGroup && profile.members" class="members-section">
          <h3 class="section-title">群成员</h3>
          <div class="members-list">
            <div v-for="member in profile.members" :key="member" class="member-item">
              <div class="member-avatar">
                <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${member}`" :alt="member" />
              </div>
              <span class="member-name">{{ member }}</span>
            </div>
          </div>
        </div>

        <!-- User Info -->
        <div v-if="isCurrentUser" class="info-section">
          <h3 class="section-title">个人信息</h3>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">账号</span>
              <span class="info-value">{{ chatStore.currentUser.id }}</span>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div v-if="!isCurrentUser && !('isGroup' in profile && profile.isGroup)" class="info-section">
          <h3 class="section-title">联系人信息</h3>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">账号</span>
              <span class="info-value">{{ profile.id }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions" v-if="!isCurrentUser">
          <button v-if="'isGroup' in profile && !profile.isGroup" class="action-btn primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            发送消息
          </button>
          <button v-if="'isGroup' in profile && profile.isGroup" class="action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            邀请成员
          </button>
        </div>
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
  width: 400px;
  max-height: 85vh;
  background: var(--bg-elevated);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-4) var(--space-5);
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
  padding: 0 var(--space-6) var(--space-6);
  overflow-y: auto;
  max-height: calc(85vh - 56px);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--space-6);
}

.avatar-large {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-lg);
}

.avatar-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--space-2);
}

.bio {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-align: center;
  margin: 0;
}

.group-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0;
}

.section-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 var(--space-3);
}

.members-section,
.info-section {
  margin-bottom: var(--space-6);
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.member-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.member-item:hover {
  background: var(--bg-muted);
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  font-size: var(--text-base);
  color: var(--text-primary);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.info-value {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  background: var(--bg-muted);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.action-btn:hover {
  background: var(--bg-base);
}

.action-btn.primary {
  background: var(--primary);
  color: var(--text-on-dark);
}

.action-btn.primary:hover {
  background: var(--accent);
}
</style>
