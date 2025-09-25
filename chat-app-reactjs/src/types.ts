export interface ConversationType {
  type: 'group' | 'private';
  groupName?: string;
  members: string[];
  lastMessage: string;
  lastTimestamp: number;
}

export interface ConversationWithId extends ConversationType {
  id: string;
}
export interface UIConversationItem {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastTimestamp: number;
}
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: number;
}
