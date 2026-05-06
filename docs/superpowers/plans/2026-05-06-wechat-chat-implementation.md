# Apple 风格微信聊天界面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个桌面端微信聊天应用，采用 Apple 设计语言，实现联系人列表、聊天窗口、消息发送等核心功能。

**Architecture:** 双栏布局（左侧联系人列表 + 右侧聊天窗口），使用 Vue 3 Composition API + Pinia 状态管理，CSS Variables 实现 Apple 设计系统的色彩和排版规范。

**Tech Stack:** Vue 3, Vite, TypeScript, Pinia, CSS Variables

**Design Spec:** [2026-05-06-wechat-chat-design.md](../specs/2026-05-06-wechat-chat-design.md)

---

## File Structure

```
wx/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── DESIGN.md
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── vite-env.d.ts
│   ├── assets/
│   │   └── styles/
│   │       ├── variables.css
│   │       ├── reset.css
│   │       └── global.css
│   ├── components/
│   │   ├── GlobalNav.vue
│   │   ├── ContactList.vue
│   │   ├── ContactCard.vue
│   │   ├── ChatWindow.vue
│   │   ├── ChatHeader.vue
│   │   ├── MessageList.vue
│   │   ├── MessageBubble.vue
│   │   └── InputArea.vue
│   ├── stores/
│   │   └── chat.ts
│   ├── types/
│   │   └── index.ts
│   ├── mock/
│   │   └── data.ts
│   └── utils/
│       └── format.ts
└── public/
    └── avatars/
        ├── me.svg
        ├── user1.svg
        ├── user2.svg
        ├── user3.svg
        ├── user4.svg
        └── group1.svg
```

---

## Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/App.vue`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: 初始化 Vite + Vue 3 + TypeScript 项目**

在项目根目录运行：

```bash
cd c:/Users/Admin/Desktop/wx
npm create vite@latest . -- --template vue-ts
```

选择覆盖现有文件。

- [ ] **Step 2: 安装 Pinia 状态管理**

```bash
npm install pinia
```

- [ ] **Step 3: 验证项目可运行**

```bash
npm run dev
```

访问 http://localhost:5173，确认看到 Vue 默认页面。

- [ ] **Step 4: Commit 初始化**

```bash
git init
git add .
git commit -m "chore: initialize Vue 3 + Vite + TypeScript project"
```

---

## Task 2: CSS 变量系统与全局样式

**Files:**
- Create: `src/assets/styles/variables.css`
- Create: `src/assets/styles/reset.css`
- Create: `src/assets/styles/global.css`
- Modify: `src/main.ts`

- [ ] **Step 1: 创建 CSS 变量文件**

创建 `src/assets/styles/variables.css`:

```css
:root {
  /* Surface colors */
  --color-surface-black: #000000;
  --color-canvas-parchment: #f5f5f7;
  --color-canvas: #ffffff;
  --color-surface-pearl: #fafafc;

  /* Interactive colors */
  --color-primary: #0066cc;
  --color-primary-focus: #0071e3;

  /* Text colors */
  --color-ink: #1d1d1f;
  --color-ink-muted-48: #7a7a7a;
  --color-on-primary: #ffffff;
  --color-on-dark: #ffffff;

  /* Border colors */
  --color-divider-soft: #f0f0f0;
  --color-hairline: #e0e0e0;

  /* Typography */
  --font-display: "Inter", "SF Pro Display", system-ui, -apple-system, sans-serif;
  --font-text: "Inter", "SF Pro Text", system-ui, -apple-system, sans-serif;

  /* Font sizes */
  --font-size-tagline: 21px;
  --font-size-body: 17px;
  --font-size-caption: 14px;
  --font-size-fine-print: 12px;

  /* Font weights */
  --font-weight-regular: 400;
  --font-weight-semibold: 600;

  /* Line heights */
  --line-height-tight: 1.19;
  --line-height-normal: 1.47;

  /* Letter spacing */
  --letter-spacing-tight: -0.374px;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* Border radius */
  --radius-sm: 8px;
  --radius-lg: 18px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-message: 0 1px 2px rgba(0, 0, 0, 0.1);
}
```

- [ ] **Step 2: 创建 CSS 重置文件**

创建 `src/assets/styles/reset.css`:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-text);
  font-size: var(--font-size-body);
  line-height: var(--line-height-normal);
  color: var(--color-ink);
  background-color: var(--color-canvas);
}

