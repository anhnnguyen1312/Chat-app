import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Chat from './pages/Chat';
import ChatCustomFireBase from './pages/ChatCustomFireBase';
import ChatCustom from './pages/ChatCustom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login-firebase" element={<Login cometChat={false} />} />
        <Route path="/login-cometChat" element={<Login cometChat={true} />} />

        <Route path="/chat-custom-firebase" element={<ChatCustomFireBase />} />
        <Route path="/chat-custom" element={<ChatCustom />} />
      </Routes>
    </Router>
  );
};

export default App;
