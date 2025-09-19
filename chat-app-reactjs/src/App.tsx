import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Login from './pages/Login';
import Chat from './pages/Chat';

const App = () => {
  return (
    /* CometChatApp requires a parent with explicit height & width to render correctly. 
     Adjust the height and width as needed.
     */

    //  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
    </Routes>
    // </Router>
  );
};

export default App;