img {
  max-width: 100%;
  display: block;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

input {
  font-family: inherit;
  border: none;
  outline: none;
}

ul, ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}
```

- [ ] **Step 3: 创建全局样式文件**

创建 `src/assets/styles/global.css`:

```css
/* Import Inter font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

html, body, #app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* Utility classes */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.flex-1 {
  flex: 1;
}

/* Button interaction */
.btn-interactive {
  transition: transform 0.1s ease;
}

.btn-interactive:active {
  transform: scale(0.95);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-divider-soft);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-hairline);
}
```

- [ ] **Step 4: 更新 main.ts 引入样式**

更新 `src/main.ts`:

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/styles/variables.css'
import './assets/styles/reset.css'
import './assets/styles/global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

- [ ] **Step 5: 验证样式生效**

```bash
npm run dev
```

检查页面背景是否为白色，字体是否加载。

- [ ] **Step 6: Commit CSS 变量系统**

```bash
git add .
git commit -m "feat: add CSS variable system and global styles"
```

---

## Task 3: TypeScript 类型定义

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: 创建类型定义文件**

创建 `src/types/index.ts`:

```typescript
export interface Contact {
  id: string
  name: string
  avatar: string
  isGroup: boolean
  members?: string[]
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

export interface Message {
  id: string
  contactId: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  type: 'text' | 'image' | 'video' | 'file'
  timestamp: Date
  isMine: boolean
}

export interface User {
  id: string
  name: string
  avatar: string
}
```

- [ ] **Step 2: Commit 类型定义**

```bash
git add src/types/index.ts
git commit -m "feat: add TypeScript type definitions"
```

---

## Task 4: 模拟数据

**Files:**
- Create: `src/mock/data.ts`

- [ ] **Step 1: 创建模拟数据文件**

创建 `src/mock/data.ts`:

```typescript
import type { Contact, Message, User } from '@/types'

export const mockCurrentUser: User = {
  id: 'me',
  name: '我',
  avatar: '/avatars/me.svg'
}

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: '张三',
    avatar: '/avatars/user1.svg',
    isGroup: false,
    lastMessage: '好的，明天见',
    lastMessageTime: new Date('2026-05-06T10:30:00'),
    unreadCount: 0
  },
  {
    id: '2',
    name: '李四',
    avatar: '/avatars/user2.svg',
    isGroup: false,
    lastMessage: '项目文档已更新',
    lastMessageTime: new Date('2026-05-06T09:15:00'),
    unreadCount: 2
  },
  {
    id: '3',
    name: '王五',
    avatar: '/avatars/user3.svg',
    isGroup: false,
    lastMessage: '收到，谢谢！',
    lastMessageTime: new Date('2026-05-05T16:20:00'),
    unreadCount: 0
  },
  {
    id: '4',
    name: '产品讨论群',
    avatar: '/avatars/group1.svg',
    isGroup: true,
    members: ['1', '2', '3'],
    lastMessage: '李四: 需求已更新',
    lastMessageTime: new Date('2026-05-05T14:45:00'),
    unreadCount: 5
  },
  {
    id: '5',
    name: '技术交流群',
    avatar: '/avatars/group1.svg',
    isGroup: true,
    members: ['1', '2', '3'],
    lastMessage: '王五: 代码已提交',
    lastMessageTime: new Date('2026-05-04T11:30:00'),
    unreadCount: 0
  }
]

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1-1',
      contactId: '1',
      senderId: '1',
      senderName: '张三',
      senderAvatar: '/avatars/user1.svg',
      content: '你好，明天有空吗？',
      type: 'text',
      timestamp: new Date('2026-05-06T10:00:00'),
      isMine: false
    },
    {
      id: 'm1-2',
      contactId: '1',
      senderId: 'me',
      senderName: '我',
      senderAvatar: '/avatars/me.svg',
      content: '有的，什么事？',
      type: 'text',
      timestamp: new Date('2026-05-06T10:05:00'),
      isMine: true
    },
    {
      id: 'm1-3',
      contactId: '1',
      senderId: '1',
      senderName: '张三',
      senderAvatar: '/avatars/user1.svg',
      content: '想约你讨论一下新项目的方案，下午三点方便吗？',
      type: 'text',
      timestamp: new Date('2026-05-06T10:10:00'),
      isMine: false
    },
    {
      id: 'm1-4',
      contactId: '1',
      senderId: 'me',
      senderName: '我',
      senderAvatar: '/avatars/me.svg',
      content: '可以的，三点见！',
      type: 'text',
      timestamp: new Date('2026-05-06T10:15:00'),
      isMine: true
    },
    {
      id: 'm1-5',
      contactId: '1',
      senderId: '1',
      senderName: '张三',
      senderAvatar: '/avatars/user1.svg',
      content: '好的，明天见',
      type: 'text',
      timestamp: new Date('2026-05-06T10:30:00'),
      isMine: false
    }
  ],
  '2': [
    {
      id: 'm2-1',
      contactId: '2',
      senderId: '2',
      senderName: '李四',
      senderAvatar: '/avatars/user2.svg',
      content: '项目文档更新了，麻烦帮忙审核一下',
      type: 'text',
      timestamp: new Date('2026-05-06T09:00:00'),
      isMine: false
    },
    {
      id: 'm2-2',
      contactId: '2',
      senderId: 'me',
      senderName: '我',
      senderAvatar: '/avatars/me.svg',
      content: '好的，我现在看',
      type: 'text',
      timestamp: new Date('2026-05-06T09:10:00'),
      isMine: true
    },
    {
      id: 'm2-3',
      contactId: '2',
      senderId: '2',
      senderName: '李四',
      senderAvatar: '/avatars/user2.svg',
      content: '项目文档已更新',
      type: 'text',
      timestamp: new Date('2026-05-06T09:15:00'),
      isMine: false
    }
  ],
  '3': [
    {
      id: 'm3-1',
      contactId: '3',
      senderId: 'me',
      senderName: '我',
      senderAvatar: '/avatars/me.svg',
      content: '资料已经发到你邮箱了',
      type: 'text',
      timestamp: new Date('2026-05-05T16:00:00'),
      isMine: true
    },
    {
      id: 'm3-2',
      contactId: '3',
      senderId: '3',
      senderName: '王五',
      senderAvatar: '/avatars/user3.svg',
      content: '收到，谢谢！',
      type: 'text',
      timestamp: new Date('2026-05-05T16:20:00'),
      isMine: false
    }
  ],
  '4': [
    {
      id: 'm4-1',
      contactId: '4',
      senderId: '1',
      senderName: '张三',
      senderAvatar: '/avatars/user1.svg',
      content: '大家好，今天讨论一下新版本的功能规划',
      type: 'text',
      timestamp: new Date('2026-05-05T14:00:00'),
      isMine: false
    },
    {
      id: 'm4-2',
      contactId: '4',
      senderId: 'me',
      senderName: '我',
      senderAvatar: '/avatars/me.svg',
      content: '我这边有一些想法可以分享',
      type: 'text',
      timestamp: new Date('2026-05-05T14:15:00'),
      isMine: true
    },
    {
      id: 'm4-3',
      contactId: '4',
      senderId: '2',
      senderName: '李四',
      senderAvatar: '/avatars/user2.svg',
      content: '需求已更新，大家看看有没有问题',
      type: 'text',
      timestamp: new Date('2026-05-05T14:45:00'),
      isMine: false
    }
  ],
  '5': [
    {
      id: 'm5-1',
      contactId: '5',
      senderId: '3',
      senderName: '王五',
      senderAvatar: '/avatars/user3.svg',
      content: '最新的代码已经提交到 dev 分支',
      type: 'text',
      timestamp: new Date('2026-05-04T11:30:00'),
      isMine: false
    }
  ]
}
```

- [ ] **Step 2: Commit 模拟数据**

```bash
git add src/mock/data.ts
git commit -m "feat: add mock data for contacts and messages"
```

---

## Task 5: Pinia Store

**Files:**
- Create: `src/stores/chat.ts`

- [ ] **Step 1: 创建 Pinia Store**

创建 `src/stores/chat.ts`:

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Contact, Message, User } from '@/types'
import { mockCurrentUser, mockContacts, mockMessages } from '@/mock/data'

export const useChatStore = defineStore('chat', () => {
  // State
  const currentUser = ref<User>(mockCurrentUser)
  const contacts = ref<Contact[]>(mockContacts)
  const messages = ref<Record<string, Message[]>>(mockMessages)
  const activeContactId = ref<string | null>(null)
  const searchQuery = ref('')

  // Getters
  const activeContact = computed(() => {
    if (!activeContactId.value) return null
    return contacts.value.find(c => c.id === activeContactId.value) || null
  })

  const activeMessages = computed(() => {
    if (!activeContactId.value) return []
    return messages.value[activeContactId.value] || []
  })

  const filteredContacts = computed(() => {
    if (!searchQuery.value) return contacts.value
    const query = searchQuery.value.toLowerCase()
    return contacts.value.filter(c =>
      c.name.toLowerCase().includes(query)
    )
  })

  // Actions
  function selectContact(contactId: string) {
    activeContactId.value = contactId
    // Clear unread count when selecting
    const contact = contacts.value.find(c => c.id === contactId)
    if (contact) {
      contact.unreadCount = 0
    }
  }

  function sendMessage(content: string) {
    if (!activeContactId.value || !content.trim()) return

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      contactId: activeContactId.value,
      senderId: currentUser.value.id,
      senderName: currentUser.value.name,
      senderAvatar: currentUser.value.avatar,
      content: content.trim(),
      type: 'text',
      timestamp: new Date(),
      isMine: true
    }

    // Add message to the list
    if (!messages.value[activeContactId.value]) {
      messages.value[activeContactId.value] = []
    }
    messages.value[activeContactId.value].push(newMessage)

    // Update last message in contact
    const contact = contacts.value.find(c => c.id === activeContactId.value)
    if (contact) {
      contact.lastMessage = content.trim()
      contact.lastMessageTime = new Date()
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  return {
    // State
    currentUser,
    contacts,
    messages,
    activeContactId,
    searchQuery,
    // Getters
    activeContact,
    activeMessages,
    filteredContacts,
    // Actions
    selectContact,
    sendMessage,
    setSearchQuery
  }
})
```

