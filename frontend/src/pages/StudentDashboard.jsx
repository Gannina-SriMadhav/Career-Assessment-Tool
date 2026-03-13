import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/student/dashboard');
        setData(res.data);
      } catch (err) {
        if (err.response?.status === 401) navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  if (!data) return <div className="text-center mt-20 text-gray-500 font-medium animate-pulse">Loading dashboard...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#161821] p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-800 shadow-indigo-500/5 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -z-10 mix-blend-screen" />
        <div className="z-10">
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 tracking-tight">Welcome, {data.name}!</h1>
          <p className="text-gray-400 mt-2 text-lg">Ready to discover your ideal career path?</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#161821] p-8 rounded-3xl shadow-2xl border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex justify-center items-center mr-3 text-sm">✓</span>
            Available Tests
          </h2>
          <div className="space-y-4">
            {data.testsAvailable.map(test => (
              <div key={test} className="group flex justify-between items-center p-5 border border-gray-800 bg-[#0f1015] rounded-xl hover:border-indigo-500/50 hover:bg-[#12141c] transition-all cursor-pointer">
                <span className="font-semibold text-gray-200 text-lg">{test} Test</span>
                <button 
                  onClick={() => navigate(`/test/${test.toLowerCase()}`)}
                  className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-5 py-2 rounded-lg font-bold hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  Take Test
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#161821] p-8 rounded-3xl shadow-2xl border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Your Previous Results</h2>
          {data.previousResults?.length > 0 ? (
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {data.previousResults.map((res, i) => (
                <div key={i} className="p-5 border border-gray-800 rounded-xl bg-[#0f1015] hover:border-indigo-500/30 hover:bg-[#12141c] transition-colors group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{new Date(res.date).toLocaleDateString()}</span>
                    <span className="text-indigo-300 font-bold bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-sm">{res.suggestedCareer}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-300 grid grid-cols-3 gap-2 text-center bg-[#161821] p-3 rounded-lg border border-gray-800">
                    <div><div className="text-xs text-gray-500 mb-1">Aptitude</div>{res.aptitudeScore}</div>
                    <div className="border-l border-r border-gray-800"><div className="text-xs text-gray-500 mb-1">Personality</div>{res.personalityScore}</div>
                    <div><div className="text-xs text-gray-500 mb-1">Interest</div>{res.interestScore}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#0f1015] rounded-xl border border-dashed border-gray-800">
              <p className="text-gray-400 font-medium">No test results found yet.</p>
              <p className="text-sm text-gray-500 mt-1">Take a test to see recommendations!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
