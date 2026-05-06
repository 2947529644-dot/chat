# Apple 风格微信聊天界面设计规范

**日期**: 2026-05-06  
**项目**: Vue 3 桌面端微信聊天应用  
**设计语言**: Apple Design System (参考 DESIGN.md)

---

## 1. 项目概述

构建一个桌面端微信聊天应用，采用 Apple 设计语言，实现以下核心功能：

- **基础聊天**: 发送/接收消息、时间戳、对话列表
- **群聊功能**: 群组创建、群聊消息、群成员显示
- **媒体消息**: 图片、视频、文件传输
- **联系人管理**: 联系人列表、搜索、个人资料

**技术栈**: Vue 3 + Vite + 模拟数据

---

## 2. 整体布局架构

### 2.1 双栏布局结构

```
┌────────────────────────────────────────────────────────────────┐
│  Global Nav (44px, 纯黑背景 #000000)                           │
│  [Logo]          [搜索框 - pill 形状]        [头像] [设置]      │
├──────────────────┬─────────────────────────────────────────────┤
│                  │                                             │
│  联系人列表       │            聊天窗口                          │
│  (280px 固定宽)   │            (flex 自适应)                     │
│                  │                                             │
│  背景: #f5f5f7   │            背景: #ffffff                    │
│  (parchment)     │            (canvas)                         │
│                  │                                             │
└──────────────────┴─────────────────────────────────────────────┘
```

### 2.2 响应式断点

| 断点 | 宽度 | 布局调整 |
|------|------|----------|
| 桌面 | ≥ 1024px | 双栏完整显示 |
| 小桌面 | 768-1023px | 联系人列表收窄至 240px |
| 平板 | ≤ 767px | 单栏切换模式 |

---

## 3. 色彩系统

### 3.1 色彩映射（基于 DESIGN.md）

| 元素 | 颜色 Token | Hex 值 | 说明 |
|------|-----------|--------|------|
| 顶部导航栏 | `surface-black` | #000000 | Apple 风格极简黑条 |
| 联系人列表背景 | `canvas-parchment` | #f5f5f7 | Apple 标志性米白 |
| 聊天窗口背景 | `canvas` | #ffffff | 纯白画布 |
| 我的消息气泡 | `primary` | #0066cc | Action Blue |
| 他人消息气泡 | `surface-pearl` | #fafafc | 柔和灰白 |
| 主文字颜色 | `ink` | #1d1d1f | 近黑墨水色 |
| 次要文字 | `ink-muted-48` | #7a7a7a | 灰色时间戳 |
| 分割线 | `divider-soft` | #f0f0f0 | 柔和边界 |
| 按钮文字 | `on-primary` | #ffffff | 白色 |

### 3.2 CSS 变量定义

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
  
  /* Border colors */
  --color-divider-soft: #f0f0f0;
  --color-hairline: #e0e0e0;
}
```

---

## 4. 排版系统

### 4.1 字体家族

```css
--font-display: "SF Pro Display", "Inter", system-ui, -apple-system, sans-serif;
--font-text: "SF Pro Text", "Inter", system-ui, -apple-system, sans-serif;
```

### 4.2 排版 Token 映射

| 元素 | Token | 字号 | 字重 | 行高 | 字间距 |
|------|-------|------|------|------|--------|
| 聊天标题 | `tagline` | 21px | 600 | 1.19 | 0.231px |
| 联系人名字 | `body-strong` | 17px | 600 | 1.24 | -0.374px |
| 消息内容 | `body` | 17px | 400 | 1.47 | -0.374px |
| 消息预览 | `caption` | 14px | 400 | 1.43 | -0.224px |
| 时间戳 | `fine-print` | 12px | 400 | 1.0 | -0.12px |
| 导航链接 | `nav-link` | 12px | 400 | 1.0 | -0.12px |
| 按钮文字 | `button-utility` | 14px | 400 | 1.29 | -0.224px |

---

## 5. 组件设计

### 5.1 Global Nav（顶部导航）

```
┌───────────────────────────────────────────────────────────────┐
│  [💬]     [🔍 搜索联系人或消息...]      [👤] [⚙️]           │
│                                                             │
└───────────────────────────────────────────────────────────────┘