- [ ] **Step 2: Commit Pinia Store**

```bash
git add src/stores/chat.ts
git commit -m "feat: add Pinia chat store with state and actions"
```

---

## Task 6: 工具函数

**Files:**
- Create: `src/utils/format.ts`

- [ ] **Step 1: 创建格式化工具函数**

创建 `src/utils/format.ts`:

```typescript
export function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const timeStr = `${hours}:${minutes}`

  if (diffDays === 0) {
    return timeStr
  } else if (diffDays === 1) {
    return `昨天 ${timeStr}`
  } else if (diffDays < 7) {
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return `${weekDays[date.getDay()]} ${timeStr}`
  } else {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}月${day}日 ${timeStr}`
  }
}

export function formatLastMessageTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  if (diffDays === 0) {
    return `${hours}:${minutes}`
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays < 7) {
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weekDays[date.getDay()]
  } else {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day}`
  }
}
```

- [ ] **Step 2: Commit 工具函数**

```bash
git add src/utils/format.ts
git commit -m "feat: add format utility functions"
```

---

## Task 7: 头像资源

**Files:**
- Create: `public/avatars/me.svg`
- Create: `public/avatars/user1.svg`
- Create: `public/avatars/user2.svg`
- Create: `public/avatars/user3.svg`
- Create: `public/avatars/user4.svg`
- Create: `public/avatars/group1.svg`

