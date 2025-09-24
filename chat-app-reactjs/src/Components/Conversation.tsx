import ConversationItem from './ConversationItem';
import { useEffect, useState } from 'react';
import { database } from '../FireBase/config';
import { ref, onValue, get } from 'firebase/database';

interface ConversationType {
  type: 'group' | 'private';
  groupName?: string;
  members: string[];
  lastMessage: string;
  lastTimestamp: number;
}

interface ConversationWithId extends ConversationType {
  id: string;
}
interface UIConversationItem {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastTimestamp: number;
}
interface Props {
  currentUserId: string;
  onSelect: (userId: string) => void;

  setCond: (cond: UIConversationItem) => void;
}

const Conversation = ({ currentUserId, onSelect, setCond }: Props) => {
  const [conversations, setConversations] = useState<UIConversationItem[]>([]);
  useEffect(() => {
    try {
      const convRef = ref(database, 'conversations');

      const unsubscribe = onValue(convRef, async (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const list: ConversationWithId[] = Object.entries(data)
            .map(([id, value]) => ({
              id,
              ...(value as ConversationType),
            }))
            .filter((convo) => convo?.members?.includes(currentUserId));
          // Lọc theo user hiện tại

          const userSnap = await get(ref(database, 'users'));
          const usersData = userSnap.val() || {};

          const result: UIConversationItem[] = list.map((conv) => {
            if (conv.type === 'group') {
              return {
                id: conv.id,
                participantId: conv.id, // Hoặc dùng groupId nếu có riêng
                participantName: conv.groupName || 'Group',
                participantAvatar: 'group_default.png', // nếu có
                lastMessage: conv.lastMessage,
                lastTimestamp: conv.lastTimestamp,
              };
            } else {
              // private chat: tìm user còn lại
              const participantId = conv.members.find(
                (id) => id !== currentUserId
              )!;
              const participant = usersData[participantId];

              return {
                id: conv.id,
                participantId,
                participantName: participant?.name || 'Unknown',
                participantAvatar: participant?.avatar || '',
                lastMessage: conv.lastMessage,
                lastTimestamp: conv.lastTimestamp,
              };
            }
          });
          setConversations(result);
        } else {
          setConversations([]);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [currentUserId]);

  const handleSelect = (cond: UIConversationItem) => {
    setCond(cond);
  };
  return (
    <div className="p-1">
      {conversations.map((item, index) => (
        <ConversationItem
          item={item}
          participantId={item.participantId}
          message={item.lastMessage}
          name={item.participantName}
          key={index}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default Conversation;
