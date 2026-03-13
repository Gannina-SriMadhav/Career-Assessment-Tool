import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const StudentRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '', education: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      const { data } = await API.post('/auth/student/register', formData);
      setSuccessMsg(data.message || 'Registration successful. You can now log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative p-4 w-full h-full overflow-hidden min-h-[calc(100vh-2rem)]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{animationDelay: '0.5s'}} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{animationDelay: '1.5s'}} />
      </div>

      <button onClick={() => navigate('/')} className="absolute top-8 left-8 md:top-12 md:left-12 text-gray-400 font-bold hover:text-white flex items-center gap-3 group transition-all z-20 hover:scale-105">
        <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-md bg-[#161821]/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-800 shadow-indigo-500/10 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h2 className="text-3xl font-black text-center text-white mb-8 tracking-tight">Student Register</h2>
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm font-medium animate-in fade-in duration-300">{error}</div>}
        {successMsg && <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 text-sm font-medium animate-in fade-in duration-300">{successMsg}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(79,70,229,0.3)] placeholder-gray-600" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email Address" required className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(79,70,229,0.3)] placeholder-gray-600" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(79,70,229,0.3)] placeholder-gray-600" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <input type="number" placeholder="Age" required className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(79,70,229,0.3)] placeholder-gray-600" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
          <select required className="w-full bg-[#0f1015] border border-gray-700 text-white rounded-xl p-3.5 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(79,70,229,0.3)]" value={formData.education} onChange={(e) => setFormData({...formData, education: e.target.value})}>
            <option value="" className="text-gray-500">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
          <button type="submit" className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300">Create Account</button>
        </form>
        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline decoration-indigo-500/30 underline-offset-4 hover:decoration-indigo-400">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;
