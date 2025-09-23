import Conversation from '../Components/Conversation';
import Messages from '../Components/Messages';
// ConversationList.jsx
import { useEffect, useState } from 'react';
import { database } from '../FireBase/config';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import UserSearch from '../Components/UserSearch';

interface User {
  id: string;
  name: string;
  avatar: string;
}

// const currentUser: User = {
//   id: 'user1',
//   name: 'Nguyễn Văn A',
//   avatar: 'https://i.pravatar.cc/150?u=user1',
// };

let data: User = {
  id: '',
  name: '',
  avatar: '',
};
let userData: User = {
  id: '',
  name: '',
  avatar: '',
};
const ChatCustom = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [otherUserData, setOtherUserData] = useState<User>(data);

  // const otherUser = selectedUserId ? otherUserList[selectedUserId] : null;
  // const otherUser = null;
  const navigate = useNavigate();
  const rawUser = localStorage.getItem('user-chatCustom');
  const userDataLocal = rawUser ? JSON.parse(rawUser) : null;

  if (userDataLocal) {
    userData = {
      id: userDataLocal.id,
      name: userDataLocal.email,
      avatar: userDataLocal.avatar,
    };
  }
  console.log('selectedUserId', selectedUserId);
  console.log('otherUserData', otherUserData);

  useEffect(() => {
    if (selectedUserId) {
      const filtered = users.filter((u) => u.id === selectedUserId);
      setOtherUserData(filtered[0]);
    }
  }, [selectedUserId, users]);

  useEffect(() => {
    console.log(userDataLocal, 'userDataLocal');
    if (!userDataLocal) {
      navigate('/login-firebase');
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('user-chatCustom');
    navigate('/login-firebase'); // hoặc '/' tùy app bạn
  };

  useEffect(() => {
    const usersRef = ref(database, 'users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const userList: User[] = Object.entries(data).map(([id, user]) => ({
        id,
        ...(user as Omit<User, 'id'>),
      }));

      // const filtered = userList.filter((u) => u.id !== currentUser.id);
      setUsers(userList);
    });

    return () => {
      unsubscribe();
    };
  }, [userData.id]);
  const handleSelectUser = (user: User) => {
    setOtherUserData(user);
  };
  return (
    <div className="">
      <div className="flex bg-white dark:bg-gray-900">
        <div className="w-20  text-gray-500 h-screen flex flex-col items-center justify-between py-5">
          <div className="">
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
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="py-4 hover:text-gray-700">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div className="py-4 hover:text-gray-700 flex flex-col items-center justify-center text-blue-600">
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
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
            </div>
            <div className="py-4 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
          <div className="" onClick={handleLogout}>
            {/* 
             //iconsetting
             // <svg
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 hover:text-red-600 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
          </div>
        </div>
        <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
          <div className="h-full overflow-y-auto">
            <div className="text-md font-extrabold text-gray-600 dark:text-gray-200 p-1">
              {userData.name}
            </div>
            <div className="search-chat flex p-1">
              <input
                className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md"
                type="text"
                placeholder="Search Messages"
              />

              <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex p-1 flex-col gap-[10px]">
              {/* <input
                            className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md"
                            type="text"
                            placeholder="Search Messages"
                          /> */}
              <UserSearch users={users} onSelectUser={handleSelectUser} />
            </div>
            <div className="text-lg font-semibol text-gray-600 dark:text-gray-200 p-3">
              Recent
            </div>
            {userData.id && (
              <Conversation
                currentUserId={userData.id}
                onSelect={setSelectedUserId}
              />
            )}
          </div>
        </div>
        <div className="flex-grow  h-screen p-2 rounded-md">
          {otherUserData.id && userData.id && (
            <Messages currentUser={userData} otherUser={otherUserData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatCustom;
