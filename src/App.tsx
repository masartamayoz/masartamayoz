import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from '@/src/pages/Home';
import Auth from '@/src/pages/Auth';
import Dashboard from '@/src/pages/Dashboard';
import Courses from '@/src/pages/Courses';
import Profile from '@/src/pages/Profile';
import Pricing from '@/src/pages/Pricing';
import About from '@/src/pages/About';
import Contact from '@/src/pages/Contact';

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