- [ ] **Step 1: 创建头像目录**

```bash
mkdir -p public/avatars
```

- [ ] **Step 2: 创建当前用户头像**

创建 `public/avatars/me.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#0066cc"/>
  <text x="50" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="600">我</text>
</svg>
```

- [ ] **Step 3: 创建用户头像 user1.svg**

创建 `public/avatars/user1.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#34c759"/>
  <text x="50" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="600">张</text>
</svg>
```

- [ ] **Step 4: 创建用户头像 user2.svg**

创建 `public/avatars/user2.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#ff9500"/>
  <text x="50" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="600">李</text>
</svg>
```

- [ ] **Step 5: 创建用户头像 user3.svg**

创建 `public/avatars/user3.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#af52de"/>
  <text x="50" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="600">王</text>
</svg>
```

- [ ] **Step 6: 创建用户头像 user4.svg**

创建 `public/avatars/user4.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#ff3b30"/>
  <text x="50" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="600">赵</text>
</svg>
```

- [ ] **Step 7: 创建群组头像**

创建 `public/avatars/group1.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#8e8e93"/>
  <g fill="white">
    <circle cx="35" cy="40" r="10"/>
    <circle cx="65" cy="40" r="10"/>
    <circle cx="50" cy="65" r="10"/>
  </g>
</svg>
```

- [ ] **Step 8: Commit 头像资源**

```bash
git add public/avatars/
git commit -m "feat: add avatar SVG assets"
```

---

## Task 8: GlobalNav 组件

**Files:**
- Create: `src/components/GlobalNav.vue`

- [ ] **Step 1: 创建 GlobalNav 组件**

创建 `src/components/GlobalNav.vue`:

