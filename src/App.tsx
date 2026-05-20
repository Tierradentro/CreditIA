import { Routes, Route } from 'react-router';
import { AppProvider } from '@/context/AppContext';
import Home from '@/pages/Home';
import Chat from '@/pages/Chat';
import Admin from '@/pages/Admin';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AppProvider>
  );
}