高度: 44px
背景: surface-black (#000000)
文字: on-dark (#ffffff)
搜索框: pill 形状, 44px 高度, 背景 rgba(255,255,255,0.1)
```

**CSS**:
```css
.global-nav {
  height: 44px;
  background: var(--color-surface-black);
  color: var(--color-on-dark);
  padding: 0 24px;
}

.search-input {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px; /* pill */
  height: 32px;
  padding: 0 16px;
}
```

### 5.2 Contact List（联系人列表）

```
┌────────────────────────────┐
│  联系人 (21px/600)          │
├────────────────────────────┤
│  ┌──────────────────────┐  │
│  │ ● 张三               │  │
│  │   好的，明天见...     │  │
│  │                10:30  │  │
│  └──────────────────────┘  │
│                            │
│  ┌──────────────────────┐  │
│  │ ● 产品群 (群)        │  │
│  │   李四: 需求已更新    │  │
│  │                昨天   │  │
│  └──────────────────────┘  │
│                            │
└────────────────────────────┘

宽度: 280px
背景: canvas-parchment (#f5f5f7)
卡片 hover: surface-pearl (#fafafc)
选中状态: 左侧 3px primary 边框
```

**联系人卡片结构**:
```html
<div class="contact-card" :class="{ selected: isActive }">
  <div class="avatar">
    <img :src="contact.avatar" alt="" />
    <span v-if="contact.isGroup" class="group-badge">群</span>
  </div>
  <div class="content">
    <div class="name">{{ contact.name }}</div>
    <div class="preview">{{ contact.lastMessage }}</div>
  </div>
  <div class="time">{{ contact.time }}</div>
</div>
```

### 5.3 Chat Window（聊天窗口）

```
┌────────────────────────────────────────────────────────┐
│  聊天头部                                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  ← 产品群                           ⟦  ⟧  ⋮    │  │
│  │    5位成员 · 今天活跃                              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  消息列表                                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  ┌─────────────────────────────┐                 │  │
│  │  │  [头像] 李四                 │                 │  │
│  │  │         今天需求更新了        │                 │  │
│  │  │                    14:23     │                 │  │
│  │  └─────────────────────────────┘                 │  │
│  │                                                  │  │
│  │                  ┌─────────────────────────┐     │  │
│  │                  │  好的，我来处理          │     │  │
│  │                  │                 14:25   │     │  │
│  │                  └─────────────────────────┘     │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  输入区域                                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  [📎] [😊]  输入消息...              [发送] →    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘

背景: canvas (#ffffff)
头部高度: 52px
消息区域: flex-grow, 可滚动
输入区域高度: 64px
```

### 5.4 Message Bubble（消息气泡）

**他人消息（左对齐）**:
```css
.message-bubble.incoming {
  align-self: flex-start;
  background: var(--color-surface-pearl);
  border-radius: 18px 18px 18px 4px; /* 左下角略尖 */
  color: var(--color-ink);
  padding: 12px 16px;
  max-width: 70%;
}
```

**我的消息（右对齐）**:
```css
.message-bubble.outgoing {
  align-self: flex-end;
  background: var(--color-primary);
  border-radius: 18px 18px 4px 18px; /* 右下角略尖 */
  color: var(--color-on-primary);
  padding: 12px 16px;
  max-width: 70%;
}
```

**时间戳显示**:
- 每隔 5 分钟以上的消息显示时间戳
- 格式: "HH:MM" 或 "昨天 HH:MM" 或 "MM月DD日 HH:MM"

### 5.5 Input Area（输入区域）

```html
<div class="input-area">
  <button class="icon-btn" @click="attachFile">📎</button>
  <button class="icon-btn" @click="showEmoji">😊</button>
  <input 
    type="text" 
    class="message-input"
    placeholder="输入消息..."
    v-model="message"
    @keyup.enter="sendMessage"
  />
  <button class="send-btn" @click="sendMessage">发送 →</button>
</div>
```

**样式**:
```css
.input-area {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid var(--color-divider-soft);
}

.message-input {
  flex: 1;
  height: 44px;
  border-radius: 9999px; /* pill */
  border: 1px solid var(--color-hairline);
  padding: 0 16px;
  font-size: 17px;
}

.send-btn {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 9999px;
  padding: 8px 20px;
  font-size: 14px;
  transition: transform 0.1s;
}

.send-btn:active {
  transform: scale(0.95);
}
```

---

## 6. 状态管理

### 6.1 数据结构

```typescript
// types/index.ts

interface Contact {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  members?: string[]; // 群成员 ID 列表
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

interface Message {
  id: string;
  contactId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'file';
  timestamp: Date;
  isMine: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}
```

### 6.2 Store 结构

```typescript
// stores/chat.ts

interface ChatState {
  currentUser: User;
  contacts: Contact[];
  messages: Record<string, Message[]>; // contactId -> messages
  activeContactId: string | null;
}
```

---

## 7. 模拟数据

```typescript
// mock/data.ts

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: '张三',
    avatar: '/avatars/1.jpg',
    isGroup: false,
    lastMessage: '好的，明天见',
    lastMessageTime: new Date('2026-05-06T10:30:00'),
    unreadCount: 0
  },
  {
    id: '2',
    name: '产品讨论群',
    avatar: '/avatars/group1.jpg',
    isGroup: true,
    members: ['1', '3', '4', '5'],
    lastMessage: '李四: 需求已更新',
    lastMessageTime: new Date('2026-05-05T16:45:00'),
    unreadCount: 3
  },
  // ...
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      contactId: '1',
      senderId: '1',
      senderName: '张三',
      senderAvatar: '/avatars/1.jpg',
      content: '你好，明天有空吗？',
      type: 'text',
      timestamp: new Date('2026-05-06T10:00:00'),
      isMine: false
    },
    {
      id: 'm2',
      contactId: '1',
      senderId: 'me',
      senderName: '我',
      senderAvatar: '/avatars/me.jpg',
      content: '有的，什么事？',
      type: 'text',
      timestamp: new Date('2026-05-06T10:05:00'),
      isMine: true
    },
    // ...
  ],
  // ...
};
```

---

## 8. 文件结构

```
wx/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── DESIGN.md                    # Apple 设计规范参考
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── assets/
│   │   └── styles/
│   │       ├── variables.css    # CSS 变量
│   │       ├── reset.css        # 基础重置
│   │       └── global.css       # 全局样式
│   ├── components/
│   │   ├── GlobalNav.vue        # 顶部导航
│   │   ├── ContactList.vue      # 联系人列表
│   │   ├── ContactCard.vue      # 联系人卡片
│   │   ├── ChatWindow.vue       # 聊天窗口
│   │   ├── ChatHeader.vue       # 聊天头部
│   │   ├── MessageList.vue      # 消息列表
│   │   ├── MessageBubble.vue    # 消息气泡
│   │   ├── InputArea.vue        # 输入区域
│   │   └── MediaMessage.vue     # 媒体消息
│   ├── composables/
│   │   └── useChat.ts           # 聊天逻辑
│   ├── stores/
│   │   └── chat.ts              # Pinia store
│   ├── types/
│   │   └── index.ts             # TypeScript 类型
│   ├── mock/
│   │   └── data.ts              # 模拟数据
│   └── utils/
│       └── format.ts            # 格式化工具
└── public/
    └── avatars/                  # 头像图片
```

---

## 9. 验证方案

### 9.1 功能验证

1. **联系人切换**: 点击不同联系人，聊天窗口正确切换
2. **消息发送**: 输入文字，点击发送，消息出现在列表底部
3. **滚动行为**: 新消息自动滚动到底部
4. **时间戳显示**: 检查时间戳格式和显示间隔
5. **群聊消息**: 群聊中正确显示发送者头像和名字

### 9.2 样式验证

1. **色彩一致性**: 检查所有颜色使用 CSS 变量
2. **排版一致性**: 检查字号、字重符合规范
3. **圆角一致**: 消息气泡使用 18px 圆角
4. **间距一致**: 使用 8px 基础间距系统
5. **交互反馈**: 按钮按压有 scale(0.95) 效果

### 9.3 运行验证

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
# 检查页面渲染是否正确
```

---

## 10. 扩展功能（后续迭代）

以下功能不在初始实现范围，但设计已预留扩展点：

1. **媒体消息**: 图片/视频/文件发送和预览
2. **消息搜索**: 全局搜索历史消息
3. **表情选择器**: 点击表情按钮弹出选择面板
4. **联系人资料**: 点击头像查看详细信息
5. **群管理**: 群成员列表、添加/移除成员
6. **消息状态**: 已发送、已读状态指示
7. **多选操作**: 消息多选、转发、删除