```vue
<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <header class="global-nav">
    <div class="nav-left">
      <div class="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
        </svg>
      </div>
    </div>

    <div class="nav-center">
      <div class="search-box">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.5L20.5 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" opacity="0.6"/>
        </svg>
        <input
          type="text"
          class="search-input"
          placeholder="搜索联系人..."
          :value="chatStore.searchQuery"
          @input="chatStore.setSearchQuery(($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <div class="nav-right">
      <div class="user-avatar">
        <img :src="chatStore.currentUser.avatar" :alt="chatStore.currentUser.name" />
      </div>
      <button class="settings-btn btn-interactive">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.67 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.global-nav {
  height: 44px;
  background: var(--color-surface-black);
  color: var(--color-on-dark);
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.nav-center {
  flex: 1;
  max-width: 400px;
  margin: 0 var(--spacing-lg);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-on-dark);
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
}

.search-input {
  width: 100%;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-pill);
  padding: 0 var(--spacing-md) 0 40px;
  color: var(--color-on-dark);
  font-size: var(--font-size-caption);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
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
  color: var(--color-on-dark);
  opacity: 0.8;
  padding: var(--spacing-xs);
}

.settings-btn:hover {
  opacity: 1;
}
</style>
```

- [ ] **Step 2: Commit GlobalNav 组件**

```bash
git add src/components/GlobalNav.vue
git commit -m "feat: add GlobalNav component"
```

---

## Task 9: ContactCard 组件

**Files:**
- Create: `src/components/ContactCard.vue`

- [ ] **Step 1: 创建 ContactCard 组件**

创建 `src/components/ContactCard.vue`:

```vue
<script setup lang="ts">
import type { Contact } from '@/types'
import { formatLastMessageTime } from '@/utils/format'

defineProps<{
  contact: Contact
  isActive: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="contact-card"
    :class="{ active: isActive }"
    @click="emit('click')"
  >
    <div class="avatar-wrapper">
      <img :src="contact.avatar" :alt="contact.name" class="avatar" />
      <span v-if="contact.isGroup" class="group-badge">群</span>
    </div>

    <div class="content">
      <div class="header">
        <span class="name">{{ contact.name }}</span>
        <span class="time">{{ formatLastMessageTime(contact.lastMessageTime) }}</span>
      </div>
      <div class="footer">
        <span class="preview">{{ contact.lastMessage }}</span>
        <span v-if="contact.unreadCount > 0" class="unread-badge">
          {{ contact.unreadCount > 99 ? '99+' : contact.unreadCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background-color 0.15s ease;
}

.contact-card:hover {
  background: var(--color-surface-pearl);
}

.contact-card.active {
  background: var(--color-surface-pearl);
  border-left-color: var(--color-primary);
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.group-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  background: var(--color-ink-muted-48);
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 4px;
}

.content {
  flex: 1;
  min-width: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.name {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
  letter-spacing: var(--letter-spacing-tight);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time {
  font-size: var(--font-size-fine-print);
  color: var(--color-ink-muted-48);
  flex-shrink: 0;
  margin-left: var(--spacing-xs);
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview {
  font-size: var(--font-size-caption);
  color: var(--color-ink-muted-48);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: var(--spacing-xs);
}

.unread-badge {
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
  padding: 2px 6px;
  border-radius: 10px;
  flex-shrink: 0;
  min-width: 18px;
  text-align: center;
}
</style>
```

- [ ] **Step 2: Commit ContactCard 组件**

```bash
git add src/components/ContactCard.vue
git commit -m "feat: add ContactCard component"
```

---

## Task 10: ContactList 组件

**Files:**
- Create: `src/components/ContactList.vue`

- [ ] **Step 1: 创建 ContactList 组件**

创建 `src/components/ContactList.vue`:

```vue
<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import ContactCard from './ContactCard.vue'

const chatStore = useChatStore()
</script>

<template>
  <aside class="contact-list">
    <div class="header">
      <h2 class="title">联系人</h2>
      <span class="count">{{ chatStore.filteredContacts.length }}</span>
    </div>

    <div class="list">
      <ContactCard
        v-for="contact in chatStore.filteredContacts"
        :key="contact.id"
        :contact="contact"
        :is-active="chatStore.activeContactId === contact.id"
        @click="chatStore.selectContact(contact.id)"
      />

      <div v-if="chatStore.filteredContacts.length === 0" class="empty-state">
        <p>没有找到联系人</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.contact-list {
  width: 280px;
  background: var(--color-canvas-parchment);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid var(--color-divider-soft);
}

.header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-divider-soft);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.title {
  font-size: var(--font-size-tagline);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
}

.count {
  font-size: var(--font-size-caption);
  color: var(--color-ink-muted-48);
}

.list {
  flex: 1;
  overflow-y: auto;
}

.empty-state {
  padding: var(--spacing-xl) var(--spacing-md);
  text-align: center;
  color: var(--color-ink-muted-48);
  font-size: var(--font-size-caption);
}

@media (max-width: 1023px) {
  .contact-list {
    width: 240px;
  }
}
</style>
```

