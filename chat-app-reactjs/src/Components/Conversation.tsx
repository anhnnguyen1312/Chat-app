import ConversationItem from './ConversationItem';
import { useEffect, useState } from 'react';
import { database } from '../FireBase/config';
import { ref, onValue } from 'firebase/database';
interface ConversationType {
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastTimestamp: number;
}
interface Props {
  currentUserId: string;
  onSelect: (userId: string) => void;
}
const Conversation = ({ currentUserId, onSelect }: Props) => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  useEffect(() => {
    console.log('useEffect run');

    const convRef = ref(database, `conversations/${currentUserId}`);
    const unsubscribe = onValue(convRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data) as ConversationType[];
        console.log('list', list);
        setConversations(list);
      } else {
        setConversations([]);
      }
    });

    return () => unsubscribe();
  }, [currentUserId]);
  console.log('conversations', conversations);

  const handleSelect = (participantId: string) => {
    onSelect(participantId);
  };
  return (
    <div className="p-1">
      {conversations.map((item, index) => (
        <ConversationItem
          participantId={item.participantId}
          message={item.lastMessage}
          //  time={item.time}
          name={item.participantName}
          //active={item.active}
          key={index}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default Conversation;
