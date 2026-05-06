import type { Contact, Message, User } from '@/types'

export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'Me',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me'
}

export const mockContacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Alice Wang',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    isGroup: false,
    lastMessage: 'See you tomorrow!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2
  },
  {
    id: 'contact-2',
    name: 'Bob Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    isGroup: false,
    lastMessage: 'Thanks for the help!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 0
  },
  {
    id: 'contact-3',
    name: 'Project Team',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=team',
    isGroup: true,
    members: ['Alice Wang', 'Bob Chen', 'David Lee'],
    lastMessage: 'Meeting at 3pm',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 5
  },
  {
    id: 'contact-4',
    name: 'David Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    isGroup: false,
    lastMessage: 'Got it, thanks!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0
  },
  {
    id: 'contact-5',
    name: 'Family Group',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=family',
    isGroup: true,
    members: ['Mom', 'Dad', 'Sister', 'Me'],
    lastMessage: 'Mom: Dinner at 7pm on Sunday',
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
      senderName: 'Alice Wang',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: 'Hey! How are you doing?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isMine: false
    },
    {
      id: 'msg-1-2',
      contactId: 'contact-1',
      senderId: 'user-1',
      senderName: 'Me',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: 'I am good, thanks! How about you?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 9),
      isMine: true
    },
    {
      id: 'msg-1-3',
      contactId: 'contact-1',
      senderId: 'contact-1',
      senderName: 'Alice Wang',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: 'Great! Are we still meeting tomorrow?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 7),
      isMine: false
    },
    {
      id: 'msg-1-4',
      contactId: 'contact-1',
      senderId: 'user-1',
      senderName: 'Me',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: 'Yes, definitely! Same place, same time.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 6),
      isMine: true
    },
    {
      id: 'msg-1-5',
      contactId: 'contact-1',
      senderId: 'contact-1',
      senderName: 'Alice Wang',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: 'See you tomorrow!',
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
      senderName: 'Bob Chen',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      content: 'Hi! Can you help me with something?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      isMine: false
    },
    {
      id: 'msg-2-2',
      contactId: 'contact-2',
      senderId: 'user-1',
      senderName: 'Me',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: 'Sure, what do you need?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 34),
      isMine: true
    },
    {
      id: 'msg-2-3',
      contactId: 'contact-2',
      senderId: 'contact-2',
      senderName: 'Bob Chen',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      content: 'I need help with the project setup. Can you share the documentation?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 33),
      isMine: false
    },
    {
      id: 'msg-2-4',
      contactId: 'contact-2',
      senderId: 'user-1',
      senderName: 'Me',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: 'Here is the link to the documentation. Let me know if you have any questions.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 31),
      isMine: true
    },
    {
      id: 'msg-2-5',
      contactId: 'contact-2',
      senderId: 'contact-2',
      senderName: 'Bob Chen',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      content: 'Thanks for the help!',
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
      senderName: 'Alice Wang',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: 'Team, we have a project update meeting today.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 65),
      isMine: false
    },
    {
      id: 'msg-3-2',
      contactId: 'contact-3',
      senderId: 'contact-2',
      senderName: 'Bob Chen',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      content: 'What time is the meeting?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 63),
      isMine: false
    },
    {
      id: 'msg-3-3',
      contactId: 'contact-3',
      senderId: 'contact-1',
      senderName: 'Alice Wang',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      content: 'Meeting at 3pm',
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
      senderName: 'Me',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: 'Hey David, did you receive the files I sent?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
      isMine: true
    },
    {
      id: 'msg-4-2',
      contactId: 'contact-4',
      senderId: 'contact-4',
      senderName: 'David Lee',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      content: 'Got it, thanks!',
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
      senderName: 'Mom',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mom',
      content: 'Hi everyone! How is your week going?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      isMine: false
    },
    {
      id: 'msg-5-2',
      contactId: 'contact-5',
      senderId: 'family-dad',
      senderName: 'Dad',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dad',
      content: 'All good here! Working on a new project.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
      isMine: false
    },
    {
      id: 'msg-5-3',
      contactId: 'contact-5',
      senderId: 'user-1',
      senderName: 'Me',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: 'Busy with work, but looking forward to the weekend!',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.2),
      isMine: true
    },
    {
      id: 'msg-5-4',
      contactId: 'contact-5',
      senderId: 'family-mom',
      senderName: 'Mom',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mom',
      content: 'Dinner at 7pm on Sunday',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isMine: false
    }
  ]
}