- [ ] **Step 2: Commit ContactList 组件**

```bash
git add src/components/ContactList.vue
git commit -m "feat: add ContactList component"
```

---

## Task 11: MessageBubble 组件

**Files:**
- Create: `src/components/MessageBubble.vue`

- [ ] **Step 1: 创建 MessageBubble 组件**

创建 `src/components/MessageBubble.vue`:

```vue
<script setup lang="ts">
import type { Message } from '@/types'
import { formatTime } from '@/utils/format'

defineProps<{
  message: Message
  showSender?: boolean
}>()
</script>

<template>
  <div
    class="message-wrapper"
    :class="{ outgoing: message.isMine, incoming: !message.isMine }"
  >
    <div v-if="!message.isMine && showSender" class="sender-info">
      <img :src="message.senderAvatar" :alt="message.senderName" class="sender-avatar" />
      <span class="sender-name">{{ message.senderName }}</span>
    </div>

    <div class="message-row">
      <img
        v-if="!message.isMine"
        :src="message.senderAvatar"
        :alt="message.senderName"
        class="avatar"
      />

      <div class="message-bubble" :class="{ outgoing: message.isMine }">
        <p class="content">{{ message.content }}</p>
        <span class="time">{{ formatTime(message.timestamp) }}</span>
      </div>

      <img
        v-if="message.isMine"
        :src="message.senderAvatar"
        :alt="message.senderName"
        class="avatar"
      />
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-sm);
}

.message-wrapper.incoming {
  align-items: flex-start;
}

.message-wrapper.outgoing {
  align-items: flex-end;
}

.sender-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: 4px;
  padding-left: 52px;
}

.sender-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.sender-name {
  font-size: var(--font-size-caption);
  color: var(--color-ink-muted-48);
}

.message-row {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-xs);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: var(--radius-lg);
  position: relative;
}

.message-bubble.incoming {
  background: var(--color-surface-pearl);
  border-radius: 18px 18px 18px 4px;
}

.message-bubble.outgoing {
  background: var(--color-primary);
  border-radius: 18px 18px 4px 18px;
}

.content {
  font-size: var(--font-size-body);
  line-height: 1.4;
  word-wrap: break-word;
}

.message-bubble.incoming .content {
  color: var(--color-ink);
}

.message-bubble.outgoing .content {
  color: var(--color-on-primary);
}

.time {
  display: block;
  font-size: var(--font-size-fine-print);
  margin-top: 4px;
}

.message-bubble.incoming .time {
  color: var(--color-ink-muted-48);
}

.message-bubble.outgoing .time {
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
}
</style>
```

- [ ] **Step 2: Commit MessageBubble 组件**

```bash
git add src/components/MessageBubble.vue
git commit -m "feat: add MessageBubble component"
```

---

## Task 12: MessageList 组件

**Files:**
- Create: `src/components/MessageList.vue`

- [ ] **Step 1: 创建 MessageList 组件**

创建 `src/components/MessageList.vue`:

```vue
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'
import MessageBubble from './MessageBubble.vue'

const chatStore = useChatStore()
const messageContainer = ref<HTMLElement | null>(null)

// Auto-scroll to bottom when new messages arrive
watch(
  () => chatStore.activeMessages.length,
  async () => {
    await nextTick()
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  }
)

// Also scroll when changing contacts
watch(
  () => chatStore.activeContactId,
  async () => {
    await nextTick()
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  }
)
</script>

<template>
  <div ref="messageContainer" class="message-list">
    <div class="messages-wrapper">
      <MessageBubble
        v-for="(message, index) in chatStore.activeMessages"
        :key="message.id"
        :message="message"
        :show-sender="chatStore.activeContact?.isGroup && !message.isMine"
      />

      <div v-if="chatStore.activeMessages.length === 0" class="empty-state">
        <p>暂无消息</p>
        <p class="hint">发送一条消息开始聊天</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.messages-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-ink-muted-48);
}

.empty-state p {
  margin: 0;
}

.empty-state .hint {
  font-size: var(--font-size-caption);
  margin-top: var(--spacing-xs);
}
</style>
```

- [ ] **Step 2: Commit MessageList 组件**

```bash
git add src/components/MessageList.vue
git commit -m "feat: add MessageList component with auto-scroll"
```

