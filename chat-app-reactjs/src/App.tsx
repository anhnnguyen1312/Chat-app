import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Chat from './pages/Chat';
import ChatCustom from './pages/ChatCustom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat-custom" element={<ChatCustom />} />
      </Routes>
    </Router>
  );
};

export default App;
