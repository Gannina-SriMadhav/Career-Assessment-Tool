import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const { data } = await API.put(`/auth/student/reset-password/${token}`, { password });
      setMessage(data.message || 'Password has been reset successfully.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Token may be invalid or expired.');
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative p-4 w-full h-full overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      </div>

      <div className="w-full max-w-md bg-[#161821]/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-800 shadow-purple-500/10 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h2 className="text-3xl font-black text-center text-white mb-8 tracking-tight">Reset Password</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm font-medium animate-in fade-in duration-300">{error}</div>}
        {message && <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 text-sm font-medium animate-in fade-in duration-300">{message}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">New Password</label>
            <input 
              type="password" 
              className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(168,85,247,0.3)] placeholder-gray-600"
              placeholder="Enter new password"
              value={password} onChange={(e) => setPassword(e.target.value)} required 
              minLength="6"
            />
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">Confirm New Password</label>
            <input 
              type="password" 
              className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(168,85,247,0.3)] placeholder-gray-600"
              placeholder="Confirm new password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required 
              minLength="6"
            />
          </div>
          <button type="submit" disabled={message !== ''} className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl font-bold transition-all duration-300 ${message ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-1 active:scale-95'}`}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
