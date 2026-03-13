import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await API.get('/admin/dashboard');
        setMetrics(data);
      } catch (err) {
        if (err.response?.status === 401) navigate('/admin');
      }
    };
    fetchMetrics();
  }, [navigate]);

  if (!metrics) return <div className="text-center mt-20 text-gray-500 font-medium animate-pulse text-xl">Loading admin dashboard...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#161821] p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-800 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen -translate-y-1/2" />
        <div className="z-10">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">System Control Panel</h1>
          <p className="text-gray-400 mt-2 text-lg">Manage all system data and activities</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 border border-indigo-500/30 p-10 rounded-3xl shadow-lg shadow-indigo-500/10 text-white transform transition-transform hover:scale-105 duration-300">
          <h2 className="text-xl font-bold opacity-80 mb-2 tracking-wide uppercase text-indigo-200">Total Students Enrolled</h2>
          <p className="text-7xl font-black">{metrics.totalStudents}</p>
        </div>
        <div className="bg-gradient-to-br from-[#12141c] to-[#0f1015] border border-gray-800 p-10 rounded-3xl shadow-2xl text-white transform transition-transform hover:scale-105 duration-300">
          <h2 className="text-xl font-bold opacity-80 mb-2 tracking-wide uppercase text-gray-400">Assessments Completed</h2>
          <p className="text-7xl font-black">{metrics.totalTests}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Link to="/admin/students" className="group bg-[#161821] p-8 rounded-3xl shadow-2xl border border-gray-800 hover:border-indigo-500/50 transition-all block relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] group-hover:bg-indigo-500/20 transition-all" />
          <div className="w-16 h-16 bg-[#0f1015] border border-gray-800 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-600 group-hover:border-indigo-500 group-hover:text-white transition-colors duration-300 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 relative z-10">Manage Students</h2>
          <p className="text-gray-400 leading-relaxed mb-6 relative z-10">Review registered students, inspect individual test histories, or moderate user accounts.</p>
          <div className="text-indigo-400 font-bold group-hover:translate-x-2 group-hover:text-indigo-300 transition-all inline-flex items-center relative z-10">
            Go to Students <span className="ml-2">&rarr;</span>
          </div>
        </Link>
        
        <Link to="/admin/questions" className="group bg-[#161821] p-8 rounded-3xl shadow-2xl border border-gray-800 hover:border-purple-500/50 transition-all block relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-all" />
          <div className="w-16 h-16 bg-[#0f1015] border border-gray-800 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-600 group-hover:border-purple-500 group-hover:text-white transition-colors duration-300 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 relative z-10">Manage Questions</h2>
          <p className="text-gray-400 leading-relaxed mb-6 relative z-10">Create, modify, or remove assessment questions across Aptitude, Personality, and Interest.</p>
          <div className="text-purple-400 font-bold group-hover:translate-x-2 group-hover:text-purple-300 transition-all inline-flex items-center relative z-10">
            Go to Questions <span className="ml-2">&rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
