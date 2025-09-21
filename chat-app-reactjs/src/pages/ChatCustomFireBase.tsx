// // import { useState, useEffect } from 'react';
// // import { database } from '../FireBase/config';
// // import { ref, push, onValue } from 'firebase/database';

// // function ChatCustom() {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');

// //   useEffect(() => {
// //     const messagesRef = ref(database, 'messages');
// //     onValue(messagesRef, (snapshot) => {
// //       const data = snapshot.val();
// //       if (data) {
// //         const msgs = Object.values(data);
// //         setMessages(msgs);
// //       } else {
// //         setMessages([]);
// //       }
// //     });
// //   }, []);

// //   const sendMessage = () => {
// //     if (input.trim() === '') return;
// //     const messagesRef = ref(database, 'messages');
// //     push(messagesRef, {
// //       text: input,
// //       timestamp: Date.now(),
// //     });
// //     setInput('');
// //   };

// //   return (
// //     <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial' }}>
// //       <h2>React Firebase Chat Demo</h2>
// //       <div
// //         style={{
// //           border: '1px solid #ccc',
// //           padding: 10,
// //           height: 300,
// //           overflowY: 'scroll',
// //           marginBottom: 10,
// //           background: '#f9f9f9',
// //         }}
// //       >
// //         {messages.length === 0 && <p>No messages yet.</p>}
// //         {messages.map((msg, idx) => (
// //           <div key={idx} style={{ marginBottom: 8 }}>
// //             <span>{new Date(msg.timestamp).toLocaleTimeString()}: </span>
// //             <strong>{msg.text}</strong>
// //           </div>
// //         ))}
// //       </div>

// //       <input
// //         type="text"
// //         placeholder="Type a message..."
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //         onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
// //         style={{ width: '80%', padding: 8 }}
// //       />
// //       <button
// //         onClick={sendMessage}
// //         style={{ padding: '8px 16px', marginLeft: 10 }}
// //       >
// //         Send
// //       </button>
// //     </div>
// //   );
// // }

// // export default ChatCustom;
// import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
// import { database } from '../FireBase/config';
// import { ref, push, onValue } from 'firebase/database';

// // Định nghĩa kiểu cho message
// interface Message {
//   text: string;
//   timestamp: number;
// }

// function ChatCustom() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>('');
//     const messagesRef = ref(database, 'messages');

//   useEffect(() => {
//     const messagesRef = ref(database, 'messages');
//     // Lắng nghe realtime database
//     const unsubscribe = onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const msgs: Message[] = Object.values(data);
//         setMessages(msgs);
//       } else {
//         setMessages([]);
//       }
//     });

//     // Cleanup listener khi component unmount
//     return () => unsubscribe();
//   }, []);
//   push(messagesRef, {
//     text: 'Test message ' + new Date().toLocaleTimeString(),
//     timestamp: Date.now(),
//   })
//     .then(() => console.log('Test message sent'))
//     .catch((err) => console.error(err));

//   onValue(messagesRef, (snapshot) => {
//     console.log('Realtime DB data:', snapshot.val());
//   });
//   const sendMessage = () => {
//     if (input.trim() === '') return;
//     push(messagesRef, {
//       text: input,
//       timestamp: Date.now(),
//     })
//       .then(() => {
//         console.log('Message sent successfully');
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//       });
//     setInput('');
//   };
//   // Handler thay đổi input
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   // Handler bắt phím Enter
//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') sendMessage();
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial' }}>
//       <h2>React Firebase Chat Demo</h2>
//       <div
//         style={{
//           border: '1px solid #ccc',
//           padding: 10,
//           height: 300,
//           overflowY: 'scroll',
//           marginBottom: 10,
//           background: '#f9f9f9',
//         }}
//       >
//         {messages.length === 0 && <p>No messages yet.</p>}
//         {messages.map((msg, idx) => (
//           <div key={idx} style={{ marginBottom: 8 }}>
//             <span>{new Date(msg.timestamp).toLocaleTimeString()}: </span>
//             <strong>{msg.text}</strong>
//           </div>
//         ))}
//       </div>

//       <input
//         type="text"
//         placeholder="Type a message..."
//         value={input}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         style={{ width: '80%', padding: 8 }}
//       />
//       <button
//         onClick={sendMessage}
//         style={{ padding: '8px 16px', marginLeft: 10 }}
//       >
//         Send
//       </button>
//     </div>
//   );
// }

// export default ChatCustom;

import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { database } from '../FireBase/config';
import { ref, push, onValue } from 'firebase/database';

interface Message {
  text: string;
  timestamp: number;
}
function ChatCustomFireBase() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesRef = ref(database, 'messages');

  useEffect(() => {
    // Lắng nghe dữ liệu realtime
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const msgs: Message[] = Object.values(data);
        setMessages(msgs);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [messagesRef]);

  const sendMessage = () => {
    if (input.trim() === '') return;

    push(messagesRef, {
      text: input,
      timestamp: Date.now(),
    })
      .then(() => console.log('Message sent successfully'))
      .catch((error) => console.error('Error sending message:', error));

    setInput('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>React Firebase Chat Demo</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: 10,
          height: 300,
          overflowY: 'scroll',
          marginBottom: 10,
          background: '#f9f9f9',
        }}
      >
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}: </span>
            <strong>{msg.text}</strong>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ width: '80%', padding: 8 }}
      />
      <button
        onClick={sendMessage}
        style={{ padding: '8px 16px', marginLeft: 10 }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatCustomFireBase;
