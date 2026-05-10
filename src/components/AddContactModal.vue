<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useSettingsStore } from '@/stores/settings'

const chatStore = useChatStore()
const settingsStore = useSettingsStore()

const name = ref('')
const isGroup = ref(false)
const error = ref('')

function submit() {
  if (!name.value.trim()) {
    error.value = '请输入联系人名称'
    return
  }

  chatStore.addContact({
    name: name.value.trim(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.value.trim()}`,
    isGroup: isGroup.value,
    members: isGroup.value ? ['我'] : undefined
  })

  // 清空表单并关闭
  name.value = ''
  isGroup.value = false
  error.value = ''
  settingsStore.closeAddContact()
}

function close() {
  name.value = ''
  isGroup.value = false
  error.value = ''
  settingsStore.closeAddContact()
}
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <header class="header">
        <h2 class="title">添加联系人</h2>
        <button class="close-btn" @click="close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </header>

      <form class="form" @submit.prevent="submit">
        <div class="field">
          <label class="label">名称</label>
          <input
            v-model="name"
            type="text"
            class="input"
            placeholder="输入联系人或群聊名称"
            autofocus
          />
          <p v-if="error" class="error">{{ error }}</p>
        </div>

        <div class="field">
          <label class="label">类型</label>
          <div class="type-options">
            <button
              type="button"
              class="type-btn"
              :class="{ active: !isGroup }"
              @click="isGroup = false"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M6 20V18C6 16.9 8.2 14.5 11 14.1C11.3 14 11.7 14 12 14C12.3 14 12.7 14 13 14.1C15.8 14.5 18 16.9 18 18V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              个人
            </button>
            <button
              type="button"
              class="type-btn"
              :class="{ active: isGroup }"
              @click="isGroup = true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="7" r="3" stroke="currentColor" stroke-width="2"/>
                <circle cx="15" cy="7" r="3" stroke="currentColor" stroke-width="2"/>
                <path d="M3 20V18C3 16.3 4.6 15 6.5 14.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M21 20V18C21 16.3 19.4 15 17.5 14.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              群聊
            </button>
          </div>
        </div>

        <div class="actions">
          <button type="button" class="btn cancel" @click="close">取消</button>
          <button type="submit" class="btn primary">添加</button>
        </div>
      </form>
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
  background: var(--bg-elevated);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--border);
}

.title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin: 0;
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

.form {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.input {
  height: 44px;
  padding: 0 var(--space-4);
  font-size: var(--text-base);
  color: var(--text-primary);
  background: var(--bg-muted);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  outline: none;
  transition: all var(--transition-base);
}

.input:focus {
  background: var(--bg-base);
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(202, 138, 4, 0.1);
}

.input::placeholder {
  color: var(--text-muted);
}

.error {
  font-size: var(--text-sm);
  color: #DC2626;
  margin: 0;
}

.type-options {
  display: flex;
  gap: var(--space-2);
}

.type-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: 44px;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  background: var(--bg-muted);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.type-btn:hover {
  background: var(--bg-base);
}

.type-btn.active {
  background: var(--bg-base);
  border-color: var(--accent);
  color: var(--accent);
}

.actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.btn {
  flex: 1;
  height: 44px;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn.cancel {
  background: var(--bg-muted);
  color: var(--text-secondary);
}

.btn.cancel:hover {
  background: var(--bg-base);
}

.btn.primary {
  background: var(--primary);
  color: var(--text-on-dark);
}

.btn.primary:hover {
  background: var(--accent);
}
</style>