---

## Task 13: ChatHeader 组件

**Files:**
- Create: `src/components/ChatHeader.vue`

- [ ] **Step 1: 创建 ChatHeader 组件**

创建 `src/components/ChatHeader.vue`:

```vue
<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <header class="chat-header" v-if="chatStore.activeContact">
    <div class="info">
      <h2 class="name">{{ chatStore.activeContact.name }}</h2>
      <p v-if="chatStore.activeContact.isGroup" class="meta">
        {{ chatStore.activeContact.members?.length || 0 }} 位成员
      </p>
    </div>

    <div class="actions">
      <button class="action-btn btn-interactive">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 8C16.1 8 17 7.1 17 6C17 4.9 16.1 4 15 4C13.9 4 13 4.9 13 6C13 7.1 13.9 8 15 8ZM15 10C13.9 10 13 10.9 13 12C13 13.1 13.9 14 15 14C16.1 14 17 13.1 17 12C17 10.9 16.1 10 15 10ZM15 16C13.9 16 13 16.9 13 18C13 19.1 13.9 20 15 20C16.1 20 17 19.1 17 18C17 16.9 16.1 16 15 16ZM9 6C9 4.9 8.1 4 7 4C5.9 4 5 4.9 5 6C5 7.1 5.9 8 7 8C8.1 8 9 7.1 9 6ZM9 12C9 10.9 8.1 10 7 10C5.9 10 5 10.9 5 12C5 13.1 5.9 14 7 14C8.1 14 9 13.1 9 12ZM9 18C9 16.9 8.1 16 7 16C5.9 16 5 16.9 5 18C5 19.1 5.9 20 7 20C8.1 20 9 19.1 9 18Z" fill="currentColor"/>
        </svg>
      </button>
      <button class="action-btn btn-interactive">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  </header>

  <header class="chat-header empty" v-else>
    <p class="placeholder">选择一个联系人开始聊天</p>
  </header>
</template>

<style scoped>
.chat-header {
  height: 52px;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-divider-soft);
  flex-shrink: 0;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: var(--font-size-tagline);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
  margin: 0;
}

.meta {
  font-size: var(--font-size-caption);
  color: var(--color-ink-muted-48);
  margin: 0;
}

.actions {
  display: flex;
  gap: var(--spacing-xs);
}

.action-btn {
  color: var(--color-ink-muted-48);
  padding: var(--spacing-xs);
}

.action-btn:hover {
  color: var(--color-ink);
}

.chat-header.empty {
  justify-content: center;
}

.placeholder {
  color: var(--color-ink-muted-48);
  font-size: var(--font-size-caption);
}
</style>
```

- [ ] **Step 2: Commit ChatHeader 组件**

```bash
git add src/components/ChatHeader.vue
git commit -m "feat: add ChatHeader component"
```

---

## Task 14: InputArea 组件

**Files:**
- Create: `src/components/InputArea.vue`

- [ ] **Step 1: 创建 InputArea 组件**

创建 `src/components/InputArea.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const message = ref('')

function handleSend() {
  if (!message.value.trim()) return
  chatStore.sendMessage(message.value)
  message.value = ''
}
</script>

<template>
  <div class="input-area" v-if="chatStore.activeContact">
    <button class="icon-btn btn-interactive" title="添加附件">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z" fill="currentColor"/>
      </svg>
    </button>

    <button class="icon-btn btn-interactive" title="表情">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.5 11C16.33 11 17 10.33 17 9.5C17 8.67 16.33 8 15.5 8C14.67 8 14 8.67 14 9.5C14 10.33 14.67 11 15.5 11ZM8.5 11C9.33 11 10 10.33 10 9.5C10 8.67 9.33 8 8.5 8C7.67 8 7 8.67 7 9.5C7 10.33 7.67 11 8.5 11ZM12 17.5C14.33 17.5 16.31 16.04 17.11 14H6.89C7.69 16.04 9.67 17.5 12 17.5Z" fill="currentColor"/>
      </svg>
    </button>

    <input
      v-model="message"
      type="text"
      class="message-input"
      placeholder="输入消息..."
      @keyup.enter="handleSend"
    />

    <button
      class="send-btn btn-interactive"
      :disabled="!message.trim()"
      @click="handleSend"
    >
      发送
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.input-area {
  height: 64px;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  border-top: 1px solid var(--color-divider-soft);
  flex-shrink: 0;
}

.icon-btn {
  color: var(--color-ink-muted-48);
  padding: var(--spacing-xs);
}

.icon-btn:hover {
  color: var(--color-ink);
}

.message-input {
  flex: 1;
  height: 44px;
  background: var(--color-canvas);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-body);
  color: var(--color-ink);
}

.message-input::placeholder {
  color: var(--color-ink-muted-48);
}

.message-input:focus {
  border-color: var(--color-primary);
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: var(--radius-pill);
  padding: 8px 16px;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

- [ ] **Step 2: Commit InputArea 组件**

```bash
git add src/components/InputArea.vue
git commit -m "feat: add InputArea component"
```

---

## Task 15: ChatWindow 组件

**Files:**
- Create: `src/components/ChatWindow.vue`

- [ ] **Step 1: 创建 ChatWindow 组件**

创建 `src/components/ChatWindow.vue`:

```vue
<script setup lang="ts">
import ChatHeader from './ChatHeader.vue'
import MessageList from './MessageList.vue'
import InputArea from './InputArea.vue'
</script>

