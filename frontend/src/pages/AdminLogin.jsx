import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/admin/login', { username, password });
      data.role = 'admin';
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative p-4 w-full h-full overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <button onClick={() => navigate('/')} className="absolute top-8 left-8 md:top-12 md:left-12 text-gray-400 font-bold hover:text-white flex items-center gap-3 group transition-all z-20 hover:scale-105">
        <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-md bg-[#161821]/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-800 shadow-purple-500/10 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 mb-8">
        <h2 className="text-3xl font-black text-center text-white mb-8 tracking-tight">Admin Access</h2>
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm font-medium animate-in fade-in duration-300">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">Admin Username</label>
            <input 
              type="text" 
              className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(168,85,247,0.3)] placeholder-gray-600"
              placeholder="Enter admin username"
              value={username} onChange={(e) => setUsername(e.target.value)} required 
            />
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(168,85,247,0.3)] placeholder-gray-600"
              placeholder="Enter admin password"
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button type="submit" className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
