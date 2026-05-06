import type { Contact, Message, User } from '@/types'

export const mockCurrentUser: User = {
  id: 'user-1',
  name: '我',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me'
}

export const mockContacts: Contact[] = [
  {
    id: 'contact-1',
    name: '张小雨',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    isGroup: false,
    lastMessage: '明天见！',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2
  },
  {
    id: 'contact-2',
    name: '李明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    isGroup: false,
    lastMessage: '谢谢你的帮助！',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 0
  },
  {
    id: 'contact-3',
    name: '产品讨论群',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=team',
    isGroup: true,
    members: ['张小雨', '李明', '王大伟'],
    lastMessage: '下午三点开会',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 5
  },
  {
    id: 'contact-4',
    name: '王大伟',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    isGroup: false,
    lastMessage: '收到了，谢谢！',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0
  },
  {
    id: 'contact-5',
    name: '家人群',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=family',
    isGroup: true,
    members: ['妈妈', '爸爸', '姐姐', '我'],
    lastMessage: '妈妈: 周日晚上七点吃饭',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 3
  }
]

export const mockMessages: Record<string, Message[]> = {
  'contact-1': [
    {
      id: 'msg-1-1',
      contactId: 'contact-1',
      senderId: 'contact-1',
      senderName: '张小雨',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: '嗨！最近怎么样？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isMine: false
    },
    {
      id: 'msg-1-2',
      contactId: 'contact-1',
      senderId: 'user-1',
      senderName: '我',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: '挺好的，谢谢！你呢？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 9),
      isMine: true
    },
    {
      id: 'msg-1-3',
      contactId: 'contact-1',
      senderId: 'contact-1',
      senderName: '张小雨',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: '很好！我们明天还是老地方见吧？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 7),
      isMine: false
    },
    {
      id: 'msg-1-4',
      contactId: 'contact-1',
      senderId: 'user-1',
      senderName: '我',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: '好的没问题，老地方老时间。',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 6),
      isMine: true
    },
    {
      id: 'msg-1-5',
      contactId: 'contact-1',
      senderId: 'contact-1',
      senderName: '张小雨',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: '明天见！',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isMine: false
    }
  ],
  'contact-2': [
    {
      id: 'msg-2-1',
      contactId: 'contact-2',
      senderId: 'contact-2',
      senderName: '李明',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      content: '你好！能帮我个忙吗？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      isMine: false
    },
    {
      id: 'msg-2-2',
      contactId: 'contact-2',
      senderId: 'user-1',
      senderName: '我',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: '当然可以，你需要什么帮助？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 34),
      isMine: true
    },
    {
      id: 'msg-2-3',
      contactId: 'contact-2',
      senderId: 'contact-2',
      senderName: '李明',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      content: '我在做项目配置，能分享一下文档吗？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 33),
      isMine: false
    },
    {
      id: 'msg-2-4',
      contactId: 'contact-2',
      senderId: 'user-1',
      senderName: '我',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: '文档链接发给你了，有问题随时问我。',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 31),
      isMine: true
    },
    {
      id: 'msg-2-5',
      contactId: 'contact-2',
      senderId: 'contact-2',
      senderName: '李明',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      content: '谢谢你的帮助！',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isMine: false
    }
  ],
  'contact-3': [
    {
      id: 'msg-3-1',
      contactId: 'contact-3',
      senderId: 'contact-1',
      senderName: '张小雨',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: '各位，今天有项目进度更新会议。',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 65),
      isMine: false
    },
    {
      id: 'msg-3-2',
      contactId: 'contact-3',
      senderId: 'contact-2',
      senderName: '李明',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      content: '几点开会？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 63),
      isMine: false
    },
    {
      id: 'msg-3-3',
      contactId: 'contact-3',
      senderId: 'contact-1',
      senderName: '张小雨',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: '下午三点开会',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      isMine: false
    }
  ],
  'contact-4': [
    {
      id: 'msg-4-1',
      contactId: 'contact-4',
      senderId: 'user-1',
      senderName: '我',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: '大伟，我发的文件收到了吗？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
      isMine: true
    },
    {
      id: 'msg-4-2',
      contactId: 'contact-4',
      senderId: 'contact-4',
      senderName: '王大伟',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      content: '收到了，谢谢！',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isMine: false
    }
  ],
  'contact-5': [
    {
      id: 'msg-5-1',
      contactId: 'contact-5',
      senderId: 'family-mom',
      senderName: '妈妈',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mom',
      content: '大家好！这周过得怎么样？',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      isMine: false
    },
    {
      id: 'msg-5-2',
      contactId: 'contact-5',
      senderId: 'family-dad',
      senderName: '爸爸',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dad',
      content: '我这边挺好的，最近在忙一个新项目。',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
      isMine: false
    },
    {
      id: 'msg-5-3',
      contactId: 'contact-5',
      senderId: 'user-1',
      senderName: '我',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: '工作挺忙的，不过期待周末！',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.2),
      isMine: true
    },
    {
      id: 'msg-5-4',
      contactId: 'contact-5',
      senderId: 'family-mom',
      senderName: '妈妈',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mom',
      content: '周日晚上七点吃饭',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isMine: false
    }
  ]
}
