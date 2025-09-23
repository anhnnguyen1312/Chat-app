import { useEffect } from 'react';
import CometChatApp from '../CometChat/CometChatApp';
import { useNavigate } from 'react-router-dom';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import { CometChatProvider } from '../CometChat/context/CometChatContext';

function Chat() {
  const navigate = useNavigate();
  useEffect(() => {
    CometChatUIKit.getLoggedinUser().then((user) => {
      if (!user) {
        navigate('/login-cometChat');
      }
    });
  }, [navigate]);
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <CometChatProvider>
        <CometChatApp />
      </CometChatProvider>
    </div>
  );
}

export default Chat;
