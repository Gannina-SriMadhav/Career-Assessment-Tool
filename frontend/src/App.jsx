import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import StudentDashboard from './pages/StudentDashboard';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageStudents from './pages/ManageStudents';
import ManageQuestions from './pages/ManageQuestions';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const MainLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/login', '/register', '/admin', '/forgot-password'];
  const hideGlobalNavbar = hideNavbarPaths.includes(location.pathname) || location.pathname.startsWith('/reset-password');

  return (
    <div className="min-h-screen font-sans bg-[#0f1015] text-gray-100 flex flex-col selection:bg-indigo-500/30">
      {!hideGlobalNavbar && <Navbar />}
      <main className={!hideGlobalNavbar ? "flex-grow container mx-auto px-4 py-8 relative z-10" : "flex-grow relative z-10 flex flex-col"}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/test/:type" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/questions" element={<ManageQuestions />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
