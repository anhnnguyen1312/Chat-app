import { useEffect, useState } from 'react';
import { database } from '../FireBase/config';
import { ref, onValue, push, set, update } from 'firebase/database';
interface User {
  id: string;
  name: string;
  avatar: string;
}
interface Props {
  currentUser: User;
  otherUser: User;
}
interface Message {
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: number;
}
interface ConversationType {
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastTimestamp: number;
}

const Messages = ({ currentUser, otherUser }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const convId =
    currentUser.id < otherUser?.id
      ? `${currentUser.id}_${otherUser?.id}`
      : `${otherUser?.id}_${currentUser.id}`;

  useEffect(() => {
    const msgRef = ref(database, `messages/${convId}`);
    const unsubscribe = onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data) as Message[];
        list.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(list);
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, [convId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const timestamp = Date.now();
    const newMessage: Message = {
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp,
    };

    const msgRef = ref(database, `messages/${convId}`);
    const newMsgRef = push(msgRef);
    await set(newMsgRef, newMessage);

    const updateData: Record<string, ConversationType> = {};
    updateData[`conversations/${currentUser.id}/${otherUser?.id}`] = {
      participantId: otherUser?.id,
      participantName: otherUser?.name,
      participantAvatar: otherUser?.avatar,
      lastMessage: text,
      lastTimestamp: timestamp,
    };
    updateData[`conversations/${otherUser?.id}/${currentUser.id}`] = {
      participantId: currentUser.id,
      participantName: currentUser.name,
      participantAvatar: currentUser.avatar,
      lastMessage: text,
      lastTimestamp: timestamp,
    };

    await update(ref(database), updateData);

    setText('');
  };
  const formatTimestamp = (ts: number): string => {
    return new Date(ts).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  console.log('message cpn');
  console.log('message ', messages);

  return (
    <div className="flex-grow h-full flex flex-col">
      <div className="w-full h-15 p-1 bg-primary dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
        <div className="flex p-2 align-middle items-center">
          <div className="p-2 md:hidden rounded-full mr-1 hover:bg-primary_bold text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <div className="border rounded-full border-white p-1/2">
            <img
              className="w-14 h-14 rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
          </div>
          <div className="flex-grow p-2">
            <div className="text-md text-gray-50 font-semibold">
              {otherUser.name}
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <div className="text-xs text-gray-50 ml-1">Online</div>
            </div>
          </div>
          <div className="p-2 text-white cursor-pointer hover:bg-primary_bold rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
        {messages.map((msg, idx) => {
          const isMine = msg.senderId === currentUser.id;

          if (isMine) {
            return (
              <div key={idx} className="flex justify-end">
                <div className="flex items-end w-3/4 bg-primary dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
                  <div className="p-2">
                    <div className="text-gray-200">{msg.text}</div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={idx} className="flex items-end w-3/4">
                <img
                  className="hidden w-8 h-8 m-3 rounded-full"
                  src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                  alt="avatar"
                />
                <div className="w-8 m-3 rounded-full" />
                <div className="p-3 bg-primary dark:bg-gray-800 mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
                  <div className="text-xs text-gray-600 dark:text-gray-200">
                    {msg.senderName}
                  </div>
                  <div className="text-gray-700 dark:text-gray-200">
                    {msg.text}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatTimestamp(msg.timestamp)}
                  </div>
                </div>
              </div>
            );
          }
        })}

        {/* <div className="flex items-end w-3/4">
          <img
            className="hidden w-8 h-8 m-3 rounded-full"
            src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
            alt="avatar"
          />
          <div className="w-8 m-3 rounded-full" />
          <div className="p-3 bg-purple-300 dark:bg-gray-800 mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
            <div className="text-xs text-gray-600 dark:text-gray-200">
              Rey Jhon A. Baqurin
            </div>
            <div className="text-gray-700 dark:text-gray-200">
              gsegjsghjbdg bfb sbjbfsj fsksnf jsnfj snf nnfnsnfsnj
            </div>
            <div className="text-xs text-gray-400">1 day ago</div>
          </div>
        </div> */}

        {/* <div className="flex justify-end">
          <div className="flex items-end w-3/4 bg-purple-500 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
            <div className="p-2">
              <div className="text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="h-15  p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center">
          <div className="p-2 text-gray-600 dark:text-gray-200 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="search-chat flex flex-grow p-2">
            <input
              className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md"
              type="text"
              placeholder="Type your message ..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // ngăn reload nếu form
                  sendMessage();
                }
              }}
            />
            <div
              onClick={sendMessage}
              className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
