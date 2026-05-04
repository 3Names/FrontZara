import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CrearPage from './CrearPage';
import MessagesPage from './MessagesPage';
import NotificationsPage from './NotificationsPage';
import SettingsPage from './SettingsPage';
import ProfilePage from './ProfilePage';

// Mock data for demonstration

const mockData = {
  session: {
    id: 1,
    nickname: 'User',
    rol: 'user',
    foto: '/images/user.png'
  },
  users: [
    {
      id: 1,
      nickname: 'Admin',
      foto: 'user.png',
      bio: 'MVMood administrator.'
    },
    {
      id: 2,
      nickname: 'Luna',
      foto: 'user.png',
      bio: 'Sharing my mood and stories.'
    }
  ],
  publicaciones: [
    {
      id: 1,
      contenido: 'Welcome to MVMood!',
      fecha: '2024-04-08',
      usuario_foto: 'user.png',
      nickname: 'Admin',
      idUsuario: 1,
      likes: 5,
      comments: 2
    },
    {
      id: 2,
      contenido: 'Loving how the community is growing here.',
      fecha: '2026-04-20',
      usuario_foto: 'user.png',
      nickname: 'Luna',
      idUsuario: 2,
      likes: 3,
      comments: 1
    }
  ],
  notificaciones: [
    {
      id: 1,
      title: 'Welcome',
      body: 'Welcome to MVMood!',
      tiempo: '2024-04-08',
      unread: true
    }
  ],
  mensajes: [
    {
      id: 1,
      nombre: 'Admin',
      preview: 'Welcome message',
      tiempo: '2024-04-08',
      unread: true,
      unreadCount: 1
    }
  ]
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage data={mockData} />} />
        <Route path="/home" element={<HomePage data={mockData} />} />
        <Route path="/crear" element={<CrearPage data={mockData} />} />
        <Route path="/messages" element={<MessagesPage data={mockData} />} />
        <Route path="/notifications" element={<NotificationsPage data={mockData} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile/:userId" element={<ProfilePage data={mockData} />} />
      </Routes>
    </Router>
  )
}

export default App