<template>
  <main class="chat-window">
    <ChatHeader />
    <MessageList />
    <InputArea />
  </main>
</template>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-canvas);
  min-width: 0;
}
</style>
```

- [ ] **Step 2: Commit ChatWindow 组件**

```bash
git add src/components/ChatWindow.vue
git commit -m "feat: add ChatWindow component"
```

---

## Task 16: App.vue 组装

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: 更新 App.vue 组装所有组件**

更新 `src/App.vue`:

```vue
<script setup lang="ts">
import GlobalNav from './components/GlobalNav.vue'
import ContactList from './components/ContactList.vue'
import ChatWindow from './components/ChatWindow.vue'
</script>

<template>
  <div class="app-container">
    <GlobalNav />
    <div class="main-content">
      <ContactList />
      <ChatWindow />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  min-height: 0;
}

@media (max-width: 767px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
```

- [ ] **Step 2: 验证应用可运行**

```bash
npm run dev
```

访问 http://localhost:5173，检查：
- 双栏布局正确显示
- 左侧联系人列表可见
- 右侧聊天窗口可见
- 点击联系人可切换

- [ ] **Step 3: Commit App.vue 组装**

```bash
git add src/App.vue
git commit -m "feat: assemble all components in App.vue"
```

---

## Task 17: Vite 路径别名配置

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.json`

- [ ] **Step 1: 更新 vite.config.ts 添加路径别名**

更新 `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

- [ ] **Step 2: 更新 tsconfig.json 添加路径别名**

更新 `tsconfig.json`，在 `compilerOptions` 中添加：

```json
{
  "compilerOptions": {
    // ... 其他配置
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 3: 验证路径别名工作**

```bash
npm run dev
```

确认没有导入错误。

- [ ] **Step 4: Commit 路径别名配置**

```bash
git add vite.config.ts tsconfig.json
git commit -m "chore: add path alias configuration"
```

---

## Task 18: 最终验证

**Files:**
- 无文件修改

- [ ] **Step 1: 运行开发服务器**

```bash
npm run dev
```

- [ ] **Step 2: 功能验证清单**

手动测试以下功能：

1. **联系人切换**
   - 点击不同联系人，聊天窗口标题更新
   - 消息列表切换到对应联系人

2. **消息发送**
   - 在输入框输入文字
   - 点击发送按钮或按 Enter
   - 消息出现在列表底部
   - 输入框清空

3. **时间戳显示**
   - 检查消息时间戳格式正确
   - 检查联系人列表时间格式

4. **群聊消息**
   - 选择群聊
   - 检查消息显示发送者头像和名字

5. **搜索功能**
   - 在顶部搜索框输入文字
   - 联系人列表过滤

6. **样式检查**
   - 颜色使用 CSS 变量
   - 消息气泡圆角正确
   - 按钮按压有 scale 效果

- [ ] **Step 3: 最终 Commit**

```bash
git add .
git commit -m "feat: complete Apple-style WeChat chat interface"
```

---

## Verification Summary

完成所有任务后，项目应具备以下功能：

| 功能 | 验证方法 |
|------|----------|
| 双栏布局 | 检查左侧联系人列表 + 右侧聊天窗口 |
| 联系人切换 | 点击联系人，聊天窗口更新 |
| 消息发送 | 输入消息，按 Enter 或点击发送 |
| 时间戳 | 检查消息和联系人时间显示 |
| 群聊 | 选择群聊，查看发送者信息 |
| 搜索 | 顶部搜索框过滤联系人 |
| Apple 设计语言 | 检查颜色、字体、圆角符合规范 |
